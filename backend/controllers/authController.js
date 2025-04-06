const user = await User.findOne({ email }).select('+password');
if (!user) {
  return res.status(400).json({ status: false, msg: "Invalid email or password" });
}

const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXPIRE
});

res.status(200).json({
  status: true,
  token,
  user: {
    _id: user._id,
    username: user.username,
    email: user.email
  }
}); 