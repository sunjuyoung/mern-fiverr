import Review from "../models/review.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res) => {
  const newReview = new Review({
    gigId: req.body.id,
    userId: req.userId,
    start: req.body.star,
    desc: req.body.desc,
  });
  try {
    const review = await Review.findOne({
      gigId: req.body.gigId,
      userId: req.userId,
    });
    if (review)
      return next(createError(403, "you have already created review"));
    const saveReview = await newReview.save();
    res.status(201).send(saveReview);
  } catch (error) {
    next(createError(error));
  }
};

export const getReviews = async (req, res) => {
  try {
  } catch (error) {
    next(createError(error));
  }
};

export const deleteReview = async (req, res) => {
  try {
  } catch (error) {
    next(createError(error));
  }
};
