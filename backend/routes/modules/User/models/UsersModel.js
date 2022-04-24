const { Schema, model } = require("mongoose");
const { MongoosePaginate } = require("mongoose-paginate-v2");

const UsersModelSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: false },
    profileImage: { type: String, required: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const UsersModel = model("users", UsersModelSchema);

module.exports = UsersModel;
