"use strict";

const root = process.cwd();
const R = require('ramda');
const db = {
    available: (function () {
        // TODO: Change to use DB
        const fs = require('then-fs');
        return fs.readFile("availability.json", "utf8").then(JSON.parse);
    }())
};

function userObjectToList(obj) {
    return Promise.resolve(
        R.toPairs(obj)
    );
}

function genShiftArray(numShifts) {
    return Promise.resolve(
        R.range(0, numShifts)    // (inclusive, exclusive)
    );
} 

function getRandomUserFromList(userList) {
    return R.head(userList[randomIndex(userList.length)]);
}

function randomIndex(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
}

function Algo(shiftsInPeriod) {
    "use strict"

    const that = {};

    function getShiftsInPeriod() {
        // TODO: Maybe get period from DB
        return Promise.resolve(shiftsInPeriod || 31);
    }

    that.run = function () {
        return db.available.then(userObjectToList).then((availabilityList) => {
            return getShiftsInPeriod()
                .then(genShiftArray)
                .then((list) => R.map(selectUser, list));
            function selectUser(shiftIndex) {
                let filteredUsers = R.filter(isAvailable, availabilityList);
                return getRandomUserFromList(filteredUsers);
                function isAvailable(user) {
                    return user[1][shiftIndex] === true;
                }
            }
        });
    };

    return that;
}

exports = Algo;

if (require.main === module) {
    const algo = new Algo(11);
    const shifts = algo.run;
    shifts()
        .then(console.log)
        .catch(console.log);
}
