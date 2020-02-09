import get from 'lodash.get';

export default class PackageBom {
  constructor(bom) {
    this._bom = bom;
    this._invalidValue = 'Invalid value';
  }
  get name() {
    return get(this._bom, 'package.name', this._invalidValue);
  }

  get describe() {
    return get(this._bom, 'package.describe', this._invalidValue);
  }

  get version() {
    return get(this._bom, 'package.version', this._invalidValue);
  }
}
