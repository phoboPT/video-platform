const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { makeANiceEmail, transport } = require('../mail');
const stripe = require('../stripe');

const updateRate = async (ctx, courseId, newRate, oldRate) => {
  const savedRate = await ctx.db.query.course(
    {
      where: {
        id: courseId,
      },
    },
    '{totalRate}'
  );

  const allCoursesRate = await ctx.db.query.rateCourses(
    {
      where: { course: { id: courseId } },
    },
    `{ rate }`
  );

  let updatedRate;
  if (newRate === null) {
    updatedRate = savedRate.totalRate - oldRate;
  } else {
    updatedRate = savedRate.totalRate + (newRate - oldRate || 0);
  }

  if (savedRate) {
    return ctx.db.mutation.updateCourse({
      where: { id: courseId },
      data: { totalRate: updatedRate, totalComments: allCoursesRate.length },
    });
  }
};

const Mutations = {
  async createVideo(parent, args, ctx, info) {
    const { userId } = ctx.request;
    // Check if they are logged in
    if (!userId) {
      throw new Error('You must be logged in to do that!');
    }

    const video = {
      ...args,
    };
    const { course, isUpdate, videoId } = video;

    // elimina o id dos updates
    delete video.course;
    delete video.isUpdate;
    delete video.videoId;
    let videos;

    if (isUpdate) {
      videos = ctx.db.mutation.updateVideo(
        {
          data: video,
          where: {
            id: videoId,
          },
          video,
        },
        info
      );
    } else {
      videos = await ctx.db.mutation.createVideo(
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
        info
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
        info
      );
    }

    // para dar debug console.log(video);
    return videos;
  },
  async deleteVideo(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const where = {
      id: args.id,
    };
    // 1.encontrar o video
    await ctx.db.query.video(
      {
        where,
      },
      '{id}'
    );
    // 2.checkar se tem permissoes para o apagar
    // const ownsVideo = video.user.id === ctx.request.userId;
    // TODO falta verificar se é admin ou user (hasPermissions)
    // if (!ownsVideo) {
    //   throw new Error("You don't have permission to do that!");
    // }
    // 3.dar delete
    return ctx.db.mutation.deleteVideo(
      {
        where,
      },
      info
    );
  },
  updateVideo(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!userId) {
      throw new Error('You must be logged in to do that!');
    }
    // faz uma copia dos updates
    const updates = {
      ...args,
    };
    // elimina o id dos updates
    delete updates.id;
    // da run no update method
    return ctx.db.mutation.updateVideo(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async createCategory(parent, args, ctx, info) {
    // Check if they are logged in
    // if (!ctx.request.userId) {
    //   throw new Error("You must be logged in to do that!");
    // }

    const category = await ctx.db.mutation.createCategory(
      {
        data: {
          ...args,
        },
      },
      info
    );
    // para dar debug console.log(category);
    return category;
  },
  updateCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // faz uma copia dos updates para guardar o id nos args
    const updates = {
      ...args,
    };
    // elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    // da run no update method
    return ctx.db.mutation.updateCategory(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },

  async deleteCategory(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const where = {
      id: args.id,
    };

    return ctx.db.mutation.deleteCategory(
      {
        where,
      },
      info
    );
  },

  async signup(parent, args, ctx, info) {
    // lowercase the email
    args.email = args.email.toLowerCase();
    // hash password
    const password = await bcrypt.hash(args.password, 10);
    // create user
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permission: {
            set: ['USER'],
          },
        },
      },
      info
    );
    // create jwt token for them
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.APP_SECRET
    );
    // we set the jwt as a cookie on the ctx
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 24 * 365 * 60 * 60, // 1 year cookie
    });
    // finally we return the user to the browser
    return user;
  },
  async signin(parent, { email, password }, ctx) {
    // check if there is a user
    const user = await ctx.db.query.user({
      where: { email },
    });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // check passwords
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid Password');
    }
    // cgenerate jwt token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 24 * 365 * 60 * 60, // 1 year cookie
    });
    // return the user
    return user;
  },
  async updateUser(parent, args, ctx, info) {
    const { userId } = ctx.request;
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    // faz uma copia dos updates para guardar o id nos args
    const updates = {
      ...args,
    };
    // elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    // da run no update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: userId,
        },
      },
      info
    );
  },
  signout(parent, args, ctx) {
    ctx.response.clearCookie('token');
    return { message: 'Goodbye!' };
  },
  async updatePassword(parent, args, ctx, info) {
    const { userId } = ctx.request;

    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    if (args.password !== args.confirmPassword) {
      throw new Error('The Passwords are not equal!');
    }
    // faz uma copia dos updates para guardar o id nos args
    const updates = {
      password: args.password,
    };

    // volta a encriptar a pass nova
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    // elimina o id dos updates para nao dar update no id(unico)
    delete updates.id;
    // da run no update method
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: userId,
        },
      },
      info
    );
  },
  async requestReset(parents, args, ctx) {
    // 1.check if the user is real
    const user = await ctx.db.query.user({ where: { email: args.email } });

    if (!user) {
      throw new Error(`No such user found for email ${args.email}`);
    }

    // 2. set a reset token and expiry on that user
    const resetToken = (await promisify(randomBytes)(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

    await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });

    // 3. Email them that reset tokenaaa
    await transport.sendMail({
      from: 'picus@gmail.com',
      to: user.email,
      subject: 'Your password reset',
      html: makeANiceEmail(`Your  Password Reset Token is here!
      \n\n 
      <a href="${process.env.FRONTEND_URL}/reset?resetToken=${resetToken}">
      Click Here to reset</a> `),
    });
    return { message: 'Thanks' };
  },
  async resetPassword(parents, args, ctx) {
    // checkar pwbb
    if (args.password !== args.confirmPassword) {
      throw new Error('Passwords don t match!');
    }
    // check legit token
    // check if expired
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 3600000,
      },
    });
    if (!user) {
      throw new Error('This token is either invalid or expired!');
    }
    // hash new pw
    const password = await bcrypt.hash(args.password, 10);
    // save the new pw remove old token
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    // generate jwt
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    // set jwt cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      magAge: 1000 * 25 * 365 * 60 * 60,
    });
    // return new user
    return updatedUser;
  },
  async saveCourse(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }
    const data = {
      ...args,
    };
    console.table(args);
    const existingCourse = await ctx.db.query.course({
      where: {
        id: args.id,
      },
    });

    // elimina o id dos updates
    delete data.category;
    // 4. If its not, create a fresh CourseVideo for that Course!
    if (existingCourse) {
      const updates = {
        ...args,
      };
      // elimina o id dos updates
      delete updates.id;
      // da run no update method
      return ctx.db.mutation.updateCourse(
        {
          data: updates,
          where: {
            id: args.id,
          },
        },
        info
      );
    }
    return ctx.db.mutation.createCourse(
      {
        data: {
          category: {
            connect: {
              id: args.category,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
          ...data,
        },
      },
      info
    );
  },

  async deleteCourse(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }

    // // 1.encontrar o curso
    // const course = await ctx.db.query.course(
    //   {
    //     where:{
    //       id: args.id
    //     }
    //   },
    //   '{id}'
    // );

    // // 2.checkar se tem permissoes para o apagar
    // const ownsCourse = course.user.id === ctx.request.userId;
    // // falta verificar se é admin ou user (hasPermissions)
    // if (!ownsCourse) {
    //   throw new Error("You don't have permission to do that!");
    // }

    // delete relations
    await ctx.db.mutation.deleteManyWishlists({
      where: {
        course: {
          id: args.id,
        },
      },
    });

    await ctx.db.mutation.deleteManyCourseInterests({
      where: {
        course: {
          id: args.id,
        },
      },
    });
    await ctx.db.mutation.deleteManyCourseVideoses({
      where: {
        course: {
          id: args.id,
        },
      },
    });
    await ctx.db.mutation.deleteManyRateCourses({
      where: {
        course: {
          id: args.id,
        },
      },
    });

    await ctx.db.mutation.deleteManyUserCourses({
      where: {
        course: {
          id: args.id,
        },
      },
    });

    // 3.dar delete
    return ctx.db.mutation.deleteCourse(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  updateCourse(parent, args, ctx, info) {
    // faz uma copia dos updates
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }

    

    const updates = {
      ...args,
    };

    // elimina o id dos updates
    delete updates.id;
    delete updates.category;
    // da run no update method
      return ctx.db.mutation.updateCourse(
      {
        data: {
        category: {
          update: 
          { category: args.category }
          
        },
        ...updates
        },
          where: {
           id: args.id,
                },
      },
       info
     );
    },

  async createRateCourse(parent, args, ctx, info) {
    const { userId } = ctx.request;

    //  Check if they are logged in
    if (!userId) {
      throw new Error('You must be logged in to do that!');
    }

    const rateCourse = await ctx.db.mutation.createRateCourse(
      {
        data: {
          user: {
            connect: {
              id: userId,
            },
          },
          course: {
            connect: {
              id: args.courseId,
            },
          },
          comment: args.comment,
          rate: args.rating,
        },
      },

      info
    );

    updateRate(ctx, args.courseId, args.rating, 0);

    return rateCourse;
  },
  async deleteRateCourse(parent, args, ctx, info) {
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const where = {
      id: args.id,
    };
    // 1.encontrar o video
    const rateCourse = await ctx.db.query.rateCourse(
      {
        where,
      },
      `{id 
        rate
         user{
           id
          } 
         course{
           id
          }
        }`
    );
    // 2.checkar se tem permissoes para o apagar
    const ownsRateCourse = rateCourse.user.id === ctx.request.userId;

    if (!ownsRateCourse) {
      throw new Error("You don't have permission to do that!");
    }

    // ctx,courseId, newRate,oldRate
    updateRate(ctx, rateCourse.course.id, null, rateCourse.rate);
    // 3.dar delete
    return ctx.db.mutation.deleteRateCourse(
      {
        where,
      },
      info
    );
  },
  async updateRateCourse(parent, args, ctx, info) {
    // faz uma copia dos updates
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in');
    }
    const updates = {
      ...args,
    };

    // elimina o id dos updates
    delete updates.id;

    // get the courseId to update the rate
    const courseId = await ctx.db.query.rateCourse(
      {
        where: { id: args.id },
      },
      `{
        rate
        course{
        id
      }}`
    );

    updateRate(ctx, courseId.course.id, args.rate, courseId.rate);

    // da run no update method
    return ctx.db.mutation.updateRateCourse(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async removeFromCourse(parent, args, ctx, info) {
    // Make sure they are signin
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }

    // query the users current cart
    const [existingVideo] = await ctx.db.query.courseVideoses({
      where: {
        course: { id: args.courseId },
        video: { id: args.id },
      },
    });
    // check if that item is already in their cart
    if (existingVideo) {
      console.log('Already added');
      return ctx.db.mutation.deleteCourseVideos(
        {
          where: { id: existingVideo.id },
        },
        info
      );
    }
    throw new Error('Video already removed');
  },
  async addTargetCourse(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }

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
      info
    );
  },
  async addTargetUser(parent, args, ctx, info) {
    // 1. Make sure they are signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in ');
    }

    // 4. If its not, create a fresh CartItem for that user!
    return ctx.db.mutation.createUserInterest(
      {
        data: {
          interest: {
            connect: { id: args.interestId },
          },
          user: {
            connect: { id: userId },
          },
        },
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    // Make sure they are signin
    const { userId } = ctx.request;
    // Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        course: { id: args.id },
      },
    });

    // Check if that item is already in their cart and increment by 1 id it is
    if (existingCartItem) {
      throw new Error('Arleady added to cart');
    }
    // If its not, create a fresh new item
    return ctx.db.mutation.createCartItem({
      data: {
        course: {
          connect: {
            id: args.id,
          },
        },
        user: {
          connect: { id: userId },
        },
      },
      info,
    });
  },
  async removeFromCart(parent, args, ctx, info) {
    // find cartItem
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      '{id,user{id}}'
    );
    // Make sure we found an item
    if (!cartItem) throw new Error('No Item found');

    // Make sure they own the cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error('Cheatin huhh');
    }

    // Delete cartItem
    return ctx.db.mutation.deleteCartItem(
      {
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async removeTargetUser(parent, args, ctx, info) {
    // Make sure they are signin
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in soooon');
    }

    return ctx.db.mutation.deleteUserInterest(
      {
        where: { id: args.interestId },
      },
      info
    );
  },
  async createOrder(parent, args, ctx) {
    // query current user and make sure they are signin
    const { userId } = ctx.request;
    if (!userId)
      throw new Error('You must be signed in to complete this order.');
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `
        {
          id
          name
          email
          cart{
            id
            course{
              title
              price
              id
              description
              thumbnail
              category{
                id
              }
            }
          }
        }
        `
    );
    // recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.course.price,
      0
    );

    // create the stripe charge(turn token into €€€€€€)
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'EUR',
      source: args.token,
    });
    // convert the cartitems in orderitems
    const orderItems = user.cart.map(cartItem => {
      const orderItem = {
        ...cartItem.course,
        category: { connect: { id: cartItem.course.category.id } },
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });

    // create the order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });

    const courseIds = user.cart.map(cartItem => cartItem.course.id);

    courseIds.forEach(async id => {
      await ctx.db.mutation.createUserCourse({
        data: {
          course: { connect: { id } },
          user: { connect: { id: userId } },
        },
      });
    });
    // clean up - clear the users cart, delete cartitems
    const cartItemIds = user.cart.map(cartItem => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: { id_in: cartItemIds },
    });
    // return the Order to the client
    return order;
  },

  async addToWish(parent, args, ctx, info) {
    // Make sure they are signin
    const { userId } = ctx.request;
    // Query the users current cart
    const [existingWhishItem] = await ctx.db.query.wishlists({
      where: {
        user: { id: userId },
        course: { id: args.id },
      },
    });

    // Check if that item is already in their cart and increment by 1 id it is
    if (existingWhishItem) {
      return ctx.db.mutation.deleteWishlist(
        {
          where: { id: existingWhishItem.id },
        },
        info
      );
    }
    // If its not, create a fresh new item
    return ctx.db.mutation.createWishlist({
      data: {
        course: {
          connect: {
            id: args.id,
          },
        },
        user: {
          connect: { id: userId },
        },
      },
      info,
    });
  },
  buyCourseFree(parent, args, ctx) {
    const { userId } = ctx.request;

    if (!userId)
      throw new Error('You must be signed in to complete this order.');

    return ctx.db.mutation.createUserCourse({
      data: {
        course: { connect: { id: args.id } },
        user: { connect: { id: userId } },
      },
    });
  },
  // async removeFromWish(parent, args, ctx, info) {
  //   //Make sure they are signin
  //   const { userId } = ctx.request;
  //   if (!userId) {
  //     throw new Error("You must be signed in soooon");
  //   }
  //   const [existingWhishItem] = await ctx.db.query.wishlists({
  //     where: {
  //       user: { id: userId },
  //       course: { id: args.id },
  //     },
  //   });
  //   if (existingWhishItem) {
  //     console.log("remove");
  //     return ctx.db.mutation.deleteWishlist(
  //       {
  //         where: { id: existingWhishItem.id },
  //       },
  //       info,
  //     );
  //   }
  // },
};

module.exports = Mutations;
