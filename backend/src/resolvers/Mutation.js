const Mutations = {
  async createVideo(parent, args, ctx, info) {
    //TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const video = await ctx.db.mutation.createVideo(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          category: {
            connect: {
              id: ctx.request.categoryId
            }
          },
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
    const ownsVideo = video.user.id === ctx.request.userId;
    //falta verificar se é admin ou user (hasPermissions)
    if (!ownsVideo) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteVideo({ where }, info);
  },
  async createCategory(parent, args, ctx, info) {
    //TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const category = await ctx.db.mutation.createCategory(
      {
        data: {
          ...args
        }
      },
      info
    );
    //para dar debug console.log(category);
    return category;
  },
  updateCategory(parent, args, ctx, info) {
    //faz uma copia dos updates para guardar o id nos args
    const updates = { ...args };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },

  async deleteCategory(parent, args, ctx, info) {
    const where = { id: args.id };
    // //1.encontrar o video
    // const video = await ctx.db.query.category({ where }, `{id name}`);
    // //2.checkar se tem permissoes para o apagar

    //3.dar delete
    return ctx.db.mutation.deleteCategory({ where }, info);
  },

  async createComVideo(parent, args, ctx, info) {
    //TODO: Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const comvideo = await ctx.db.mutation.createComVideo(
      {
        data: {
          video: {
            connect: {
              id: ctx.request.videoId
            }
          },
          user: {
            connect: {
              id: ctx.request.userId
            }
          },
          ...args
        }
      },
      info
    );

    return comvideo;
  },
  updateComVideo(parent, args, ctx, info) {
    //faz uma copia dos updates para guardar o id nos args
    const updates = { ...args };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateComVideo(
      {
        data: updates,
        where: { id: args.id }
      },
      info
    );
  },
  async deleteComVideo(parent, args, ctx, info) {
    const where = { id: args.id };
    //1.encontrar o video
    const ComVideo = await ctx.db.query.comvideo({ where }, `{id comment}`);
    //2.checkar se tem permissoes para o apagar
    const ownsComVideo = ComVideo.user.id === ctx.request.userId;
    //falta verificar se é admin ou user (hasPermissions)
    if (!ownsComVideo) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteCom({ where }, info);
  }
};

module.exports = Mutations;
