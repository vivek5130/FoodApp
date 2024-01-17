import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useFoodPlanContext from "../hooks/useFoodPlanContext";
import FoodDetails from "../components/FoodDetails";
import Reviews from "../components/Reviews";
// store the deails in usestate as details are deleting on refreshing the page

const FoodPlan = () => {
  const { foodPlans } = useFoodPlanContext();
  let { id } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  let filteredFoodPlan = null;
  useEffect(() => {
    // Ensure that foodPlans and id are defined
    if (foodPlans && id) {
    filteredFoodPlan = foodPlans.filter((foodPlan) => foodPlan.id === id);
      console.log('filteredFoodPlan: ', filteredFoodPlan);
  
      // Use setFoodDetails to update the state
      setFoodDetails(filteredFoodPlan);
  
      // Now, you can see the updated value after the state has been set
      console.log('foodDetails: ', foodDetails);
    }
  }, [foodPlans, id]); 

  let foodPlanName = "";
  return (
    <div className="foodplan-page">
      <h2>Plan Details</h2>
      {foodDetails && foodDetails.map(foodDetail => (
                <div key={foodDetail.id} className='foodplan-container'>
                    {foodPlanName = foodDetail.name}
                <h1><strong>{foodDetail.name}</strong></h1>
                <p><strong>only at Rs. {foodDetail.price}</strong></p>
                <p><strong>Average Rating </strong>{foodDetail.ratingsAverage}</p> 
                <p>{foodDetail.discount }%off</p>
                <p>Live track your order | {foodDetail.duration !== undefined ? foodDetail.duration : '20-25min'}</p>
                </div>
            ))}
      {/* {filteredFoodPlan.map((foodPlan) => (
        <div key={foodPlan.id} className="foodplan-container">
          {(foodPlanName = foodPlan.name)}
          <h1>
            <strong>{foodPlan.name}</strong>
          </h1>
          <p>
            <strong>only at Rs. {foodPlan.price}</strong>
          </p>
          <p>
            <strong>Average Rating </strong>
            {foodPlan.ratingsAverage}
          </p>
          <p>{foodPlan.discount}%off</p>
          <p>
            Live track your order |{" "}
            {foodPlan.duration !== undefined ? foodPlan.duration : "20-25min"}
          </p>
        </div>
      ))} */}
      <div>
        Place your order
        <Link to = "http://localhost:4000/booking/createSession"><button>buy now</button></Link>
      </div>
      <Reviews foodPlanName={foodPlanName} />
    </div>
  );
};

export default FoodPlan;
