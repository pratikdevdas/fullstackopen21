function calculateDaysBetweenDates(begin, end) {
  var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var diffDays = Math.round(Math.abs((begin.getTime() - end.getTime())/(oneDay)));
  return diffDays;
}

