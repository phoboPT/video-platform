const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categorys: forwardTo("db"),
  comVideos: forwardTo("db"),
  users: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
<<<<<<< HEAD
=======
  comVideo: forwardTo("db"),

>>>>>>> e55a451b5702f499b618649b4b942c1f6f564ba3
  me(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //checkar se tem um current ID

    if (!userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: userId }
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
          user: { id: userId }
        }
      },
      info
    );
  },
<<<<<<< HEAD
  comsVideo(parent, args, ctx, info) {
    console.log(args);
=======
  comVideos(parent, args, ctx, info) {
    const { userId } = ctx.request;
>>>>>>> e55a451b5702f499b618649b4b942c1f6f564ba3
    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    //query o video atual com comparaçao de ids de user
    return ctx.db.query.comVideo(
      {
        where: {
<<<<<<< HEAD
          video: { id: args.id }
=======
          user: { id: userId }
>>>>>>> e55a451b5702f499b618649b4b942c1f6f564ba3
        }
      },
      info
    );
  }
};

module.exports = Query;
