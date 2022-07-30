class IOC {
  private container;

  private fakes;

  constructor() {
    this.container = new Map();
    this.fakes = new Map();
  }

  bind(key, callback) {
    this.container.set(key, { callback, single: false });
  }

  singleton(key, callback) {
    this.container.set(key, { callback, single: true });
  }

  fake(key, callback) {
    this.fakes.set(key, { callback, single: false });
  }

  restore(key) {
    this.fakes.delete(key);
  }

  findInContainer(key) {
    if (this.fakes.has(key)) {
      return this.fakes.get(key);
    }
    return this.container.get(key);
  }

  use(key) {
    const item = this.findInContainer(key);
    if (!item) {
      throw new Error('error');
    }
    if (item.single && !item.instance) {
      item.instance = item.callback();
    }
    return item.single ? item.instance : item.callback();
  }
}

export default new IOC();
