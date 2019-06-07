function orderCourses(course) {
  const final = [];

  course.map(element => {
    final.push(element);
  });

  final.sort(function(a, b) {
    if (a.course.id.toLowerCase() < b.course.id.toLowerCase()) return -1;
    if (a.course.id.toLowerCase() > b.course.id.toLowerCase()) return 1;
    return 0;
  });

  return final;
}

export default orderCourses;
