"use strict";
const blogCtrl = require("./controller");
const joi = require("joi");
const Util = require("../util/util");

module.exports = [
  {
    method: "GET",
    path: "/blog/check",
    handler: () => {
      return "Hello From blog server";
    },
    options: {},
  },
  {
    method: "POST",
    path: "/register",
    handler: blogCtrl.userRegister,
    options: {
      validate: {
        payload: joi.object({
          username: joi
            .string()
            .required()
            .error(new Error("username required")),
          password: joi
            .string()
            .required()
            .error(new Error("password required")),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/login",
    handler: blogCtrl.userLogin,
    options: {
      validate: {
        payload: joi.object({
          username: joi
            .string()
            .required()
            .error(new Error("username required")),
          password: joi
            .string()
            .required()
            .error(new Error("password required")),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/adminLogin",
    handler: blogCtrl.adminLogin,
    options: {
      validate: {
        payload: joi.object({
          username: joi
            .string()
            .required()
            .error(new Error("username required")),
          password: joi
            .string()
            .required()
            .error(new Error("password required")),
        }),
      },
    },
  },
  {
    method: "GET",
    path: "/getUsers",
    handler: blogCtrl.getUsers,
    options: {
      auth: "auth",
    },
  },
  {
    method: "GET",
    path: "/getPost",
    handler: blogCtrl.getBlogs,
  },
  {
    method: "DELETE",
    path: "/user/deleteUser",
    handler: blogCtrl.userDelete,
    options: {
      auth: "auth",
      validate: {
        query: joi.object({
          userId: joi.string().required().error(new Error("userId required")),
        }),
        failAction: (request, h, error) => {
          console.log(error);
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "POST",
    path: "/addPost",
    handler: blogCtrl.postAdd,
    options: {
      validate: {
        payload: joi.object({
          title: joi.string().required().error(new Error("title required")),
          image: joi.string().required().error(new Error("image required")),
          description: joi
            .string()
            .required()
            .error(new Error("description required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "DELETE",
    path: "/deletePost",
    handler: blogCtrl.postDelete,
    options: {
      auth: "auth",
      validate: {
        query: joi.object({
          postId: joi.string().required().error(new Error("postId required")),
        }),
        failAction: (request, h, error) => {
          console.log(error);
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "POST",
    path: "/getPostDetails",
    handler: blogCtrl.postDetails,
    options: {
      validate: {
        payload: joi.object({
          postId: joi.string().required().error(new Error("postId required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "POST",
    path: "/addPostComment",
    handler: blogCtrl.addPostComment,
    options: {
      auth: "auth",
      validate: {
        payload: joi.object({
          postId: joi.string().required().error(new Error("postId required")),
          comment: joi.string().required().error(new Error("comment required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/approveComment",
    handler: blogCtrl.commentApprove,
    options: {
      auth: "auth",
      validate: {
        payload: joi.object({
          commentId: joi
            .string()
            .required()
            .error(new Error("commentId required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "PUT",
    path: "/rejectComment",
    handler: blogCtrl.commentReject,
    options: {
      auth: "auth",
      validate: {
        payload: joi.object({
          commentId: joi
            .string()
            .required()
            .error(new Error("commentId required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
  {
    method: "GET",
    path: "/getLatestCommets",
    handler: blogCtrl.getLatestcomments,
    options: {
      auth: "auth",
    },
  },
  {
    method: "PUT",
    path: "/editPost",
    handler: blogCtrl.editPost,
    options: {
      auth: "auth",
      validate: {
        payload: joi.object({
          postId: joi
            .string()
            .required()
            .error(new Error("postId required")),
          title: joi
            .string()
            .required()
            .error(new Error("title required")),
          description: joi
            .string()
            .required()
            .error(new Error("description required")),
          image: joi
            .string()
            .optional()
            .error(new Error("image required")),
        }),
        failAction: (request, h, error) => {
          return Util.response(h, 1, error.output.payload.message, 400);
        },
      },
    },
  },
];
