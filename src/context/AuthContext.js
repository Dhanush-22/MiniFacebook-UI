import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user:JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};


export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(state.user))
  },[state.user])
  
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;















































// import {createContext, useReducer} from "react"
// import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//     user : null,
//     // user:{
//     //     _id : "633d6c58cd4d08dc29eb4f43",
//     //     username : "dhanush",
//     //     email : "dhanush123@gmail.com",
//     //     profilePicture : "",
//     //     coverPicture : "",
//     //     followers : [],
//     //     followings : ["633f0bc60f3fc4ef9f00b95f","633f157706836810f8c37eda","6354246e64809926b5899850"]
//     // },    
//     isFetching : false,
//     error:false
// };

// export const AuthContext = createContext(INITIAL_STATE)

// // Wrapper
// export const AuthContextProvider = ({children})=>{ // Here we use reducer
//     const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

//     return (
//         <AuthContext.Provider 
//             value = {{
//                 user: state.user,
//                 isFetching: state.isFetching, 
//                 error: state.error,
//                 dispatch
//                 }}
//         >
//         {children}
//         </AuthContext.Provider>
//     )
// }


// export default AuthContext;
