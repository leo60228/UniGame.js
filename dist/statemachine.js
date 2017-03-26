'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mixwith = require('mixwith');

exports.default = (0, _mixwith.Mixin)(superclass => class extends superclass {
  constructor() {
    super();
    this.state = null;

    const capitalize = ([first, ...rest]) => first.toUpperCase() + rest.join('').toLowerCase();

    for (let state of this._states()) {
      let func = (...args) => {
        this.oldState = this.state;
        this.state = state;
        this[`_${state}`](...args);
        delete this.oldState;
      };

      this[`${this._privStates() ? '_' : ''}switchTo${capitalize(state)}`] = func;
    }
  }

  _states() {
    throw TypeError('no impl');
  }
  _privStates() {
    throw TypeError('no impl');
  }
});