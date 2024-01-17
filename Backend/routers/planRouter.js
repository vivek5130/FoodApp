//getplan getallplan update delete gettop3planAccordingtorating
const express = require("express");
const { protectRoute, isAuthorised } = require("../controllers/authController");
const planRouter = express.Router();
const {
    getAllPlans, getPlan, createPlan, updatePlan, deletePlan, top3plans

} = require('../controllers/planController')

// all Plans
planRouter.route('/allPlans')
    .get(getAllPlans)

//own plan  ->  LoggedIn necessary
planRouter.use(protectRoute)  //middleware
planRouter.route('/plan/:id')
    .get(getPlan)

//owner and admin can only change the plans
planRouter.use(isAuthorised(['admin', 'restaurantowner']))  //middleware
planRouter.route('/crudPlan')
    .post(createPlan)
planRouter.route('/crudPlan/:id')
    .patch(updatePlan)
    .delete(deletePlan)

planRouter.route('/top3')
    .get(top3plans)

module.exports = planRouter