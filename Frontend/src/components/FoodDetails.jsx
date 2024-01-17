import { Link } from "react-router-dom"
import { FoodPlanContext } from "../context/FoodPlanContext"
import useFoodPlanContext from "../hooks/useFoodPlanContext"
const FoodDetails = ({ foodPlan }) => {
  const { dispatch } = useFoodPlanContext()

 

  return (
    <div className="foodplan-details">
      <h4><strong>{foodPlan.name}</strong></h4>
      <p><strong>Rs {foodPlan.price}</strong>/month</p>
      <span>___________</span>
      <p>30 meals every day</p>
      <p>20% off</p>
      <p>Hurry up</p>
      {/* <p><strong>Average Rating </strong>{foodPlan.ratingsAverage}</p> */}
      <Link to = { `/plans/${foodPlan.id}`}><button>Know more</button></Link>
      {/* <span className="material-symbols-outlined" onClick={handleClick}>delete</span> */}
    </div>
  )
}
export default FoodDetails