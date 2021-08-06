const mogoose = require("mongoose");
const Schema = mogoose.Schema;

const churchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
    },
    number: {
      type: String,
      required: false,
    },
    city: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    domain: {
      type: String,
      required: true,
    },
    trial: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
    },
    updateAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Church", churchSchema);
