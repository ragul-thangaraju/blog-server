"use strict";

module.exports = {
  schema: {
    postId: { type: String },
    comment: { type: String },
    name: { type: String },
    createdBy: { type: String },
    createdAt: { type: Date },
    status: { type: String, default: "INACTIVE" },
  },
  statics: {},
  onSchema: {
    pre: {
      save: [],
      findOneAndUpdate: [
        function () {
          this.update(
            {},
            {
              $set: {
                updatedAt: new Date(),
              },
            }
          );
        },
      ],
    },
    post: {},
  },
};
