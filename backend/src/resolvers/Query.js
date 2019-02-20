const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categorys: forwardTo("db"),
  comVideos: forwardTo("db"),
  users: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  comVideo: forwardTo("db"),
  me(parent, args, ctx, info) {
    //checkar se tem um current ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId }
      },
      info
    );
  },

  videosUser(parent, args, ctx, info) {
    //const { userId } = ctx.request;
    console.log(args);
    //Ver se esta logado
    // if (!userId) {
    //   throw new Error("you must be signed in!");
    // }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.videos(
      {
        where: {
          user: { id: args.id }
        }
      },
      info
    );
  },
  videosUser(parent, args, ctx, info) {
    console.log(args);
    //Ver se esta logado
    // if (!userId) {
    //   throw new Error("you must be signed in!");
    // }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.comVideos(
      {
        where: {
          user: { id: args.id }
        }
      },
      info
    );
  }
};

module.exports = Query;
