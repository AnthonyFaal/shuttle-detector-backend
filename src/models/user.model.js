const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});


userSchema.virtual('id').get(function() {
  return this._id.toHexString();
});


userSchema.set('toJSON', {
  getters: true,
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id; 
    delete ret.__v; 
    return ret;
  },
});

module.exports = mongoose.model('User', userSchema);
