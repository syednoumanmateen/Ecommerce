const mongoose =require("mongoose");

const patternTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
}, { timestamps: true });

const PatternType = mongoose.model("PatternType", patternTypeSchema);
module.exports = PatternType;
