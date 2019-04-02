export default function orderCourses(course) {
  var final = [];

  course.map(element => {
    final.push(element);
  });

  final.sort(function(a, b) {
    if (a.course.id.toLowerCase() < b.course.id.toLowerCase()) return -1;
    if (a.course.id.toLowerCase() > b.course.title.toLowerCase()) return 1;
    return 0;
  });

  return final;
}
