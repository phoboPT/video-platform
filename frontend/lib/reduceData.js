export default function reduceData(data) {
  let resFinal = Object.values(
    data.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
  );
  return resFinal;
}
