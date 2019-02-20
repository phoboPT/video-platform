const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categorys: forwardTo("db"),
  comVideos: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  comVideo: forwardTo("db"),

  async videosUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    console.log(args);
    //Ver se esta logado
    // if (!userId) {
    //   throw new Error("you must be signed in!");
    // }
    //query o video atual
    return ctx.db.query.videos(
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
