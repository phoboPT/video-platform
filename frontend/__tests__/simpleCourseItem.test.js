import { shallow } from "enzyme";
import CourseItem from "../components/Courses/MyCourses/CourseItem";
let course = { category: { name: "Web Development" } };

const fakeItem = {
  ...course,
  createdAt: "2019-04-04T08:56:43.705Z",
  id: "ABC123",
  price: "25,00",
  state: "PUBLISHED",
  thumbnail: "http://www.google.pt",
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

    expect(wrapper.find("img").props().src).toBe("http://www.google.pt");
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

    expect(wrapper.find("img").props().src).toBe("http://www.google.pt");
  });
});
