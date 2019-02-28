export default function formatDate(date) {
  const regex = /T|Z|\.([^\.]+)$/g;

  console.log("date", date);
  return date.replace(regex, " ");
}
