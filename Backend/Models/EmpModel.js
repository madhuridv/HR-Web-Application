const { Double } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var empSchema = new Schema(
  {
    Eid: { type: String, required: false },
    Esal: { type: String, required: false },
    Efname: { type: String, required: false },
    Elname: { type: String, required: false },
    deduction401k: { type: Number },
    healthInsurance: { type: Number },
    TotalTax: { type: Number },
    PaidAmt: { type: Number },

  },
  {
    versionKey: false,
  }
);

const empModel = mongoose.model("employees", empSchema);
module.exports = empModel;
