function Shift (start, end, user) {
  return { start, end, user };
}
function Schedule () {
  this.scheduleArray = [];
  this.add = function (shift) { this.scheduleArray.push(shift) };
}
  /*
const moment = require('moment')
moment.prototype.isWeekend = function () {
  return this.weekday() % 6 === 0; // '.weekday() => [0-6] | Mon == 1
}
moment.prototype.isWeekday = function () { return ! this.isWeekend() };
*/

let userArray = ['Felicity', 'Jeanette', 'Marina', 'Phil', 'Jaci', 'Mike',
  'Allan', 'Lisa C', 'Felicity', 'Phil', 'Danelle', 'Jaci', 'Phil', 'OPEN', 'Felicity',
  'Jeanette', 'Marina', 'OPEN', 'OPEN', 'OPEN', 'Allan', 'Barb', 'Felicity', 'Phil', 'Danelle',
  'Barb', 'Phil', 'Jaci', 'Felicity', 'OPEN', 'Marina',
  'Phil', 'Jaci', 'OPEN', 'Phil', 'Lisa C', 'Phil', 'Barb', 'Marina', 'OPEN', 'Barb', 'Phil',
  'Phil', 'Jeanette', 'HOLIDAY', 'HOLIDAY', 'HOLIDAY', 'HOLIDAY', 'HOLIDAY', 'HOLIDAY',
  'HOLIDAY', 'Barb', 'Danelle', 'Phil', 'Barb', 'OPEN', 'Phil', 'Jeanette', 'OPEN', 'OPEN',
  'HOLIDAY', 'HOLIDAY'];

console.log(`'userArray' length: ${userArray.length}`);

function isEven (num) { return num % 2 === 0; };
function isMorn (num) { return isEven(num); };
function isNoon (num) { return ! isEven(num); };

dec = new Schedule();
//let startOfMonth = moment("2016-12-01");
let day = new Date("2017-01-01T12:00:00");
// day.setUTCHours(day.getUTCHours() - 5);
//let day = () => { return startOfMonth; };
const mornWeekStart = 9;
const mornWeekEnd = 13;
const noonWeekStart = 13;
const noonWeekEnd = 17;
const mornWeekendStart = 11;
const mornWeekendEnd = 13;
const noonWeekendStart = 13;
const noonWeekendEnd = 15;

var start;
var end;
var dateString;
function indexToDay (index) { return Math.floor(index / 2); };
function close (callback) { return callback(); };
function addDay (date) { return new Date(date.setDate(date.getDate() + 1)); };
function isWeekend (date) { return date.getDay() % 6 === 0; };
function isWeekday (date) { return ! isWeekend(date); };

userArray.forEach((user, index, array) => {
console.log(day);
  if (isWeekday(day)) {
    if (isMorn(index)) {
      start = new Date(day.setHours(mornWeekStart));
      end = new Date(day.setHours(mornWeekEnd));
    } else if (isNoon(index)) {
      start = new Date(day.setHours(noonWeekStart));
      end = new Date(day.setHours(noonWeekEnd));
    }
  } else if (isWeekend(day)) {
    if (isMorn(index)) {
      start = new Date(day.setHours(mornWeekendStart));
      end = new Date(day.setHours(mornWeekendEnd));
    } else if (isNoon(index)) {
      start = new Date(day.setHours(noonWeekendStart));
      end = new Date(day.setHours(noonWeekendEnd));
    }
  }

  dec.add(new Shift(start, end, user));
  
  if (isNoon(index)) { // DO THIS PART LAST
    day = addDay(day);
  }
})

console.log(dec);
let fs = require('fs')
delete dec.add;
fs.writeFile('cal-data.json', JSON.stringify(dec));
