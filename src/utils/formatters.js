import moment from 'moment';
import numeral from 'numeral';

// ########
//
const timeFormat = 'h:mm a';
// Standard Date Formatter (ex: Jun 3, 2014) - uses locale settings
const dateFormat = 'll';
const dollarsFormat = '$0,0';
const dollarsCentsFormat = '$0,0.00';
const monthYearFormat = 'MMM YYYY';
const monthDayYearFormat = 'MMM D, YYYY';
// Default detailed date/time display format
const dateTimeDetailedFormat = 'MMM DD, YYYY  h:mm:ss a';

// HELPERS

function parseDate(date) {
  // Parse the date using supported formats. Deals with Firefox/Chrome
  // behavior differences with "new Date()" behavior. Specifically an issue
  // accepting "Dec 2014" as a date in Firefox. NOTE: This is not "strict"
  // formatting, so a "/" is also allowed as well as not full 2 digit months
  // or days, and with or without a comma.
  return moment(date, [
    // dates
    'MMDDYYYY',
    'MMM YYYY',
    'MMM DD YYYY',
    'M-D-YYYY',
    'YYYY-M-D',
    // date times
    'YYYY-MM-DD h:mm a',
    'MMM DD YYYY h:mm a',
    'M-D-YYYY h:mm a',
    'YYYY-MM-DD h:mm a',
    // date times with seconds
    'YYYY-MM-DD h:mm:ss a',
    'MMM DD YYYY h:mm:ss a',
    'M-D-YYYY h:mm:ss a',
    'YYYY-MM-DD h:mm:ss a',
    // Elixir format
    'YYYY-MM-DDTHH:mm:ssZ'
  ]);
}

function adjustElixirDateTime(dateTime) {
  if (dateTime === undefined || dateTime === null) return dateTime;

  // This function assumes you are using ISO datetime format.
  // Function is intended to support date time values from Elixir.
  let extendedIndex = dateTime.indexOf('.');
  let zIndex = dateTime.indexOf('Z');

  // Check if there is a '.' but no 'Z' value in the string.
  if (extendedIndex > -1 && zIndex === -1) {
    return `${dateTime}Z`;
  }

  return dateTime;
}

// function addressLines(addressObj, oneLine = false) {
//   let line1 = addressObj.street_1;
//   let line2 = null;
//   let line3 = `${addressObj.city}, ${addressObj.state} ${addressObj.zip}`;

//   let formatted = _.compact(_.concat([], line1, line2, line3));

//   if (oneLine) {
//     formatted = formatted.join(", ");
//   }

//   return formatted;
// }

function ordinalize(value) {
  value = (value || "").toString()
  if (_.isEmpty(value)) return '';

  let ordinal;

  // check what digit the number ends with for choosing the correct text
  // ending
  switch (value.charAt(value.length - 1)) {
    case '1':
      ordinal = 'st'
      break;
    case '2':
      ordinal = 'nd'
      break;
    case '3':
      ordinal = 'rd'
      break;
    default:
      ordinal = 'th'
  }

  // address some exceptions when looking at larger portion
  let last_2 = value.slice(-2)
  if (last_2 == '11' || last_2 == '12' || last_2 == '13') ordinal = 'th';

  return value + ordinal;
}

// function currencyFormatter(value, format = 'dollars') {
//   let numObj = numeral(value);

//   if (format === 'dollars')
//     return numObj.format('$0,0');
//   else
//     return numObj.format('$0,0.00');
// }

// // Relative language description of the date/time (ex: "3 days ago", "seconds ago")
// function timeAgoDisplay(value) {
//   if (_.isEmpty(value)) return null;

//   return this.parseDate(value).fromNow();
// }


// // Standard Date and Time Formatter (ex: Jun 3, 2014 3:05:53 p)
// function datetimeDisplay(value) {
//   if (_.isEmpty(value)) return null;

//   return this.parseDate(value).format(this.dateTimeDetailedFormat);
// }

// FORMATTERS

export function stringFormatter(value, options = {}) {
  let mergedOptions = _.merge({}, {required: false}, options)
  let parsed, formatted, errors = []

  if (_.isNumber(value)) value = value.toString();
  if (_.isEmpty(value)) value = "";

  formatted = parsed = _.trim(value.toString());

  if (mergedOptions.required && _.isEmpty(parsed)) {
    parsed = null;
    errors.push('is required');
  }

  return {
    valid: errors.length === 0,
    parsed,
    formatted,
    errors
  };
}

export function phoneFormatter(value, options = {}) {
  let val = stringFormatter(value, options)

  if (_.isEmpty(val.parsed)) return val;

  // remove all non-digits
  let parsed = val.parsed.replace(/\D/g, '');
  let valid = parsed.length === 10;
  let formatted, errors = [];

  if (valid) {
    formatted = parsed.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  } else {
    formatted = parsed;
    parsed = null;
    errors.push('invalid phone number');
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

export function requiredFormatter(value, options = {}) {
  options = _.merge({}, {required: true}, options);
  let parsed, formatted, errors = [];

  // react inputs don't like null values - otherwise they are considered
  // uncontrolled inputs and we want controlled inputs.  So all formatters
  // must at least return an empty string.
  if (_.isNil(value)) {
    formatted = "";
  } else {
    formatted = value;
  }

  if (options.required && _.isEmpty(value.toString().trim())) {
    parsed = null;
    errors.push('is required');
  } else {
    parsed = formatted;
  }

  return {
    valid: errors.length === 0,
    parsed,
    formatted,
    errors
  }
}

export function emailFormatter(value, options = {}) {
  let valid, errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  let {formatted: formatted, parsed: parsed} = val;

  // check that it matches our regex for a email
  let emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]+$/;

  if (valid = emailRegex.test(formatted)) {
    parsed = formatted;
  } else {
    parsed = null;
    errors.push('invalid email');
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  }
}

export function ssnFormatter(value, options = {}) {
  let formatted, errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  // remove all non-digits
  let parsed = val.parsed.replace(/\D/g, '');
  let valid = parsed.length === 9;

  if (valid) {
    formatted = parsed.replace(/^(\d{3})(\d{2})(\d{4})$/, "$1-$2-$3");
  } else {
    formatted = parsed;
    parsed = null;
    errors.push('invalid SSN');
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

export function stateFormatter(value, options = {}) {
  var formatted, errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  // remove 0-9
  let parsed = _.toUpper(val.parsed.replace(/\d/g, ''));
  let valid = parsed.length === 2;

  // TODO: compare against a list of known states?
  if (valid) {
    formatted = parsed.replace(/^(\D{2})$/, "$1");
  } else {
    formatted = parsed;
    errors.push('invalid state');
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

export function zipcodeFormatter(value, options = {}) {
  var formatted, errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  // remove all non-digits
  let parsed = val.parsed.replace(/\D/g, '');
  let valid = parsed.length === 5;

  if (valid) {
    formatted = parsed.replace(/^(\d{5})$/, "$1");
  } else {
    formatted = parsed;
    parsed = null;
    errors.push('is invalid');
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

export function numberFormatter(value, options = {}) {
  let errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  let numObj = numeral(_.trim(val.parsed.replace(/[$\s,]/g, '')));
  let parsed = numObj.value();

  // TODO: numeraljs does not throw errors.... we might want to think about
  // detecting our own?
  let valid = true;
  let formatted = numObj.format('0');

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

// Currency formatting and validation.
//
// Options:
//   * format - 'dollars' to suppress display of cents. 'cents' - default, full display.
export function currencyFormatter(value, options = {}) {
  let formatted, errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  options = _.merge({}, {format: 'cents'}, options);

  // remove '$', spaces and ','.
  // Using numeral, convert to a number.
  let numObj = numeral(_.trim(val.parsed.replace(/[$\s,]/g, '')));
  let parsed = numObj.value();

  // TODO: numeraljs does not throw errors.... we might want to think about
  // detecting our own?
  let valid = true;

  if (options.format == 'dollars')
    formatted = numObj.format('$0,0');
  else
    formatted = numObj.format('$0,0.00');

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

export function dollarsFormatter(value, options = {}) {
  options['format'] = 'dollars';
  return currencyFormatter(value, options);
}

// Percent formatting and validation.
//
export function percentFormatter(value, options = {}) {
  let errors = [];
  let val = stringFormatter(value, options);

  if (_.isEmpty(val.parsed)) return val;

  options = _.merge({}, {format: 'cents'}, options);

  // remove '%', spaces and ','.
  // Using numeral, convert to a number.
  let numObj = numeral(_.trim(val.parsed.replace(/[$\s,%]/g, '')));
  let parsed = numObj.value();

  // TODO: numeraljs does not throw errors.... we might want to think about
  // detecting our own?
  let valid = true;
  let formatted = `${numObj.format('0,0.00')}%`;

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

// Date formatting and validation.
//
// Options:
//  * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
export function dateFormatter(value, options = {}) {
  var parsed, formatted, errors = [];

  value = adjustElixirDateTime(value);
  let val = stringFormatter(value, options);

  if (!val.valid) return val;

  // Do not generate format errors if not required by String formatter
  // when value is empty.
  if (_.isEmpty(value)) {
    return {
      valid: true,
      parsed: value,
      formatted: value,
      errors: []
    }
  }

  options = _.merge({}, {format: 'full-date'}, options);
  let temp = parseDate(val.parsed);
  let valid = temp.isValid();

  if (valid) {
    // store parsed value as just the date portion.
    parsed = temp.format('YYYY-MM-DD');
    if (options.format == 'month-year')
      formatted = temp.format(monthYearFormat);
    else
      formatted = temp.format(monthDayYearFormat);
  } else {
    errors.push('invalid date');
    formatted = value;
    parsed = null;
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  };
}

// Time formatting and validation.
//
// Options:
//  * format - 'full-date' for "MMM DD, YYYY". 'month-year' for "MMM YYYY"
export function timeFormatter(value, options = {}) {
  let parsed, formatted, errors = [];
  value = adjustElixirDateTime(value);
  let val = stringFormatter(value, options);

  if (!val.valid) return val;

  // Do not generate format errors if not required by String formatter
  // when value is empty.
  if (_.isEmpty(value)) {
    return {
      valid: true,
      parsed: value,
      formatted: value,
      errors: []
    }
  }

  let temp = moment(val.parsed, ["hh:mm:ss a", "YYYY-MM-DDTHH:mm:ssZ"]);
  let valid = temp.isValid();

  if (valid) {
    formatted = temp.format('h:mm a');
    parsed    = formatted;
  } else {
    errors.push('invalid time');
    formatted = value;
    parsed = null;
  }

  return {
    valid,
    parsed,
    formatted,
    errors
  }
}

export function ordinalFormatter(value, options = {}) {
  let parsed, errors = [];
  // remove all non-digits
  let val = stringFormatter(value, options);

  if (!val.valid) return val;

  let formatted = val.parsed.replace(/\D/g, '');

  // if have a parsed value (not blank/empty)
  if (!_.isEmpty(formatted)) {
    parsed = parseInt(formatted);
    formatted = ordinalize(formatted);
  } else {
    errors.push('is invalid');
    formatted = val.parsed;
    parsed = null;
  }

  return {
    valid: errors.length === 0,
    parsed,
    formatted,
    errors
  }
}

// DEFAULT REFERENCE OBJECT

export default {
  string: stringFormatter, phone: phoneFormatter, required: requiredFormatter,
  email: emailFormatter, ssn: ssnFormatter, state: stateFormatter,
  zipcode: zipcodeFormatter, number: numberFormatter, currency: currencyFormatter,
  dollars: dollarsFormatter, percent: percentFormatter, date: dateFormatter,
  time: timeFormatter, ordinal: ordinalFormatter
};
