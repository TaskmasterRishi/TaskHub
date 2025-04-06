const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    console.log("Fetching profile for user ID:", req.user.id);
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ status: false, msg: "User not found" });
    }
    console.log("Found user:", user);
    res.status(200).json({ 
      status: true, 
      user: {
        _id: user._id,
        name: user.name || user.email,
        email: user.email
      }
    });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}