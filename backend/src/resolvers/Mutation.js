const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { randomBytes } = require("crypto");
const { promisify } = require("util");
const { transport, makeANiceEmail } = require("../mail");

const Mutations = {
  async createVideo(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //Check if they are logged in
    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }

    const video = {
      ...args,
    };
    const { course } = video;
    //elimina o id dos updates
    delete video.course;

    const videos = await ctx.db.mutation.createVideo(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },

          ...video,
        },
      },
      info,
    );

    ctx.db.mutation.createCourseVideos(
      {
        data: {
          course: {
            connect: { id: course },
          },
          video: {
            connect: { id: videos.id },
          },
        },
      },
      info,
    );

    //para dar debug console.log(video);
    return videos;
  },
  updateVideo(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error("You must be logged in to do that!");
    }
    //faz uma copia dos updates
    const updates = {
      ...args,
    };
    //elimina o id dos updates
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateVideo(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async deleteVideo(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const where = {
      id: args.id,
    };
    //1.encontrar o video
    const video = await ctx.db.query.video(
      {
        where,
      },
      `{id}`,
    );
    //2.checkar se tem permissoes para o apagar
    //const ownsVideo = video.user.id === ctx.request.userId;
    //TODO falta verificar se é admin ou user (hasPermissions)
    // if (!ownsVideo) {
    //   throw new Error("You don't have permission to do that!");
    // }
    //3.dar delete
    return ctx.db.mutation.deleteVideo(
      {
        where,
      },
      info,
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
          ...args,
        },
      },
      info,
    );
    //para dar debug console.log(category);
    return category;
  },
  updateCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    //faz uma copia dos updates para guardar o id nos args
    const updates = {
      ...args,
    };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },

  async deleteCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const where = {
      id: args.id,
    };
    // //1.encontrar o video
    // const video = await ctx.db.query.category({ where }, `{id name}`);
    // //2.checkar se tem permissoes para o apagar

    //3.dar delete
    return ctx.db.mutation.deleteCategory(
      {
        where,
      },
      info,
    );
  },

  // async createComVideo(parent, args, ctx, info) {
  //   //  Check if they are logged in
  //   if (!ctx.request.userId) {
  //     throw new Error("You must be logged in to do that!");
  //   }

  //   const comvideo = await ctx.db.mutation.createComVideo(
  //     {
  //       data: {
  //         user: {
  //           connect: {
  //             id: ctx.request.userId
  //           }
  //         },
  //         videos: {
  //           connect: {
  //             id: args.video
  //           }
  //         },
  //         ...args
  //       }
  //     },
  //     info
  //   );

  //   return comvideo;
  // },
  // async updateComVideo(parent, args, ctx, info) {
  //   if (!ctx.request.userId) {
  //     throw new Error("You must be logged in to do that!");
  //   }
  //   //1.encontrar o video
  //   const comVideo = await ctx.db.query.comVideo(
  //     {
  //       where
  //     },
  //     `{id}`
  //   );
  //   //2.checkar se tem permissoes para o apagar
  //   const ownsComVideo = comVideo.user.id === ctx.request.userId;
  //   //falta verificar se é admin ou user (hasPermissions)
  //   if (!ownsComVideo) {
  //     throw new Error("You don't have permission to do that!");
  //   }
  //   //faz uma copia dos updates para guardar o id nos args
  //   const updates = {
  //     ...args
  //   };
  //   //elimina o id dos updates para nao dar update no id(unico)
  //   delete updates.id;

  //   //da run no update method
  //   return ctx.db.mutation.updateComVideo(
  //     {
  //       data: updates,
  //       where: {
  //         id: args.id
  //       }
  //     },
  //     info
  //   );
  // },
  // async deleteComVideo(parent, args, ctx, info) {
  //   const where = {
  //     id: args.id
  //   };
  //   //1.encontrar o video
  //   const ComVideo = await ctx.db.query.comVideo(
  //     {
  //       where
  //     },
  //     `{id comment}`
  //   );
  //   //2.checkar se tem permissoes para o apagar
  //   const ownsComVideo = ComVideo.user.id === ctx.request.userId;
  //   //falta verificar se é admin ou user (hasPermissions)
  //   if (!ownsComVideo) {
  //     throw new Error("You don't have permission to do that!");
  //   }
  //   //3.dar delete
  //   return ctx.db.mutation.deleteCom(
  //     {
  //       where
  //     },
  //     info
  //   );
  // },
  async signup(parent, args, ctx, info) {
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
            set: ["USER"],
          },
        },
      },
      info,
    );
    //create jwt token for them
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.APP_SECRET,
    );
    //we set the jwt as a cookie on the ctx
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, //1 year cookie
    });
    //finally we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx, info) {
    //check if there is a user
    const user = await ctx.db.query.user({
      where: { email },
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
      maxAge: 1000 * 60 * 60 * 24 * 365, //1 year cookie
    });
    //return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token");
    return { message: "Goodbye!" };
  },
  async updateUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    //faz uma copia dos updates para guardar o id nos args
    const updates = {
      ...args,
    };
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: userId,
        },
      },
      info,
    );
  },
  async updatePassword(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    if (args.password !== args.confirmPassword) {
      throw new Error("The Passwords are not equal!");
    }
    //faz uma copia dos updates para guardar o id nos args
    const updates = {
      password: args.password,
    };

    //volta a encriptar a pass nova
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    //elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: userId,
        },
      },
      info,
    );
  },
  async requestReset(parents, args, ctx, info) {
    //1.check if the user is real
    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }

    //2. set a reset token and expiry on that user
    const resetToken = (await promisify(randomBytes)(20)).toString("hex");
    const resetTokenExpiry = Date.now() + 3600000; //1 hour from now

    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    //3. Email them that reset tokenaaa
    const mailRes = await transport.sendMail({
      from: "picus@gmail.com",
      to: user.email,
      subject: "Your password reset",
      html: makeANiceEmail(`Your  Password Reset Token is here!
      \n\n 
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
      Click Here to reset</a> `),
    });
    return { message: "Thanks" };
  },
  async resetPassword(parents, args, ctx, info) {
    //checkar pwbb
    if (args.password !== args.confirmPassword) {
      throw new Error("Passwords don t match!");
    }
    //check legit token
    //check if expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Datenow() - 3600000,
      },
    });
    if (!user) {
      throw new Error("This token is either invalid or expired!");
    }
    //hash new pw
    const password = await bcrypt.hash(args.password, 10);
    //save the new pw remove old token
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    //generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    //set jwt cookie
    ctx.response.cookie("token", token, {
      httpOnly: true,
      magAge: 1000 * 60 * 60 * 25 * 365,
    });
    //return new user
    return updatedUser;
  },
  async createCourse(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in soooon");
    }
    const data = {
      ...args,
    };

    //elimina o id dos updates
    delete data.category;

    // 4. If its not, create a fresh CourseVideo for that Course!
    return ctx.db.mutation.createCourse(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          category: {
            connect: {
              id: args.category,
            },
          },
          ...data,
        },
      },
      info,
    );
  },

  updateCourse(parent, args, ctx, info) {
    //faz uma copia dos updates
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in soooon");
    }

    const updates = {
      ...args,
    };
    //elimina o id dos updates
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateCourse(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async deleteCourse(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const where = {
      id: args.id,
    };
    //1.encontrar o video
    const course = await ctx.db.query.course(
      {
        where,
      },
      `{id}`,
    );
    //2.checkar se tem permissoes para o apagar
    const ownsCourse = course.user.id === ctx.request.userId;
    //falta verificar se é admin ou user (hasPermissions)
    if (!ownsCourse) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteCourse(
      {
        where,
      },
      info,
    );
  },
  async createComCourse(parent, args, ctx, info) {
    //  Check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }

    const comvideo = await ctx.db.mutation.createComCourse(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
          course: {
            connect: {
              id: args.courseId,
            },
          },
          comment: args.comment,
        },
      },

      info,
    );

    return comvideo;
  },
  async deleteComCourse(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error("You must be logged in to do that!");
    }
    const where = {
      id: args.id,
    };
    //1.encontrar o video
    const comCourse = await ctx.db.query.comCourse(
      {
        where,
      },
      `{id user{id}}`,
    );
    //2.checkar se tem permissoes para o apagar
    const ownsComCourse = comCourse.user.id === ctx.request.userId;

    if (!ownsComCourse) {
      throw new Error("You don't have permission to do that!");
    }
    //3.dar delete
    return ctx.db.mutation.deleteComCourse(
      {
        where,
      },
      info,
    );
  },
  updateComCourse(parent, args, ctx, info) {
    //faz uma copia dos updates
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in");
    }

    const updates = {
      ...args,
    };
    //elimina o id dos updates
    delete updates.id;
    //da run no update method
    return ctx.db.mutation.updateComCourse(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async removeFromCourse(parent, args, ctx, info) {
    //Make sure they are signin
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in soooon");
    }

    //query the users current cart
    const [existingVideo] = await ctx.db.query.courseVideoses({
      where: {
        course: { id: args.courseId },
        video: { id: args.id },
      },
    });
    //check if that item is already in their cart
    if (existingVideo) {
      console.log("Already added");
      return ctx.db.mutation.deleteCourseVideos(
        {
          where: { id: existingVideo.id },
        },
        info,
      );
    } else {
      throw "Video already removed";
    }
  },
  async addTargetCourse(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in soooon");
    }
    console.log(args);

    // 4. If its not, create a fresh CartItem for that user!
    return ctx.db.mutation.createCourseInterest(
      {
        data: {
          course: {
            connect: { id: args.courseId },
          },
          interest: {
            connect: { id: args.interestId },
          },
        },
      },
      info,
    );
  },
  async addTargetUser(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in ");
    }

    // 4. If its not, create a fresh CartItem for that user!
    return ctx.db.mutation.createUserInterest(
      {
        data: {
          user: {
            connect: { id: userId },
          },
          interest: {
            connect: { id: args.interestId },
          },
        },
      },
      info,
    );
  },
  async addToCart(parent, args, ctx, info) {
    //Make sure they are signin
    const { userId } = ctx.request;
    //Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        course: { id: args.id },
      },
    });

    //Check if that item is already in their cart and increment by 1 id it is
    if (existingCartItem) {
      throw new Error("Arleady added to cart");
    }
    //If its not, create a fresh new item
    return ctx.db.mutation.createCartItem({
      data: {
        user: {
          connect: { id: userId },
        },
        course: {
          connect: {
            id: args.id,
          },
        },
      },
      info,
    });
  },
  async removeFromCart(parent, args, ctx, info) {
    //find cartItem
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{id,user{id}}`,
    );
    //Make sure we found an item
    if (!cartItem) throw new Error("No Item found");

    //Make sure they own the cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error("Cheatin huhh");
    }

    //Delete cartItem
    return ctx.db.mutation.deleteCartItem(
      {
        where: {
          id: args.id,
        },
      },
      info,
    );
  },
  async removeTargetUser(parent, args, ctx, info) {
    //Make sure they are signin
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error("You must be signed in soooon");
    }

    return ctx.db.mutation.deleteUserInterest(
      {
        where: { id: args.interestId },
      },
      info,
    );
  },
};

module.exports = Mutations;
