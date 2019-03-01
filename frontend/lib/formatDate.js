export default function formatDate(date) {
  const regex = /T|Z|\.([^\.]+)$/g;

  return date.replace(regex, " ");
}
