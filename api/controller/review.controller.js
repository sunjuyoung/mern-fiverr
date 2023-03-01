import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  const newReview = new Review({
    gigId: req.body.gigId,
    userId: req.userId,
    star: req.body.star,
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

    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });

    res.status(201).send(saveReview);
  } catch (error) {
    next(createError(error));
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.id });
    res.status(200).send(reviews);
  } catch (error) {
    next(createError(error));
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (req.uesrId !== review.userId)
      return next(createError(403, "you have already created review"));
  } catch (error) {
    next(createError(error));
  }
};
