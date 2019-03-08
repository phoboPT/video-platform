export default function formatString(string, length) {
  if (string.length > length) {
    var newString = string.substring(0, length);
    return newString + "...";
  } else {
    return string;
  }
}
