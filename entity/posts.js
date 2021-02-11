"use strict";

module.exports = {
  schema: {
    title: { type: String },
    image: { type: String },
    description: { type: String },
    createdAt: { type: Date },
    updatedAt: { type: Date },
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
