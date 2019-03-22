export default function orderCourses(course) {
  var final = [];

  course.forEach(element => {
    final.push(element);
  });

  final.sort(function(a, b) {
    if (a.course.title.toLowerCase() < b.course.title.toLowerCase()) return -1;
    if (a.course.title.toLowerCase() > b.course.title.toLowerCase()) return 1;
    return 0;
  });

  return final;
}
