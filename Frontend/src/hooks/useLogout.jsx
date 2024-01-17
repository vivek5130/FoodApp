import { useAuthContext } from "./useAuthContext"
import useFoodPlanContext from "./useFoodPlanContext"
export const useLogout=()=>{
    const {dispatch} = useAuthContext()
    const {dispatch : foodPlanDispatch } = useFoodPlanContext()
    const logout = ()=>{
        //remove item from local storage
        localStorage.removeItem('user')

        //dispatch logout action
        dispatch({type: 'LOGOUT'})
        foodPlanDispatch({type: 'SET_FOODPLAN', payload : null})
    }
    return {logout}
}