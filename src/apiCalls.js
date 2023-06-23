import axios from "axios";

export const loginCall = async (userCredential, dispatch) =>{
    dispatch({type:"LOGIN_START"});
    try{
        console.log("Waiting for login res");
        const res = await axios.post("auth/login", userCredential);
        console.log("Login res: ",res);
        dispatch({type:"LOGIN_SUCCESS",payload: res.data});
    }catch(err){
        dispatch({type:"LOGIN_FAILURE",payload: err});
    }
};

export const logOutCall = async (dispatch) =>{
    dispatch({type:"LOG_OUT"});
};