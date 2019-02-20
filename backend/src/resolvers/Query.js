const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categorys: forwardTo("db"),
  comvideos: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  comvideo: forwardTo("db"),

  async videosuser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //Ver se esta logado
    if (!userId) {
      throw new Error("you must be signed in!");
    }
    //query o video atual
    return ctx.db.query.videosuser(
      {
        where: {
          user: { id: userId }
        }
      },
      info
    );
  }
};

module.exports = Query;
