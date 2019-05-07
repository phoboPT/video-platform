import { shallow } from "enzyme";
import CourseItem from "../components/Courses/CourseItem";
let course = { category: { name: "Web Development" } };

const fakeItem = {
  ...course,
  createdAt: "2019-04-04T08:56:43.705Z",
  id: "ABC123",
  price: "25,00",
  state: "PUBLISHED",
  thumbnail: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8",
  title: "Javascript for dummies",
};

describe("<Course/>", () => {
  //Update true
  it("renders and display properly", () => {
    const wrapper = shallow(<CourseItem course={fakeItem} update={true} />);

    expect(
      wrapper
        .find("#price")
        .dive()
        .text(),
    ).toBe("25,00 €");
    expect(
      wrapper
        .find("#createdAt")
        .dive()
        .text(),
    ).toBe("2019-04-04");
    expect(
      wrapper
        .find("#state")
        .dive()
        .text(),
    ).toBe("PUBLISHED");
    expect(
      wrapper
        .find("#category")
        .dive()
        .text(),
    ).toBe("Web Development ");
    expect(
      wrapper
        .find("#title")
        .dive()
        .text(),
    ).toBe("Javascript for dummi...");

    expect(wrapper.find("img").props().src).toBe("https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8");
  });

  //update False
  it("renders and display properly", () => {
    const wrapper = shallow(<CourseItem course={fakeItem} update={false} />);

    expect(
      wrapper
        .find("#createdAt")
        .dive()
        .text(),
    ).toBe("2019-04-04");

    expect(
      wrapper
        .find("#category")
        .dive()
        .text(),
    ).toBe("Web Development ");

    expect(
      wrapper
        .find("#title")
        .dive()
        .text(),
    ).toBe("Javascript for dummi...");

    expect(wrapper.find("img").props().src).toBe("https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8");
  });
});
