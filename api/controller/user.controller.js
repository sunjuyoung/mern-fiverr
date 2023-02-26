import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (payload.userId !== user._id.toString()) {
    return next(createError(403, "you can delete only your account"));
  }
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("deleted");
};
