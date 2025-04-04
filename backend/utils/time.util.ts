const minutesToMs = (minutes: number) => minutes * 60 * 1000;

const hoursToMs = (hours: number) => hours * 60 * 60 * 1000;

const daysToMs = (days: number) => days * 24 * 60 * 60 * 1000;

const daysToSecond = (days: number) => daysToMs(days) / 1000;

export { minutesToMs, hoursToMs, daysToMs, daysToSecond };
