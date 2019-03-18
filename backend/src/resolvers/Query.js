const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categories: forwardTo("db"),
  users: forwardTo("db"),
  courses: forwardTo("db"),
  course: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  user: forwardTo("db"),
  comCourse: forwardTo("db"),
  interests: forwardTo("db"),
  userInterests: forwardTo("db"),

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
          id: userId,
        },
      },
      info,
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
            id: userId,
          },
        },
      },
      info,
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
            id: userId,
          },
        },
      },
      info,
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
            id: userId,
          },
        },
        ...args,
      },
      info,
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
              user: { id: userId },
            },
            {
              title_contains: args.title_contains,
            },
          ],
        },
      },
      info,
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
        ...args,
      },
      info,
    );
  },
  comCourseList(parent, args, ctx, info) {
    return ctx.db.query.comCourses(
      {
        where: {
          course: {
            id: args.id,
          },
        },
        orderBy: "createdAt_DESC",
      },
      info,
    );
  },
};

module.exports = Query;
