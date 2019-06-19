function count(data) {
  let total = 0;

  data.coursesStats.forEach(item => {
    total += item.count;
  });

  return total;
}
export default count;
