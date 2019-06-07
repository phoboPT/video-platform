function reduceData(data) {
  const resFinal = Object.values(
    data.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
  );
  return resFinal;
}
export default reduceData;
