const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Mutations = {
  async createVideo(parent, args, ctx, info) {
    //Check if they are logged in
    // if (!ctx.request.userId) {
    //   throw new Error("You must be logged in to do that!");
    // }

    const video = await ctx.db.mutation.createVideo(
      {
        data: {
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
    //para dar debug console.log(video);
    return video;
  },
  updateVideo(parent, args, ctx, info) {
    //faz uma copia dos updates
    const updates = {
      ...args
    };
    //elimina o id dos updates
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateVideo(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteVideo(parent, args, ctx, info) {
    const where = {
      id: args.id
    };
    //1.encontrar o video
    const video = await ctx.db.query.video(
      {
        where
      },
      `{id title description}`
    );
    //2.checkar se tem permissoes para o apagar
    const ownsVideo = video.user.id === ctx.request.userId;
    //falta verificar se é admin ou user (hasPermissions)
    if (!ownsVideo) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteVideo(
      {
        where
      },
      info
    );
  },
  async createCategory(parent, args, ctx, info) {
    //Check if they are logged in
    // if (!ctx.request.userId) {
    //   throw new Error("You must be logged in to do that!");
    // }

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
    const updates = {
      ...args
    };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },

  async deleteCategory(parent, args, ctx, info) {
    const where = {
      id: args.id
    };
    // //1.encontrar o video
    // const video = await ctx.db.query.category({ where }, `{id name}`);
    // //2.checkar se tem permissoes para o apagar

    //3.dar delete
    return ctx.db.mutation.deleteCategory(
      {
        where
      },
      info
    );
  },

  async createComVideo(parent, args, ctx, info) {
    //  Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const comvideo = await ctx.db.mutation.createComVideo(
      {
        data: {
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
    const updates = {
      ...args
    };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateComVideo(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  },
  async deleteComVideo(parent, args, ctx, info) {
    const where = {
      id: args.id
    };
    //1.encontrar o video
    const ComVideo = await ctx.db.query.comvideo(
      {
        where
      },
      `{id comment}`
    );
    //2.checkar se tem permissoes para o apagar
    const ownsComVideo = ComVideo.user.id === ctx.request.userId;
    //falta verificar se é admin ou user (hasPermissions)
    if (!ownsComVideo) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteCom(
      {
        where
      },
      info
    );
  },
  async signup(parent, args, ctx, info) {
    console.log("hey");
    //lowercase the email
    args.email = args.email.toLowerCase();
    //hash password
    const password = await bcrypt.hash(args.password, 10);
    //create user
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permission: {
            set: ["USER"]
          }
        }
      },
      info
    );
    //create jwt token for them
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.APP_SECRET
    );
    //we set the jwt as a cookie on the ctx
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    });
    //finally we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    //check if there is a user
    const user = await ctx.db.query.user({
      where: { email }
    });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    //check passwords
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error(`Invalid Password`);
    }
    //cgenerate jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //Set the cookie with the token
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 //1 year cookie
    });
    //return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async updateUser(parent, args, ctx, info) {
    //faz uma copia dos updates para guardar o id nos args
    const updates = {
      ...args
    };

    //volta a encriptar a pass nova
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateComVideo(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = Mutations;
