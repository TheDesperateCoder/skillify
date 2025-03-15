const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    unique: true, // Enforce unique usernames
  },
  lastName: {
    type: String,
    required: true,
    unique: true, // Enforce unique usernames
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Enforce unique emails
  },
  resume: {
    type: String, // Store resume content as text
    default: null, // Allow users to have no resume initially
  },
  questions: [{ // Array of questions
    type: String,
  }],
  accountType : {
  type : String,
  Enum:["Candidate" , "Recruiter"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});



const User = mongoose.model('User', userSchema);

module.exports = User;