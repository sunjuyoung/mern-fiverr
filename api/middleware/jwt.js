import jwt from "jsonwebtoken";
import createError from "../utils/createError";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.accessToken;
  if (!token) return next(createError(401, "not authenticated"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if (err) return res.status(403).send("token is not valid");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
