const Mutations = {
  async createVideo(parent, args, ctx, info) {
    //TODO: Check if they are logged in

    const video = await ctx.db.mutation.createVideo(
      {
        data: {
          ...args
        }
      },
      info
    );
    //para dar debug console.log(video);
    return video;
  }
};

module.exports = Mutations;
