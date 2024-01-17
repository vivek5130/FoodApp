const express = require('express')
const reviewRouter = express.Router()
const { protectRoute, isAuthorised } = require("../controllers/authController");
const {
    getAllReviews,
    top3Reviews,
    getPlanReviews,
    createReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController')

reviewRouter.route('/all')
    .get(getAllReviews)
reviewRouter.route('/top3') 
    .get(top3Reviews)
reviewRouter.route('/:id')  //planId is provided here
    .get(getPlanReviews)

// reviewRouter.use(protectRoute)  //changed please enable later
reviewRouter.route('/crud/:plan')  //planId is provided here
    .post(createReview)
    .patch(updateReview)   //from req.body.id we will provide id of review ie from frontend
    .delete(deleteReview)  //from req.body.id we will provide id of review ie from frontend

module.exports = reviewRouter
