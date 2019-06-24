const { forwardTo } = require('prisma-binding');
// const country = require('../../country.json');

function formatDate(date) {
  const regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g;
  return date.match(regex, ' ')[0];
}

function getDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return [yyyy, mm, dd];
}

const Query = {
  categories: forwardTo('db'),
  category: forwardTo('db'),
  rateCourse: forwardTo('db'),
  course: forwardTo('db'),
  courses: forwardTo('db'),
  interests: forwardTo('db'),
  user: forwardTo('db'),
  video: forwardTo('db'),
  videoUsers: forwardTo('db'),
  videoItems: forwardTo('db'),
  userCourses: forwardTo('db'),
  countries: forwardTo('db'),
  becomeInstructors: forwardTo('db'),

  async me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // checkar se tem um current ID
    if (!userId) {
      return null;
    }
    const res = await ctx.db.query.user(
      {
        where: {
          id: userId,
        },
      },
      info
    );

    return res;
  },

  videosFromUser(parent, args, ctx, info) {
    const { userId } = ctx.request;

    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
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
    if (!userId) {
      throw new Error('You must be signed in!');
    }
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

  async coursesUserConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    return ctx.db.query.coursesConnection(
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
  async coursesInstructor(parent, args, ctx, info) {
    return ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              user: {
                id: args.id,
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
  async categoriesConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    return ctx.db.query.categoriesConnection({}, info);
  },
  async countriesConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    return ctx.db.query.countriesConnection({}, info);
  },
  async interestsConnection(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    return ctx.db.query.interestsConnection({}, info);
  },
  async coursesSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado

    if (!userId) {
      throw new Error('You must be signed in!');
    }
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
              courses {
                course {
                  id
                }
              }
          interests{
            id
            interest{
              id
            }
          }
        }
        `
    );

    const coursesIds = user.courses.map(course => course.course.id);
    // query o video atual com comparaçao de ids de user
    const finalRes = await ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              title_contains: args.where.title,
            },
            {
              id_not_in: coursesIds,
            },
          ],
        },
      },
      info
    );

    return finalRes;
  },
  // Listagem Cursos Interests
  async coursesUserInterestList(parent, args, ctx) {
    console.time('coursesUserInterestList');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
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
              courses {
                course {
                  id
                }
              }
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
    const coursesIds = user.courses.map(course => course.course.id);
    // foreach de cada elemento e fazer a query e guardar num array
    const interestsIds = user.interests.map(interest => interest.interest.id);

    // Search all the courses that have the interests match wiith user

    const result = await ctx.db.query.courseInterests(
      {
        where: {
          AND: [
            {
              interest: {
                id_in: interestsIds,
              },
            },
            {
              course: {
                state: 'PUBLISHED',
              },
            },
            {
              course: {
                id_not_in: coursesIds,
              },
            },
            {
              course: {
                user: {
                  id_not: userId,
                },
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

    console.timeEnd('coursesUserInterestList');

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
            {
              user: {
                id_not: userId,
              },
            },
          ],
        },
      },
      info
    );
  },
  // Listagem cursos
  async coursesList(parent, args, ctx, info) {
    console.time('coursesList');
    console.log('coursesList Init');
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
      await user.courses.map(course => coursesId.push(course.course.id));
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
            {
              user: {
                id_not: userId,
              },
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
        return wish;
      });
      return item;
    });
    console.timeEnd('coursesList');
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
      throw new Error('You must be signed in!');
    }

    return ctx.db.query.wishlists(
      {
        where: {
          user: { id: userId },
        },
      },
      `{
         course {
          id
          title
          price
          thumbnail
          totalRate
          totalComments
          state
          createdAt
          category {
            id
            name
          }
          user {
            id
            name
          }
        }
      }`
    );
  },
  async checkUserRated(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }

    const userCourses = await ctx.db.query.userCourses(
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
    if (userCourses.length === 0) {
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
    // if (!userId) {
    //   throw new Error('You must be signed in!');
    // }
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
            {
              user: {
                id_not: userId,
              },
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
      item.average = isNaN(item.totalRate / item.totalComments)
        ? 0
        : item.totalRate / item.totalComments;
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
      throw new Error('You must be signed in!');
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
  async ordersUserStats(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }

    // query o video atual com comparaçao de ids de user
    const totalOrders = await ctx.db.query.orders(
      {
        where: {
          user: {
            id: userId,
          },
        },
      },
      `{
        total
      }`
    );

    const amountOrders = totalOrders.reduce(
      (tally, item) => tally + item.total,
      0
    );
    const res = {
      countOrders: totalOrders.length,
      amountOrders,
    };

    return res;
  },
  async coursesStats(parent, args, ctx, info) {
    console.time('courseStats');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
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

    // res.sort(function(a, b) {
    //   if (a.course.id.toLowerCase() < b.course.id.toLowerCase()) return -1;
    //   if (a.course.id.toLowerCase() > b.course.id.toLowerCase()) return 1;
    //   return 0;
    // });

    const result = [
      ...res
        .reduce((mp, o) => {
          if (!mp.has(o.course.id)) mp.set(o.course.id, { ...o, count: 0 });
          mp.get(o.course.id).count += 1;
          return mp;
        }, new Map())
        .values(),
    ];

    console.timeEnd('courseStats');
    return result;
  },
  async sellsByCourse(parent, args, ctx, info) {
    console.time('sellsByCourse');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }
    // Get the actual month and year to dinamycally set the date
    const date = getDate();
    // get all the buys from the instrutor courses list
    const courses = await ctx.db.query.userCourses(
      {
        where: {
          AND: [
            { course: { id: args.id } },
            { createdAt_gte: `${date[0]}-${date[1]}-01` },
            { createdAt_lte: `${date[0]}-${date[1]}-${date[2]}` },
          ],
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

    console.log('courses', courses);

    if (courses.length > 0) {
      const res = courses.flat();

      res[0].count = 0;
      console.log('res', res[0]);
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
      console.timeEnd('sellsByCourse');
      console.log(result);
      return result;
    }
    const template = [];
    return template;
  },
  async coursesStatsByDate(parent, args, ctx, info) {
    console.time('courseStats');
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
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

    const ids = allInstrutorCourses.map(item => item.id);
    const date = args.initialDate.split('-');
    // get all the buys from the instrutor courses list
    const courses = await ctx.db.query.userCourses(
      {
        where: {
          AND: [
            { course: { id_in: ids } },
            {
              createdAt_gte: `${date[0]}-${date[1]}-${date[2]}`,
            },
            {
              createdAt_lte: `${date[0]}-${date[1]}-${parseInt(date[2]) + 1}`,
            },
          ],
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
    );

    const res = courses.flat();

    const result = [
      ...res
        .reduce((mp, o) => {
          if (!mp.has(o.course.id)) mp.set(o.course.id, { ...o, count: 0 });
          mp.get(o.course.id).count += 1;
          return mp;
        }, new Map())
        .values(),
    ];

    console.timeEnd('courseStats');
    return result;
  },
  async instrutorStats(parent, args, ctx, info) {
    const allCourses = await ctx.db.query.courses(
      {
        where: {
          user: { id: args.id },
        },
      },
      `{
        id
        totalComments
     }`
    );
    // allCourses.length
    let totalComments = 0;
    allCourses.map(course => (totalComments += course.totalComments));
    // totalComments
    const coursesId = allCourses.map(course => course.id);

    const userCourse = await ctx.db.query.userCourses(
      {
        where: {
          course: { id_in: coursesId },
        },
      },
      `{
          id
       }`
    );

    const result = {
      cursos: allCourses.length,
      alunos: userCourse.length,
      avaliacoes: totalComments,
    };
    return result;
  },
  async coursesCategory(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }

    const coursesBuyed = await ctx.db.query.userCourses(
      {
        where: { user: { id: userId } },
      },
      `{
        course{
        id
      }
      }`
    );

    const coursesToFilter = coursesBuyed.map(item => item.course.id);
    return ctx.db.query.courses(
      {
        orderBy: args.orderBy,
        where: {
          AND: [
            {
              category: {
                id_in: args.category,
              },
            },
            {
              id_not_in: coursesToFilter,
            },
            {
              state: 'PUBLISHED',
            },
            {
              user: {
                name_contains: args.author,
              },
            },
          ],
        },
      },
      info
    );
  },
  async authorSearch(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Ver se esta logado
    if (!userId) {
      throw new Error('You must be signed in!');
    }

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
              courses {
                course {
                  id
                }
              }
          interests{
            id
            interest{
              id
            }
          }
        }
        `
    );
    const coursesIds = user.courses.map(course => course.course.id);
    // query o video atual com comparaçao de ids de user
    const finalRes = await ctx.db.query.courses(
      {
        where: {
          AND: [
            {
              state: 'PUBLISHED',
            },
            {
              user: {
                name_contains:
                  args.where.title === '' ? undefined : args.where.title,
              },
            },
            {
              id_not_in: coursesIds,
            },
          ],
        },
      },
      info
    );

    return finalRes;
  },
  async paymentBill(parent, args, ctx, info) {
    const { userId } = ctx.request;
    return ctx.db.query.paymentBills(
      {
        where: { user: { id: userId } },
      },
      info
    );
  },
  // Method used to insert countries in the db
  // async insertData(parent, args, ctx, info) {
  //   country.forEach(item => {
  //     ctx.db.mutation.createCountry({
  //       data: {
  //         name: item.name,
  //         code: item.code,
  //       },
  //     });
  //   });
  // },
};

module.exports = Query;
