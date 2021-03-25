class Production {
    // initialization
    constructor(robots) {
        this.robots = robots;
        this.foos = [];
        this.bars = [];
        this.products = [];
        this.money = 0;
        this.availableRobots = Array.from(this.robots); // copy of the robots array
        this.getProductionUpdates();
    }

    // Helpful functions

    // pick a robot which is available to do the next task
    pickAvailableRobot() {
        // todo implement this function to pick the available robot to do the next task.
       for (let robot of this.robots) {
           // if we still have one robot available, let's use the first one we find
           if (robot.status === "inactive") {
               this.availableRobots.push(robot);
               return robot;
           }
        }
    }

    // give info about the states of the production
    getProductionUpdates() {
        console.log(`For now, we have ${this.robots.length} robots, ${this.bars.length} bars, ${this.bars.length} foos and ${this.products.length} foobars in stock`);
        console.log(`${this.money} € left in our pocket`);
        return this.robots.length;
    }

    // choose a random number among min and max
    getRandomNumber(min, max) {
        return Math.random() * (max - min ) + min;
    }

    // update the robot status before & after finishing a task
    updateRobotStatus(robot) {
        if (robot.status === "inactive") {
            // let's update the availableRobots array : we delete from it the robot we will make active
            robot.status = "active";
            this.availableRobots = this.availableRobots.filter(item => item.id !== robot.id);
        }
        else if (robot.status === "active") {
            robot.status = "inactive";
        }
        console.log(`The robot ${robot.id} is updating its status : it is now ${robot.status}`)
    }

    // enable robot to change its activity
    switchActivity(robot) {
        console.log(`The robot ${robot.id} is switching activity, please wait 20 seconds`);
        this.updateRobotStatus(robot);
    }

    // Production functions

    // mining 'foo' operation
    fooMining(robot, numberOfFoo) {
        console.log(`Production of 'foo' is going on with robot ${robot.id}, please wait`);
        this.updateRobotStatus(robot); // now robot is active

        while (this.foos.length !== numberOfFoo) {
            this.foos.push('foo');
        }

        console.log(`Foo mining done by robot ${robot.id}. We now have ${this.foos.length} foos`);
    }

    // mining 'bar' operation
    barMining(robot, numberOfFooToProduct) {
        //The time needed to produce foos, we produce bars
        console.log(`Production of 'bar' is going on with robot ${robot.id}, please wait`);

        this.updateRobotStatus(robot); //now robot is active to mine

        let timeToProductBar = 0;

        // we stop mining bar when we take the same time mining foos
        while (timeToProductBar <= numberOfFooToProduct) {
            const t = (this.getRandomNumber(0.5, 2).toFixed(1)); //time to mine a new bar

            if ((timeToProductBar + t) > numberOfFooToProduct) break // if we go over the time to mine foo, let's stop the foo mining

            timeToProductBar += t;
            this.bars.push('bar');
        }
        console.log(`Bar mining done by robot ${robot.id}. We now have ${this.bars.length} bars`);
    }

    // 'foobar' assembly : 70% success, otherwise we lose a 'foo' in the process
    assembleProducts(robot) {
        console.log(`Assembling foobar with robot ${robot.id}`);
        // making the robot assembling active
        this.updateRobotStatus(robot);
        // assembling process until we got 4 foobar or no more stock
        while (this.products.length < 5) {
            // if we had bad luck enough to not be able to produce 4 products beacause our stock are empty before we can, we break the loop
            if (this.foos.length === 0 || this.bars.length === 0) break;

            let chance = this.getRandomNumber(0, 100);
            let product = this.foos[0] + this.bars[0];
            // if we have more than 70% chance, we can product a foobar
            if (chance <= 70) {
                console.log("Lucky us, we can assemble the product");
                this.foos.shift();
                this.bars.shift();
                this.products.push(product);
            } else {
                console.log("So bad... we lose one foo");
                if (this.foos.length === 0) this.foos = []
                this.foos.shift();
            }
            console.log(`Assemble done. We have ${this.products.length} foobars in stock to sell`);
        }

    }

    // sell some "foobar" (between 2 and 4) for 1€ each
    sellProduct(robot) {
        // à mettre plutôt après la production de foo .?
        // updating the robot status
        this.updateRobotStatus(robot);
        console.log(`Robot ${robot.id} is selling foobars`)

        // number of foobar we randomly decide to sell between 2 and 4
        let ProductSold = Math.round(this.getRandomNumber(2, 4));
        for (let i = 0; i < ProductSold; i++) {
            // If we don't have enough stocks to sell, we break the loop
            if (this.products.length === 0) break;

            console.log ("Selling one foobar");
            this.products.shift();
            this.money += 1;
        }
        console.log(`Sells done. We now have ${this.money} €.`)
    }

    // buying new robots for 3€ and 2 'foos' each
    buyNewRobot(robot) {
        console.log(`Buying robots with robot ${robot.id}`);
        this.updateRobotStatus(robot);
        // until we don't have enough foo in stock or money, we buy a new robot
        while (this.foos.length > 0 && this.money >= 2) {
            // if we buy the number of robots we need let's stop
            if (this.robots.length === 42) break;

            console.log(`Robot ${robot.id} is buying a new robot`);
            this.money -= 2; // it costs 2 money
            this.foos.splice(0,2); // and 2 foos

            // add the new robot to our production park
            this.robots.push({id: this.robots[this.robots.length - 1].id + 1, status: "inactive"});
            this.getProductionUpdates();
        }
    }

    // main function
    startProduction() {

        const numberOfFooToProduct = 8;

        console.log('Production is starting...');

        // Foo & Bar mining take place in the same time
        this.fooMining(this.robots[0], numberOfFooToProduct)
        this.barMining(this.robots[1], numberOfFooToProduct)

        // Once they're done with mlining, we need our robot to change activity
        this.switchActivity(this.robots[0]);
        this.switchActivity(this.robots[1]);

        // Assemble can be done only once we have mined
        this.assembleProducts(this.robots[0]);

        // We can sell only when we have at least one assembled foobar to sell
        if (this.products.length > 0) {
            this.sellProduct(this.robots[1]);
            this.switchActivity(this.robots[0]); // the time one robot sell, the other start changing activity
        }

        // We can buy a robot when we have sold foobar to get money
        this.buyNewRobot(this.robots[0]);

        // Reinitialize the production so we can use the robots for mining
        this.switchActivity(this.robots[0]);
        this.switchActivity(this.robots[1]);

    }




}

// Variables
let robots = [
    {
        id: 1,
        status: "inactive",
    },
    {
        id: 2,
        status: "inactive",
    },
];


// // New instance
let production = new Production(robots);

// let's produce until we have 42 robots
while (production.robots.length <= 42) {
    if (production.robots.length === 42) {
        console.log("Congratulation, we have now 42 robots to produce 'foobar'")
        break;
    }
    production.startProduction();
}
