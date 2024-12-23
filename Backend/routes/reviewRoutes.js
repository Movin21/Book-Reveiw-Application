const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const { STATUS_CODES, MESSAGES } = require("../constants/constants");

// @route GET /reviews
router.get("/", async (req, res) => {
  const reviews = await Review.find();
  res.status(STATUS_CODES.OK).json(reviews);
});

// @route POST /reviews
router.post("/", async (req, res) => {
  const { bookTitle, author, rating, reviewText } = req.body;
  const review = new Review({ bookTitle, author, rating, reviewText });

  try {
    const newReview = await review.save();
    res.status(STATUS_CODES.CREATED).json(newReview);
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.message });
  }
});

// @route PUT /reviews/:id
router.put("/:id", async (req, res) => {
  const { bookTitle, author, rating, reviewText } = req.body;

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { bookTitle, author, rating, reviewText },
      { new: true }
    );
    if (!updatedReview) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.REVIEW_NOT_FOUND });
    }
    res.status(STATUS_CODES.OK).json(updatedReview);
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: error.message });
  }
});

// @route DELETE /reviews/:id
router.delete("/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: MESSAGES.REVIEW_NOT_FOUND });
    }
    res.status(STATUS_CODES.OK).json({ message: MESSAGES.DELETE_SUCCESS });
  } catch (error) {
    res.status(STATUS_CODES.BAD_REQUEST).json({ message: MESSAGES.INVALID_ID });
  }
});

module.exports = router;
