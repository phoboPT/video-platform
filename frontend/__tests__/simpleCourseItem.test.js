import { mount } from "enzyme";
import toJSON from 'enzyme-to-json'
import wait from 'waait';
import CourseItem from "../components/Home/CoursesList/CourseItem";
import { CURRENT_USER_QUERY } from "../components/Authentication/User";
import { MockedProvider } from 'react-apollo/test-utils';
import { fakeItem } from '../lib/testUtils';
let course = { category: { name: "Web Development" } };

// const fakeItem = { 
  
//     ...course,
//     createdAt: "2019-04-04T08:56:43.705Z",
//     id: "ABC123",
//     price: "25,00",
//     state: "PUBLISHED",
//     thumbnail: "https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8",
//     title: "Javascript for dummies",
  
//   };
const item = {
  course: {
    id: "cjvqzexcwp2gg0b22w3rx0ff9",
    title: "Melhor de sempre",
    thumbnail: "https://res.cloudinary.com/deky2cxlm/image/upload/v1558030963/thumbnail/w0qeujsadhbyounbzed5.png",
    state: "PUBLISHED",
    createdAt: "2019-05-16T18:22:53.792Z",
    category: {
      id: "cjvgs18r1wa1e0b22bthm3tea",
      name: "Web Development",
      __typename: "Category"
    },
    user: {
      id: "123",
      name: "Hugo Cardoso",
      __typename: "User"
    },
    __typename: "Course"
  },
  __typename: "UserCourse"
};

describe("<CourseItem/>", () => {
  //Update true
  it("renders with proper data", async () => {
    
    const mocks = [
      {
        request: { query: CURRENT_USER_QUERY, variables: { id: '123' } },
        result: {
          data: {
         me: {
      id: "123",
    email: "teste@teste.com",
      name: "Hugo dfdsf",
      profession: null,
      description: null,
      thumbnail: null,
      permission: [
        "USER"
      ],
      wishlist: [],
      interests: [
        {
          id: "cjvhwjhfp9icw0b95u687t8l7",
          __typename: "UserInterest"
        }
      ],
      courses: [
        {
         course: {
            id: "cjvqullei0e920b95hna0t1pa",
            title: "asdasd",
            thumbnail: "https://res.cloudinary.com/deky2cxlm/image/upload/v1558022880/thumbnail/ylctzevhmey0he1hqqci.png",
            state: "PUBLISHED",
            createdAt: "2019-05-16T16:08:06.810Z",
            category: {
              id: "cjvgs18r1wa1e0b22bthm3tea",
              name: "Web Development",
              __typename: "Category"
            },
            user: {
              id: "cjvgrugz9x9or0b95xp6mvtl6",
              name: "Hugo Cardoso",
            __typename: "User"
            },
            __typename: "Course"
          },
          _typename: "UserCourse"
        },
        {
          course: {
            id: "cjvqzexcwp2gg0b22w3rx0ff9",
            title: "Melhor de sempre",
            thumbnail: "https://res.cloudinary.com/deky2cxlm/image/upload/v1558030963/thumbnail/w0qeujsadhbyounbzed5.png",
            state: "PUBLISHED",
            createdAt: "2019-05-16T18:22:53.792Z",
            category: {
              id: "cjvgs18r1wa1e0b22bthm3tea",
              name: "Web Development",
              __typename: "Category"
            },
            user: {
              id: "123",
              name: "Hugo Cardoso",
              __typename: "User"
            },
            __typename: "Course"
          },
          __typename: "UserCourse"
        },
      
      ],
      cart: [],
      __typename: "User"
    }
  }
          }
        }
      
    ];
console.log(mocks)

    const wrapper = mount(
      
      <MockedProvider mocks={mocks}>
        
      <CourseItem course={item}
                            key={item.id}
                            skip={1 * 4 - 4} />
                            </MockedProvider>  
    
    
    );
    
    console.log(wrapper.debug());
    // expect(
    //   wrapper
    //     .find("#price")
    //     .dive()
    //     .text(),
    // ).toBe("25,00 €");
    // expect(
    //   wrapper
    //     .find("#createdAt")
    //     .dive()
    //     .text(),
    // ).toBe("2019-04-04");
    // expect(
    //   wrapper
    //     .find("#state")
    //     .dive()
    //     .text(),
    // ).toBe("PUBLISHED");
    // expect(
    //   wrapper
    //     .find("#category")
    //     .dive()
    //     .text(),
    // ).toBe("Web Development ");
    // expect(
    //   wrapper
    //     .find("#title")
    //     .dive()
    //     .text(),
    // ).toBe("Javascript for dummi...");

    // expect(wrapper.find("img").props().src).toBe("https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8");
  });

  //update False
  // it("renders and display properly", () => {
  //   const wrapper = shallow(<CourseItem course={fakeItem} update={false} />);

  //   expect(
  //     wrapper
  //       .find("#createdAt")
  //       .dive()
  //       .text(),
  //   ).toBe("2019-04-04");

  //   expect(
  //     wrapper
  //       .find("#category")
  //       .dive()
  //       .text(),
  //   ).toBe("Web Development ");

  //   expect(
  //     wrapper
  //       .find("#title")
  //       .dive()
  //       .text(),
  //   ).toBe("Javascript for dummi...");

  //   expect(wrapper.find("img").props().src).toBe("https://www.google.com/imgres?imgurl=http%3A%2F%2Fqnimate.com%2Fwp-content%2Fuploads%2F2014%2F03%2Fimages2.jpg&imgrefurl=http%3A%2F%2Fqnimate.com%2Funderstanding-html-img-tag%2F&docid=2QpCn8mhLjh9DM&tbnid=RYBz6TYw2D7ZZM%3A&vet=10ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw..i&w=800&h=400&bih=976&biw=1920&q=img&ved=0ahUKEwjHubO1xobiAhWIoBQKHaruA5gQMwhCKAMwAw&iact=mrc&uact=8");
  // });
});
