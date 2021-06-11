const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
  },
  authenticationProvider: {
    type: String,
    required: true,
    default: "custom",
  },
  googleId: {
    type: String,
  },
  phone: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  university: {
    type: String,
    required: false,
  },
  branch: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
  },
  resetPasswordToken: {
    type: String,
    required: false,
  },
  registeredAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  let user = this;
  if (user.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      next();
    } catch (err) {
      console.log(err);
    }
  }
});

UserSchema.methods.comparePassword = async function (password, done) {
  try {
    const isMatch = await bcrypt.compare(password, this.password);
    done(null, isMatch);
  } catch (err) {
    console.log(err);
    done(err, false);
  }
};

async function test() {
  const user = new User({
    name: "Pratik",
    email: "test@test.com",
    phone: "9122222267",
    category: "student",
    university: "student",
    password: "pratik1234",
  });
  console.log("user", user);
  await user.save();
  user.comparePassword("pratik1234", (err, isMatch) => console.log(isMatch));
}

module.exports = User = mongoose.model("User", UserSchema);
