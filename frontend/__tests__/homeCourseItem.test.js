import { shallow } from "enzyme";
import CourseItem from "../components/Home/CoursesList/CourseItem";
let course = { user: { name: "Hugo" } };

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
    const wrapper = shallow(
      <CourseItem course={fakeItem} key={fakeItem.id} skip={0} />,
    );
    console.log(wrapper.debug());
    // expect(wrapper.find("#price").text()).toBe("25,00 €");
    // expect(
    //   wrapper
    //     .find("#state")
    //     .dive()
    //     .text(),
    // ).toBe("PUBLISHED");
    // // expect(wrapper.find("#category").text()).toBe("Web Development ");
    // console.log(wrapper.find("#price").dive());
    // console.log(wrapper.find("#title").text());
    // expect(wrapper.find("#title").text()).toBe("Javascript for dummi...");

    // expect(wrapper.find("img").props().src).toBe("http://www.google.pt");
  });

  //update False
  // it("renders and display properly", () => {
  //   const wrapper = shallow(<CourseItem course={fakeItem} update={false} />);

  //   // expect(wrapper.find("#category").text()).toBe("Web Development ");

  //   expect(wrapper.find("#title").text()).toBe("Javascript for dummi...");

  //   expect(wrapper.find("img").props().src).toBe("http://www.google.pt");
  // });

  // it("renders out the buttons properly", () => {
  //   const wrapper = shallow(<CourseItem course={fakeItem} update={false} />);
  //   console.log(wrapper.debug());
  // });
});
