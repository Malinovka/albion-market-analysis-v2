function timeAgo(date) {

    //Type checking the date and formatting it if needed
    switch (typeof date) {
      case 'number':
        break;
      case 'string':
        date = +new Date(date);
        break;
      case 'object':
        if (date.constructor === Date) date = date.getTime();
        break;
      default:
        date = +new Date();
    }

    //Various time formats and their max in seconds, along with their divisors
    //Only up to months since I don't expect to have anything older than a year
    const timeFormats = [
      [60, 'sec', 1],
      [3600, 'min', 60],
      [86400, 'hour', 3600],
      [604800, 'day', 86400],
      [2419200, 'week', 604800],
      [29030400, 'month', 2419200]
    ];

    //Get absolute value of the difference in seconds
    //No differentiation between past or future dates,
    //Just because I already know if a date is past/future based on my dataset
    let seconds = Math.abs((+new Date() - date) / 1000);
    
    if (seconds === 0) {
    return 'Just now'
    }

    //Loop through formats until seconds is less than the maximum, then divide by format and return string
    //Add an 's' if greater than 1
    for (let i = 0; i < timeFormats.length; i++) {
        if (seconds < timeFormats[i][0]) {
            date = `${Math.floor(seconds / timeFormats[i][2])} ${timeFormats[i][1]}${Math.floor(seconds / timeFormats[i][2]) > 1 ? 's' : ''}`;
            return date;
        }
    }
}

//console.log(timeAgo('2021-11-06T19:19:46.591+00:00'));
module.exports = { timeAgo }