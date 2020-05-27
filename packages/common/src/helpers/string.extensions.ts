declare global {
  interface String {
    toTitleCase(): String;
  }
}
String.prototype.toTitleCase = function (): string {
  return this[0].toUpperCase() + this.slice(1);
};
export {};
