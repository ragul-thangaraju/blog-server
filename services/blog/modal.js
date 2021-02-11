const Entity = require("../../entity/index").Models;
const { config } = require("../../config/config");
const Jwt = require("jwt-simple");
var ObjectId = require("mongodb").ObjectId;

/**
 * Method to check username exist or not
 * @param {string} params
 */
const isUsernameAlreadyPresent = async (params) => {
  return Entity.Users.findOne({
    username: params.username,
    profile_type_name: "USER",
  })
    .then((response) => {
      if (!response) {
        return false;
      }
      return true;
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to register a new user
 * @param {string} params
 */
const userRegister = async (params) => {
  let usernameAlreadyPresent = await isUsernameAlreadyPresent(params);
  if (usernameAlreadyPresent) {
    return new Error("Username already used");
  }
  const insertData = {
    username: params.username,
    password: Jwt.encode(params.password, config.secret),
    profile_type_name: "USER",
  };
  return Entity.Users.create(insertData)
    .then(async (resp) => {
      const token = Jwt.encode(resp._id, config.secret);

      return (data = {
        userData: {
          _id: resp._id,
          username: resp.username,
          type: resp.profile_type_name,
        },
        token,
      });
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to login user
 * @param {string} params
 */
const userLogin = async (params) => {
  return Entity.Users.findOne({
    username: params.username,
    profile_type_name: "USER",
  })
    .then(async (resp) => {
      if (!resp) {
        return new Error("No username found");
      }
      if (
        Jwt.decode(resp.password, config.secret).toString() ===
        params.password.toString()
      ) {
        const token = Jwt.encode(resp._id, config.secret);

        return (data = {
          userData: {
            _id: resp._id,
            username: resp.username,
            type: resp.profile_type_name,
          },
          token,
        });
      } else {
        return new Error("Wrong password");
      }
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to login user
 * @param {string} params
 */
const adminLogin = async (params) => {
  return Entity.Users.findOne({
    username: params.username,
    profile_type_name: "ADMIN",
  })
    .then(async (resp) => {
      if (!resp) {
        return new Error("No username found");
      }
      if (
        Jwt.decode(resp.password, config.secret).toString() ===
        params.password.toString()
      ) {
        const token = Jwt.encode(resp._id, config.secret);

        return (data = {
          userData: {
            _id: resp._id,
            username: resp.username,
            type: resp.profile_type_name,
          },
          token,
        });
      } else {
        return new Error("Wrong password");
      }
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to get all users
 */
const getUsers = async () => {
  return Entity.Users.find({ profile_type_name: "USER" })
    .then(async (resp) => {
      if (!resp) {
        return "No user found";
      }
      return resp;
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to validate a user
 */
const getValidUser = async (token) => {
  return Entity.Users.findOne({
    _id: ObjectId(Jwt.decode(token, config.secret)),
  })
    .then(async (resp) => {
      if (!resp) {
        return false;
      }
      return resp;
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to get all blog post
 */
const getBlogs = async () => {
  return Entity.Posts.find({})
    .sort({ _id: -1 })
    .then(async (resp) => {
      if (!resp) {
        return "No user found";
      }
      return resp;
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to delete a user
 */
const userDelete = async (params) => {
  return Entity.Users.findByIdAndDelete({ _id: params.userId })
    .then(async (response) => {
      if (!response) {
        return false;
      }
      await Entity.Post_comments.deleteMany({ createdBy: params.userId });
      return await getUsers();
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to add new post
 * @param {string} params
 */
const postAdd = async (params) => {
  return Entity.Posts.create({
    title: params.title,
    image: params.image,
    description: params.description,
    createdAt: new Date(),
  })
    .then(async (resp) => {
      return await getBlogs();
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to delete a post
 * @param {string} params
 */
const postDelete = async (params) => {
  return Entity.Posts.findByIdAndDelete({ _id: params.postId })
    .then(async (response) => {
      if (!response) {
        return new Error("No post found..");
      }
      await Entity.Post_comments.deleteMany({ postId: params.postId });
      return await getBlogs();
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to get post details with active comments
 * @param {string} params
 */
const postDetails = async (params) => {
  return Entity.Posts.aggregate([
    {
      $match: {
        $and: [{ _id: ObjectId(params.postId) }],
      },
    },
    {
      $addFields: {
        post_id: { $toString: "$_id" },
      },
    },
    {
      $lookup: {
        from: "post_comments",
        localField: "post_id",
        foreignField: "postId",
        as: "commentDetails",
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        image: 1,
        description: 1,
        createdAt: 1,
        commentDetails: {
          $filter: {
            input: "$commentDetails",
            as: "commentDetail",
            cond: {
              $and: [
                {
                  $eq: ["$$commentDetail.status", "ACTIVE"],
                },
              ],
            },
          },
        },
      },
    },
  ])
    .then((response) => {
      if (!response) {
        return new Error("no such blog found");
      }
      return response[0];
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to add new comment for the post
 * @param {string} params
 */
const addPostComment = async (user, params) => {
  await Entity.Users.findById({ _id: ObjectId(user) }).then((userResp) => {
    return Entity.Post_comments.create({
      createdBy: user,
      name: userResp.username,
      comment: params.comment,
      postId: params.postId,
      createdAt: new Date(),
      status: "INACTIVE",
    })
      .then((resp) => {
        return true;
      })
      .catch((err) => {
        return new Error(err);
      });
  });
};

/**
 * Method to approve comment
 * @param {string} params
 */
const commentApprove = async (params) => {
  return Entity.Post_comments.updateOne(
    { _id: params.commentId },
    { $set: { status: "ACTIVE" } }
  )
    .then(async (response) => {
      if (!response) {
        return false;
      }
      return await getLatestcomments();
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to reject comment
 * @param {string} params
 */
const commentReject = async (params) => {
  return Entity.Post_comments.updateOne(
    { _id: params.commentId },
    { $set: { status: "REJECTED" } }
  )
    .then(async (response) => {
      if (!response) {
        return false;
      }
      return await getLatestcomments();
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to get all inactive comments
 */
const getLatestcomments = async () => {
  return Entity.Post_comments.aggregate([
    {
      $match: {
        $and: [{ status: "INACTIVE" }],
      },
    },
    {
      $addFields: {
        post_id: { $toObjectId: "$postId" },
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "post_id",
        foreignField: "_id",
        as: "postDetails",
      },
    },
    {
      $unwind: "$postDetails",
    },
  ])
    .sort({ _id: -1 })
    .then((response) => {
      if (!response) {
        return new Error("no new comments found");
      }
      return response;
    })
    .catch((err) => {
      return new Error(err);
    });
};

/**
 * Method to update post data
 * @param {string} params
 */
const editPost = async (params) => {
  let setCondition = {};
  if (params.image) {
    setCondition = {
      $set: {
        title: params.title,
        description: params.description,
        image: params.image,
      },
    };
  } else {
    setCondition = {
      $set: { title: params.title, description: params.description },
    };
  }

  return Entity.Posts.updateOne({ _id: params.postId }, setCondition)
    .then(async (response) => {
      if (!response) {
        return false;
      }
      return await getBlogs();
    })
    .catch((err) => {
      return new Error(err);
    });
};

module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  adminLogin: adminLogin,
  getUsers: getUsers,
  getValidUser: getValidUser,
  getBlogs: getBlogs,
  userDelete: userDelete,
  postAdd: postAdd,
  postDelete: postDelete,
  postDetails: postDetails,
  addPostComment: addPostComment,
  commentReject: commentReject,
  commentApprove: commentApprove,
  getLatestcomments: getLatestcomments,
  editPost: editPost,
};
