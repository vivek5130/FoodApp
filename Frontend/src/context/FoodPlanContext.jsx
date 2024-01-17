import { createContext, useReducer } from "react";
export const FoodPlanContext  = createContext()
export const FoodPlanReducer = (state, action)=>{
    switch (action.type) {
        case 'SET_FOODPLAN':
          return { 
            foodPlans: action.payload 
          }
        case 'CREATEFOODPLAN':
          return { 
            foodPlans: [action.payload, ...state.foodPlans] 
          }
        case 'DELETEFOODPLAN':
          return { 
           ...state,
            foodPlans: state.foodPlans.filter(w => w._id !== action.payload) 
          }
        default:
          return state
      }
}
export const FoodPlanContextProvider = ({children})=>{
    const [state, dispatch] = useReducer(FoodPlanReducer,{foodPlans : null})
    return (
        <FoodPlanContext.Provider value = {{...state, dispatch}}>
            {children}

        </FoodPlanContext.Provider>
    )

}