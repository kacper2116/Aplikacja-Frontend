import { loginFailure, loginStart, loginSuccess, logoutUser } from "./userRedux"
import { clearCart } from "./cartRedux"
import { resetGuestInfo } from "./guestRedux"
import axios from "axios"
import { Navigate, useNavigate } from "react-router-dom"

export const login = async (dispatch, user) => {

    const baseURL = process.env.REACT_APP_BASE_URL
    dispatch(loginStart())

    try {
        const response = await axios.post(`http://localhost:5000/api/auth/login`, user)
        const token = response.data.token

        dispatch(loginSuccess(token))
        dispatch(resetGuestInfo())
    } catch (error) {
       
        if (error.response) {
            const errorMessage = error.response.data.message     
            console.log(errorMessage)
               
            dispatch(loginFailure(errorMessage))

        }else if(error.request){
            dispatch(loginFailure('Błąd po stronie serwera'));
        }else{
            dispatch(loginFailure('Wystąpił nieznany błąd'));
        }

    }

}



export const logout = () => async (dispatch) => {
 
  
    dispatch(logoutUser());
    dispatch(clearCart());
  
  

};
