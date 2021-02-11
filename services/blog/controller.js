const blogModal = require("./modal");
const Util = require("../util/util");

const userRegister = async (request, h) => {
  const params = request.payload;
  const created = await blogModal.userRegister(params);

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const userLogin = async (request, h) => {
  const params = request.payload;
  const created = await blogModal.userLogin(params);

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const adminLogin = async (request, h) => {
  const params = request.payload;
  const created = await blogModal.adminLogin(params);

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const getUsers = async (request, h) => {
  const created = await blogModal.getUsers();

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const getBlogs = async (request, h) => {
  const created = await blogModal.getBlogs();

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const userDelete = async (request, h) => {
  const params = request.query;

  const resp = await blogModal.userDelete(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const postAdd = async (request, h) => {
  const params = request.payload;
  const created = await blogModal.postAdd(params);

  if (created instanceof Error) {
    return Util.response(h, 2, created.message, 200);
  }
  return Util.response(h, 0, created, 200);
};

const postDelete = async (request, h) => {
  const params = request.query;

  const resp = await blogModal.postDelete(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const postDetails = async (request, h) => {
  const params = request.payload;

  const resp = await blogModal.postDetails(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const addPostComment = async (request, h) => {
  const params = request.payload;
  const user = request.auth.credentials.token._id;

  const resp = await blogModal.addPostComment(user, params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const commentApprove = async (request, h) => {
  const params = request.payload;

  const resp = await blogModal.commentApprove(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const commentReject = async (request, h) => {
  const params = request.payload;

  const resp = await blogModal.commentReject(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const getLatestcomments = async (request, h) => {
  const resp = await blogModal.getLatestcomments();
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

const editPost = async (request, h) => {
  const params = request.payload;

  const resp = await blogModal.editPost(params);
  if (resp instanceof Error) {
    return Util.response(h, 2, resp.message, 400);
  }
  return Util.response(h, 0, resp, 200);
};

module.exports = {
  userRegister: userRegister,
  userLogin: userLogin,
  adminLogin: adminLogin,
  getBlogs: getBlogs,
  getUsers: getUsers,
  userDelete: userDelete,
  postAdd: postAdd,
  postDelete: postDelete,
  postDetails: postDetails,
  addPostComment: addPostComment,
  commentApprove: commentApprove,
  commentReject: commentReject,
  getLatestcomments: getLatestcomments,
  editPost: editPost,
};
