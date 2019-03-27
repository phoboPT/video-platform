const { forwardTo } = require("prisma-binding");

const Query = {
  categories: forwardTo("db"),
  category: forwardTo("db"),
  comCourse: forwardTo("db"),
  course: forwardTo("db"),
  courseInterests: forwardTo("db"),
  courses: forwardTo("db"),
  coursesConnection: forwardTo("db"),
  interests: forwardTo("db"),
  user: forwardTo("db"),
  userInterests: forwardTo("db"),
  users: forwardTo("db"),
  video: forwardTo("db"),
  videos: forwardTo("db"),

  // videosConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //checkar se tem um current ID
    if (!userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {
          id: userId
        }
      },
      info
    );
  },
  videosConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;

    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.videosConnection(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  },

  videosUser(parent, args, ctx, info) {
    const { userId } = ctx.request;

    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }

    //query o video atual com comparaçao de ids de user
    return ctx.db.query.videos(
      {
        where: {
          user: {
            id: userId
          }
        }
      },
      info
    );
  },

  comCourseList(parent, args, ctx, info) {
    return ctx.db.query.comCourses(
      {
        orderBy: "createdAt_DESC",
        where: {
          course: {
            id: args.id
          }
        }
      },
      info
    );
  },
  coursesUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //Ve se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.courses(
      {
        where: {
          user: {
            id: userId
          }
        },
        ...args
      },
      info
    );
  },
  videosUserSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;

    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }

    //query o video atual com comparaçao de ids de user
    return ctx.db.query.videos(
      {
        where: {
          AND: [
            {
              user: {
                id: userId
              }
            },
            {
              title_contains: args.title_contains
            }
          ]
        }
      },
      info
    );
  },
  async coursesUserInterestList(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //Get user
    const user = await ctx.db.query.user(
      {
        where: {
          id: userId
        }
      },
      `
        {
          id
          name
          email
          interests{
            id
            interest{
              id
            }
          }
        }
        `
    );

    //mapear os interesses do user
    const interestsIds = [];
    //foreach de cada elemento e fazer a query e guardar num array
    user.interests.map(interest => {
      interestsIds.push(interest.interest.id);
    });

    //Search all the courses that have the interests match wiith user
    const result = await Promise.all(
      interestsIds.map(async id => {
        const res = await ctx.db.query.courseInterests(
          {
            where: {
              interest: {
                id: id
              }
            }
          },
          `{
           course{
             id
             title
             description
             thumbnail
             createdAt
             price
             user {
               name
             }
           }
         }`
        );
        return res;
      })
    );
    //remove the layers of an array putting all in one flat function
    let res = result.flat();
    //this remove the header on the array to clean it before send it to frontend
    const courses = res.map(item => {
      return item.course;
    });

    //Sort the array by id
    courses.sort(function(a, b) {
      if (a.id.toLowerCase() < b.id.toLowerCase()) return -1;
      if (a.id.toLowerCase() > b.id.toLowerCase()) return 1;
      return 0;
    });

    //Filter the array to remove duplicates
    let final = Object.values(
      courses.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
    );

    //Add count to array
    let final1 = final.map(item => {
      item.count = final.length;
      return item;
    });

    console.log(final1);
    return final1;
  }
};

module.exports = Query;
