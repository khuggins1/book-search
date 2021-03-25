
const { AuthenticationError } = require('apollo-server-express');



const { signToken } = require('../utils/auth');

const { user, User } = require ('../models');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
       if (context.user) {
         const userData = await User.findOne ({ _id: context.user._id })
         .select('-_v -password')
         return userData;

       }
       
       throw new AuthenticationError('Youre not logged in dude!');

      }
    },

    Mutation: {
      addUser: async (parent, args) => {
        const user = await User.create(args);
        const token = signToken(user);

        return { token, user};
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne ({ email });
        if(!user) {
          throw new AuthenticationError('your credintials are not correct!');

        }
        const correctPw = await user.isCorrectPassword(password);
if (!correctPw) {
  throw new AuthenticationError('your credintials are not correct');

}

const token = signToken (user);
return { token, user};
      },
    saveBook: async (parent, { input }, { user}) => {
      if (user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: user._id},
          { $addToSet: { savedBooks: input }},
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError('Must be logged in');
    },
    removeBook: async (parent, { bookId }, {user}) => {
      if (user) {
        const updatedUser = await User.findOneAndUpdate (
          { _id: user._id},
          { $pull: { savedBooks: { bookId: bookId}}},
          { new: true, runValidators: true}
        );
        throw new AuthenticationError('Must be logged in');
      }
    }
    }
  };
  
  module.exports = resolvers;