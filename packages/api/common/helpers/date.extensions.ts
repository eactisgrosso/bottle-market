interface Date {
  toMySQLString(): String;
}

Date.prototype.toMySQLString = function (): string {
  return this.toISOString().slice(0, 19).replace("T", " ");
};
