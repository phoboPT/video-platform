const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categories: forwardTo("db"),
  // comVideos: forwardTo("db"),
  users: forwardTo("db"),
  courses: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  // comVideo: forwardTo("db"),
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
            id: args.id
          }
        }
      },
      info
    );
  },
  // comsVideo(parent, args, ctx, info) {
  //   //Ver se esta logado
  //   if (!userId) {
  //     throw new Error("you must be signed in!");
  //   }
  //   //query o video atual com comparaçao de ids de user
  //   return ctx.db.query.comVideos(
  //     {
  //       where: {
  //         video: { id: args.id }
  //       }
  //     },
  //     info
  //   );
  // },
  coursesUser(parent, args, ctx, info) {
    //Ve se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.courses(
      {
        where: {
          user: {
            id: args.id
          }
        }
      },
      info
    );
  }
};

module.exports = Query;
