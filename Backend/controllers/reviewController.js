const planModel = require('../models/planModel');
const reviewModel = require('../models/reviewModel')
async function getAllReviews(req, res){
    try{
        let reviews = await reviewModel.find();
        if(reviews){
            res.json({
                message: 'All reviews fetched successfully',
                data : reviews
            })
        }
        else{
            res.json({
                message:"No review to display"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}
async function top3Reviews(req, res){
    try{
        let reviews = await reviewModel.find().sort({rating: -1}).limit(3);
        if(reviews){
            res.json({
                message: 'Top 3 reviews fetched successfully',
                data : reviews
            })
        }
        else{
            res.json({
                message:"No review to display"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}
//We have plan id in url
//in this method we are fetching all reviews and as review contain plan id we are comparing them and fetching if matched
async function getPlanReviews(req, res){
    try{
        let planId = req.params.id //getting the id of plan
        let reviews = await reviewModel.find()  //getting all reviews
        reviews = reviews.filter(review=> review.plan._id == planId)
        if(reviews){
            res.json({
                message: 'Review fetched successfully',
                data : reviews
            })
        }
        else{
            res.json({
                message:"Review not found"
            })
        }
    }
    catch(err){
        res.json({
            error: err.message
        })
    }
}

async function createReview(req, res){
    try{
        let id = req.params.plan;  //we are getting plan id from req body ans since we are already logged in to access the plan we would always have userid in cookies
        let plan = await planModel.findById(id)
        let review = await reviewModel.create(req.body)
        plan.ratingsAverage = ((plan.ratingsAverage) +req.body.rating)/2  //To-do create a noofreviews in plan which is used to calculate average rating //this is dummy part
        await plan.save();
        res.json({
            message: "review created successfully",
            data: review
        })
    }
    catch(err){
        res.json({
            error: err.message
        })
    }

}
async function updateReview(req, res){
    try{
    let planid = req.params.id;
    let id = req.body.id
    let review = await reviewModel.findById(id);
    let datatobeupdated = req.body
    if(review){ 
        const keys = [];
        for(let key in datatobeupdated){
            if(key == 'id') continue;
            keys.push(key)
        }
        for(let i = 0;i<keys.length;i++){
            review[keys[i]] = datatobeupdated[keys[i]]
        }
        const updatedPlan = await review.save();
        res.json({
            message:"Plan updated successfully",
            data: updatedPlan
        })

    }else{
        res.json({
            message:"No review found"
        })
    }
}catch(err){
    res.json({
        error: err.message
    })
}
}

async function deleteReview(req, res){
    try{
        let planid = req.params.id;
        let id = req.body.id
        // let plan = await planModel.findById(id)
        let review = await reviewModel.findByIdAndDelete(id)
        // plan.ratingsAverage = ((plan.ratingsAverage) +req.body.rating)/2  //calculate average rating //this is dummy part
        // await plan.save();
        res.json({
            message: "review deleted successfully",
            data: review
        })
    }
    
    catch(err){
        res.json({
            error: err.message
        })
    }

}

module.exports = {
    getAllReviews,
    top3Reviews,
    getPlanReviews,
    createReview,
    updateReview,
    deleteReview
}