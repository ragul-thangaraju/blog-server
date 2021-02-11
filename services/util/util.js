"use strict";

const response = (h, code, values, responseCode) => {
  if (code == 0) {
    var response = {
      code: code,
      status: "success",
      data: values,
    };
  } else if (code == 1) {
    var response = {
      code: code,
      status: "fail",
      message: values,
    };
  } else {
    var response = {
      code: code,
      status: "error",
      message: values,
    };
  }

  return h.response(response).code(responseCode).takeover();
};

module.exports = {
  response: response,
};
