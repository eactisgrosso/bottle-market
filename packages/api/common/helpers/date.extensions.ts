declare global {
  interface Date {
    addDays(days: number): Date;
  }
}
Date.prototype.addDays = function (days): Date {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
export {};
