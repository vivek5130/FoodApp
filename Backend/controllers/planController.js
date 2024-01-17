const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

async function getAllPlans(req, res) {
  try {
    let plans = await planModel.find();
    if (plans) {
      return res.json({
        message: "All plans retreived",
        data: plans,
      });
    } else {
      return res.json({
        messsage: "Plans not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function getPlan(req, res) {
  try {
    let id = req.params.id;
    let plans = await planModel.findById(id);
    if (plans) {
      return res.json({
        message: "Plan retreived",
        data: plans,
      });
    } else {
      return res.json({
        messsage: "Plan not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async function createPlan(req, res) {
  try {
    let planData = req.body;
    let createdPlan = await planModel.create(planData);
    return res.json({
      message: "Plan created successfully",
      data: createdPlan,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}
async function deletePlan(req, res) {
  try {
    let id = req.params.id;
    let deletePlan = await planModel.findByIdAndDelete(id);
    return res.json({
      message: "Plan deleted successfully",
      data: deletePlan,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

async function updatePlan(req, res) {
  try {
    let id = req.params.id
    let datatobeupdated = req.body
    let plan = await planModel.findById(id)
    if(plan){
        const keys = [];
        for(let key in datatobeupdated){
            keys.push(key)
        }
        for(let i = 0;i<keys.length;i++){
            plan[keys[i]] = datatobeupdated[keys[i]]
        }
        const updatedPlan = await plan.save();
        res.json({
            message:"Plan updated successfully",
            data: updatedPlan
        })

    }
    else{
        res.json({
            message:"Plan not found"
        })
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
}

//Get top 3 plans
async function top3plans(req, res){
    try{
        const plans = await planModel.find().sort({
            ratingsAverage : -1 //to sort in descending order
        }).limit(3)
        return res.json({
            message:"Top 3 planes",
            data : plans
        })
    }
    catch (err) {
        res.status(500).json({
          error: err.message,
        });
      }
    

}

module.exports = {
    getAllPlans,
    getPlan,
    createPlan,
    updatePlan,
    deletePlan,
    top3plans

}