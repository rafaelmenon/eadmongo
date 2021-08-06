const mongoose = require("mongoose");
const Users = mongoose.model("Users");

exports.getUsers = async () => {
  const response = await Users.find({}, "name username admin");
  return response;
};

exports.getUser = async (id) => {
  const response = await Users.findOne({ _id: id }, "name username admin");
  return response;
};

exports.createUser = async (data) => {
  const user = new Users(data);
  await user.save();
};

exports.updateUser = async (id, data) => {
  await Users.findByIdAndUpdate(id, {
    $set: data,
  });
};

exports.deleteUSer = async (id) => {
  await Users.findByIdAndDelete(id);
};
