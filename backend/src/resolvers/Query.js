const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db")

  //   async videos(parent, args, ctx, info) {
  //     const videos = await ctx.db.query.videos();

  //     return videos;
  //   }
};

module.exports = Query;
