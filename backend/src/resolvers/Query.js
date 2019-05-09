const { forwardTo } = require('prisma-binding');

function formatDate(date) {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  const hi = date.match(regex, ' ')[0];
  return hi;
}
const Query = {
  categories: forwardTo('db'),
  category: forwardTo('db'),
  rateCourse: forwardTo('db'),
  course: forwardTo('db'),
  courses: forwardTo('db'),
  courseInterests: forwardTo('db'),
  interests: forwardTo('db'),
  user: forwardTo('db'),
  userInterests: forwardTo('db'),
  users: forwardTo('db'),
  video: forwardTo('db'),
  videos: forwardTo('db'),
  rateCourses: forwardTo('db'),
  videoUsers: forwardTo('db'),
  videoItems: forwardTo('db'),
  userCoursesConnection: forwardTo('db'),

  // videosConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // checkar se tem um current ID
    if (!userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );
  },
  videosConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be signed in!');
    }
    // query o video atual com comparaçao de ids de user
    return ctx.db.query.videosConnection(
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
      info
    );
  },

  videosFromUser(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be signed in!');
    }

    // query o video atual com comparaçao de ids de user
    return ctx.db.query.videos(
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
      info
    );
  },

  rateCourseList(parent, args, ctx, info) {
    return ctx.db.query.rateCourses(
      {
        orderBy: 'createdAt_DESC',
        where: {
          course: {
            id: args.id,
          },
        },
      },
      info
    );
  },
  coursesUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ve se esta logado
    // if (!userId) {
    //   throw new Error('you must be signed in!');
    // }
    // query o video atual com comparaçao de ids de user
    return ctx.db.query.courses(
      {
        where: {
          user: {
            id: userId,
          },
        },
        ...args,
      },
      info
    );
  },
  videosUserSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be signed in!');
    }

    // query o video atual com comparaçao de ids de user
    return ctx.db.query.videos(
      {
        where: {
          AND: [
            {
              user: {
                id: userId,
              },
            },
            {
              title_contains: args.title_contains,
            },
          ],
        },
      },
      info
    );
  },
  coursesSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }
    // query o video atual com comparaçao de ids de user
    return ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              title_contains: args.title_contains,
            },
          ],
        },
      },
      info
    );
  },
  // Listagem Cursos Interests
  async coursesUserInterestList(parent, args, ctx) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }
    // Get user
    const user = await ctx.db.query.user(
      {
        where: {
          id: userId,
        },
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

    // mapear os interesses do user
    const interestsIds = [];
    // foreach de cada elemento e fazer a query e guardar num array
    user.interests.map(interest => interestsIds.push(interest.interest.id));
    // Search all the courses that have the interests match wiith user
    const result = await Promise.all(
      interestsIds.map(async id => {
        const res = await ctx.db.query.courseInterests(
          {
            where: {
              AND: [
                {
                  interest: {
                    id,
                  },
                },
                {
                  course: {
                    state: 'PUBLISHED',
                  },
                },
              ],
            },
          },
          `{
           course{
             id
             title
             description
             thumbnail
             createdAt
             price
             state
             totalRate
             totalComments
             user {
               id
               name
             }
           }
         }`
        );
        return res;
      })
    );
    // remove thCoursee layers of an array putting all in one flat function
    const res = result.flat();

    // this remove the header on the array to clean it before send it to frontend
    const courses = res.map(item => item.course);

    // Wishlist array
    const wishlist = await ctx.db.query.wishlists(
      {
        where: {
          user: { id: userId },
        },
      },
      `{
        course{
          id
        }
      }`
    );

    // Wish ids to compare
    const wishIds = wishlist.map(item => item.course.id);
    // add the wished property to the final array
    const clean = courses.map(item => {
      item.wished = false;

      if (wishIds.length > 0) {
        wishIds.map(wish => {
          if (wish === item.id) {
            item.wished = true;
          }
        });
      }
      return item;
    });

    // Filter the array to remove duplicates
    const cleanResponse = Object.values(
      clean.reduce((acc, cur) => Object.assign(acc, { [cur.id]: cur }), {})
    );

    // Add count to array
    const finalRes = cleanResponse.map(item => {
      item.count = cleanResponse.length;

      return item;
    });

    finalRes.map(item => item);

    return finalRes;
  },
  async coursesConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado

    let user;

    if (userId) {
      user = await ctx.db.query.user(
        {
          where: {
            id: userId,
          },
        },
        `   {
          courses{
            course{
              id
            }
          }
        }
        `
      );
    }

    const coursesId = [];

    // foreach de cada elemento e fazer a query e guardar num array
    if (user) {
      await user.courses.map(user => coursesId.push(user.course.id));
    }
    return ctx.db.query.coursesConnection(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              id_not_in: coursesId,
            },
          ],
        },
      },
      info
    );
  },
  // Listagem cursos
  async coursesList(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado

    const { orderBy } = args;
    delete args.orderBy;

    let user;
    if (userId) {
      user = await ctx.db.query.user(
        {
          where: {
            id: userId,
          },
        },
        `{
            courses{
            course{
              id
            }
          }
        }
        `
      );
    }

    const coursesId = [];

    // foreach de cada elemento e fazer a query e guardar num array
    if (user) {
      await user.courses.map(user => coursesId.push(user.course.id));
    }
    // query o video atual com comparaçao de ids de user
    const res = await ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              id_not_in: coursesId,
            },
          ],
        },
        orderBy,
        ...args,
      },
      `{
         id
         title
         description
         thumbnail
         createdAt
         price
         state
         totalRate
         totalComments
         user {
           id
           name
         }
     }`,
      info
    );

    // Wishlist array
    const wishlist = await ctx.db.query.wishlists(
      {
        where: {
          user: { id: userId },
        },
      },
      `{
        course{id}
     }`
    );

    // Wish ids to compare
    const wishIds = wishlist.map(item => item.course.id);

    // add the wished property to the final array
    const finalRes = await res.map(item => {
      item.wished = false;
      wishIds.map(wish => {
        if (wish === item.id) {
          item.wished = true;
        }
      });
      return item;
    });

    return finalRes;
  },
  coursesFilter(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado

    let categoryId = args.category;
    let authorId = args.author;
    if (args.category === 'a') {
      categoryId = undefined;
    }

    if (args.author === 'a') {
      authorId = undefined;
    }

    return ctx.db.query.userCourses(
      {
        where: {
          AND: [
            {
              user: {
                id: userId,
              },
            },
            {
              course: {
                category: {
                  id: categoryId,
                },
              },
            },
            {
              course: {
                user: {
                  id: authorId,
                },
              },
            },
          ],
        },
      },
      info
    );
  },

  async wishlists(parent, args, ctx) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }

    const res = await ctx.db.query.wishlists(
      {
        where: {
          user: { id: userId },
        },
      },
      `{      course {
  id
  title
  price
  thumbnail
  totalRate
  totalComments
  state
  createdAt
  category {
    name
  }
  user {
    name
  }
}}`
    );

    return res;
  },
  async checkUserRated(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }
    const UserCourses = await ctx.db.query.userCourses(
      {
        where: {
          AND: [
            {
              user: {
                id: userId,
              },
            },
            {
              course: {
                id: args.courseId,
              },
            },
          ],
        },
      },
      info
    );

    const checked = await ctx.db.query.rateCourses(
      {
        where: {
          AND: [
            {
              user: {
                id: userId,
              },
            },
            {
              course: {
                id: args.courseId,
              },
            },
          ],
        },
      },
      info
    );
    if (UserCourses.length === 0) {
      return { message: false };
    }
    if (checked.length > 0) {
      return { message: false };
    }
    return { message: true };
  },
  async coursesRating(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }
    delete args.orderBy;

    let user;
    if (userId) {
      user = await ctx.db.query.user(
        {
          where: {
            id: userId,
          },
        },
        `{
            courses{
            course{
              id
            }
          }
        }
        `
      );
    }

    const coursesId = [];

    // foreach de cada elemento e fazer a query e guardar num array
    if (user) {
      await user.courses.map(user => coursesId.push(user.course.id));
    }
    // query o video atual com comparaçao de ids de user
    const res = await ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              id_not_in: coursesId,
            },
          ],
        },

        ...args,
      },
      `{
         id
         title
         description
         thumbnail
         createdAt
         price
         state
         totalRate
         totalComments
         user {
           id
           name
         }
     }`,
      info
    );

    // fazer a media
    const coursesAverage = await res.map(item => {
      item.average = item.totalRate / item.totalComments;
      return item;
    });

    // Wishlist array
    const wishlist = await ctx.db.query.wishlists(
      {
        where: {
          user: { id: userId },
        },
      },
      `{
        course{id}
     }`
    );

    // Wish ids to compare
    const wishIds = wishlist.map(item => item.course.id);

    // add the wished property to the final array
    const finalRes = await coursesAverage.map(item => {
      item.wished = false;
      wishIds.map(wish => {
        if (wish === item.id) {
          item.wished = true;
        }
      });
      return item;
    });
    await finalRes.sort((a, b) => {
      if (a.average > b.average) return -1;
      if (a.average < b.average) return 1;
      return 0;
    });

    return finalRes;
  },
  ordersUser(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be signed in!');
    }

    // query o video atual com comparaçao de ids de user
    return ctx.db.query.orders(
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
      info
    );
  },
  async coursesStats(parent, args, ctx, info) {
    console.time('starting');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }
    // get all the instrutor courses
    const allInstrutorCourses = await ctx.db.query.courses(
      {
        where: {
          user: { id: userId },
        },
      },
      `{
        id
        title
     }`
    );

    // get all the buys from the instrutor courses list
    const courses = await Promise.all(
      allInstrutorCourses.map(item =>
        ctx.db.query.userCourses(
          {
            where: {
              course: { id: item.id },
            },
            orderBy: 'createdAt_DESC',
          },
          `{
            id
            createdAt
        course{
          id
          title
        }
        user{
          id
        }
     }`
        )
      )
    );

    const res = courses.flat();

    res.sort(function(a, b) {
      if (a.course.id.toLowerCase() < b.course.id.toLowerCase()) return -1;
      if (a.course.id.toLowerCase() > b.course.id.toLowerCase()) return 1;
      return 0;
    });

    const result = [
      ...res
        .reduce((mp, o) => {
          if (!mp.has(o.course.id)) mp.set(o.course.id, { ...o, count: 0 });
          mp.get(o.course.id).count += 1;
          return mp;
        }, new Map())
        .values(),
    ];

    console.timeEnd('starting');
    return result;
  },
  async sellsByCourse(parent, args, ctx, info) {
    console.time('starting');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('you must be ssigned in!');
    }

    // get all the buys from the instrutor courses list
    const courses = await ctx.db.query.userCourses(
      {
        where: {
          course: { id: args.id },
        },
        orderBy: 'createdAt_ASC',
      },
      `{
            id
            createdAt
        course{
          id
          title
        }
        user{
          id
        }
     }`
    );

    const res = courses.flat();

    // res.sort(function(a, b) {
    //   if (a.course.id.toLowerCase() < b.course.id.toLowerCase()) return -1;
    //   if (a.course.id.toLowerCase() > b.course.id.toLowerCase()) return 1;
    //   return 0;
    // });

    res[0].count = 0;

    const result = [
      ...res
        .reduce((mp, o) => {
          if (!mp.has(formatDate(o.createdAt)))
            mp.set(formatDate(o.createdAt), { ...o, count: 0 });
          mp.get(formatDate(o.createdAt)).count += 1;
          return mp;
        }, new Map())
        .values(),
    ];

    console.timeEnd('starting');
    return result;
  },
};

module.exports = Query;
