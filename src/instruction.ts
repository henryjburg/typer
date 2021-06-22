enum InstructionSet {
  POKE = 'POKE',
}

class Instruction {
  private _id: InstructionSet;
  private _data: Object;

  constructor(_id: InstructionSet, _data: Object) {
    this._id = _id;
    this._data = _data;
  }

  getID(): InstructionSet {
    return this._id;
  }

  getData(): Object {
    return this._data;
  }
}

export { InstructionSet, Instruction };