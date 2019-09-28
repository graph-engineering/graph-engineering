import Moment from "moment-timezone";

import { makeSimpleUnitTypes } from "./utils/simple-unit-creator";

// import GraphengMS from "./utils/ms";

export const relationships = {
  milliseconds: 1,
  seconds: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asSeconds(),
    toBaseUnit: (seconds: number) =>
      Moment.duration(seconds, "seconds").asMilliseconds()
  },
  minutes: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asMinutes(),
    toBaseUnit: (minutes: number) =>
      Moment.duration(minutes, "minutes").asMilliseconds()
  },
  hours: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asHours(),
    toBaseUnit: (hours: number) =>
      Moment.duration(hours, "hours").asMilliseconds()
  },
  days: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asDays(),
    toBaseUnit: (days: number) => Moment.duration(days, "days").asMilliseconds()
  },
  weeks: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asWeeks(),
    toBaseUnit: (weeks: number) =>
      Moment.duration(weeks, "weeks").asMilliseconds()
  },
  months: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asMonths(),
    toBaseUnit: (months: number) =>
      Moment.duration(months, "months").asMilliseconds()
  },
  years: {
    fromBaseUnit: (millis: number) => Moment.duration(millis).asYears(),
    toBaseUnit: (years: number) =>
      Moment.duration(years, "years").asMilliseconds()
  }
};

const Duration = makeSimpleUnitTypes(relationships, "Duration");
export default Duration;
