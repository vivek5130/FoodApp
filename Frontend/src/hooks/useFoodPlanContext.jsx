// import { WorkoutsContext } from "../context/WorkoutContext";
// import { useContext } from "react";

// export const useWorkoutsContext=()=>{
//     const context = useContext(WorkoutsContext)
//     if(!context)
//     {
//         throw Error("useWorkoutContext must be used inside workoutContextProvider")
//     }
//     return context

// }
import React from 'react'
import { useContext } from 'react'
import { FoodPlanContext } from '../context/FoodPlanContext'
const useFoodPlanContext = () => {
  
  
      const context = useContext(FoodPlanContext)
      if(!context){
        throw Error("useFoodPlanContext must be inside foodPlanContextProvider")
      }
      return context
  
  
}

export default useFoodPlanContext
