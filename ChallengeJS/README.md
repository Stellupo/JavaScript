# Presentation
JavaScript Challenge

## The challenge

You need to code an automatic production  of `foobar` . The production doesn't need to be optimised , but it should at least work!

We start with two robots ; each can do several actions but only one at a time:

* Change activity: the robot is busy 20 seconds.
* `foo` mining: the robot is busy 1 second
* `bar` mining: the robot is busy a random time between 0.5 and  2 seconds
* `foobar` assembly : the robot is busy 2 seconds . It takes a `foo` and a `bar` and creates a `foobar`
  This operation has 70% succes rate . If it fails you get back the `bar` , but you lose the `foo`.

* Sell some `foobar`: 10 seconds to sell between 2 to 4 (random) `foobar`s , we get 1 EUR for each `foobar` sold.
* Buy new robot : The robot is busy 1 second . The new robot costs 3 EUR's and 2 `foo`'s

The game stops when you reach 42 robots !


## init project
Please, install node.js by clicking [HERE](https://nodejs.org/en/#download). 

Then, define node.js as an interpreter to run the program in your IDE.

## Logic

A robot costs 3EUR and 2 'foo'. To get 3EUR, we must have sold 3 'foobar'. We can sell maximum 4 'foobar' in stock at a time.
To produce 4 'foobar', we need 4 'foo' + 30% of margin (30% of failures during the assembly) = 6. 
To buy a robot, we need 2 'foo' so we need 8 'foo' in stock to produce the 4 'foobar' we want to sell and keep 2 'foo' for a robot. 
That's why we have defined the number of Foo to produce to 8.

Because we can't assemble the 'foobar' without both 'foo' and 'bar', we will mine both of them in the same time. 
The number of 'bar' we can produce in the same time we have mined 'foo' will depend of the time we take to mine each 'bar'.

When one robot is busy doing the sells, the other one take this time to switch activity. This other one will do the last step : buy a robot. 

At the end of a production cycle, the two robots have to switch to get back to mining. 

