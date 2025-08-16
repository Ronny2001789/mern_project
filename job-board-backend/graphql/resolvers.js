const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Job = require("../models/Job");

module.exports = {
  // QUERIES
  getJobs: async () => {
    return await Job.find().populate("postedBy");
  },

  // MUTATIONS
  register: async ({ name, email, password, role }) => {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("User already exists");

    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPw, role });
    await user.save();

    return "Registration successful";
  },

  login: async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return { userId: user._id.toString(), token };
  },

 createJob: async ({ title, description }, req) => {
  if (!req.isAuth) throw new Error("Not authenticated");

  const job = new Job({
    title,
    description,
    postedBy: req.userId,
  });
// THIS saves it to the database
  const savedJob = await job.save(); 

  // ✅ This runs on the BACKEND
  await savedJob.populate("postedBy");

  return savedJob;
}

}