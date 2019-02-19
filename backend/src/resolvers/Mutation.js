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
  },
  updateVideo(parent, args, ctx, info) {
    //faz uma copia dos updates
    const updates = { ...args };
    //elimina o id dos updates
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateVideo(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteVideo(parent, args, ctx, info) {
    const where = { id: args.id };
    //1.encontrar o video
    const video = await ctx.db.query.video({ where }, `{id title description}`);
    //2.checkar se tem permissoes para o apagar
    //-->por fazer
    //3.dar delete
    return ctx.db.mutation.deleteVideo({ where }, info);
  }
};

module.exports = Mutations;
