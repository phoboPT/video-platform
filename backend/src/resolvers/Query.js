const { forwardTo } = require("prisma-binding");

const Query = {
  videos: forwardTo("db"),
  categorys: forwardTo("db"),
  comvideos: forwardTo("db"),
  video: forwardTo("db"),
  category: forwardTo("db"),
  comvideo: forwardTo("db")

  // async videos(parent, args, ctx, info) {
  //   //ctx.db.query-> vai ao contexto->db -> query no schema do prisma e retira de la os videos
  //   const videos = await ctx.db.query.videos();
  //   return videos;
  // }
};

module.exports = Query;
