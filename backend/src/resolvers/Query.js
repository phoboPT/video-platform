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
  coursesSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // console.log(args);
    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be ssigned in!");
    }

    //query o video atual com comparaçao de ids de user
    return ctx.db.query.courses(
      {
        ...args
      },
      info
    );
  },
  async coursesUserInterestList(parent, args, ctx, info) {
    const { userId } = ctx.request;

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

    //foreach de cada elemento e fazer a query e guardar num array
    const interestsIds = [];

    user.interests.map(interest => {
      interestsIds.push(interest.interest.id);
    });
    //retorna um array
    let all = [];

    const checkIds = actualId => {
      let exist = false;
      if (all.length < 1) {
        all.push(actualId);
        exist = false;
      } else {
        all.map(item => {
          if (item === actualId) {
            exist = true;
          }
          all.push(actualId);
        });
      }
      return exist;
    };

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
          }`,
          info
        );
        if (checkIds(res[0].course.id)) {
          return res[0].course;
        }
      })
    );

    var FilteredResult = result.filter(el => {
      return el;
    });

    return FilteredResult;
  }
};

module.exports = Query;
