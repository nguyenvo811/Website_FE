export const FormatDateAndTime = (inputDate) => {
  // Convert input string to JavaScript Date object
  var date = new Date(inputDate);

  // Extract individual components (year, month, day, hours, minutes) from the Date object
  var year = date.getFullYear();
  var month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed, so we add 1 and pad with leading zero
  var day = ("0" + date.getDate()).slice(-2); // Pad with leading zero
  var hours = ("0" + date.getHours()).slice(-2); // Pad with leading zero
  var minutes = ("0" + date.getMinutes()).slice(-2); // Pad with leading zero

  // Manually set the GMT offset to +7 for Vietnam
  var offsetHours = 7;

  // Format the date and time components into a user-friendly string
  var formattedDateTime = `${day}/${month}/${year} ${hours}:${minutes} GMT`;

  // Append the GMT offset information
  formattedDateTime += (offsetHours >= 0 ? "+" : "-") +
    Math.abs(offsetHours);

  // Return the formatted date and time string
  return formattedDateTime;
};
