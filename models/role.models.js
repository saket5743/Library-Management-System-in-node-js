const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  permissions: [{
    type: String,
    required: true,
    lowercase: true,
    trim: true
  }]
});

const Roles = mongoose.model("Role", roleSchema);
module.exports = Roles;