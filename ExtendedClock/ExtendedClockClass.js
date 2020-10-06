class ExtendedClock extends Clock {
  constructor(object) {
    super(object);
    let { precision:precision = 1000 } = object;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
};

