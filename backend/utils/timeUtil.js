const minutesToMs = (minutes) => minutes * 60 * 1000;

const hoursToMs = (hours) => hours * 60 * 60 * 1000;

const daysToMs = (days) => days * 24 * 60 * 60 * 1000;

const daysToSecond = (days) => daysToMs(days) / 1000;

module.exports = { minutesToMs, hoursToMs, daysToMs, daysToSecond };
