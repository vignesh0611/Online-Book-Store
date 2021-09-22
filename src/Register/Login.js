import React, { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import {useSelector,useDispatch} from 'react-redux'
import { useHistory } from "react-router-dom"
import {userLogin} from '../store/userSlice'
import { encrypt } from '../AdditionalComponents/Encrypt'
function Login (){
        let {register,handleSubmit, formState: { errors } } = useForm()
        let {userObj,isSuccess,invalidLoginMessage}=useSelector(state=>state.user)
       // console.log("user:",userObj)
        let dispatch =useDispatch()
        let history = useHistory()
        let [loginState,setLoginStatus] = useState()
        let [userCredentialObj,setUserCredentialObj] = useState({
            email:'',
            password:''
        }) 
        function onLoginSubmit(userObj){
            //setUserCredentialObj({...userObj})
            //console.log("userbefore",userObj);
            userObj = encrypt(userObj)
            //console.log("userafter",userObj);
            dispatch(userLogin(userObj))
        }
        // to check user auth or not and checking the role
        useEffect(()=>{
            if (isSuccess && userObj.role === "user" ){
                history.push(`/`)
            }
            if (isSuccess && userObj.role === "admin" ){
                history.push(`/admindashboard/${userObj.name}`)
            }
        },[isSuccess])
    return(
        <div className="container-fluid row mt-5 mb-5">
            <h1 className="text-center font">LOGIN HERE</h1>
            {invalidLoginMessage && <p className="text-danger text-center">*{invalidLoginMessage}</p>}
            <form className="col-11 col-sm-8 col-md-6 mx-auto shadow pt-3" onSubmit={handleSubmit(onLoginSubmit)}>
                {/* email */}
                <div className="form-floating mb-3">
                    <input type="email" 
                        className="form-control" 
                        id="email" 
                        placeholder="email" 
                        {...register("email",{required:true})}/>
                    <label for="email">E-mail</label>
                </div>
                {errors.email?.type==='required' && <p className="alert alert-danger">Name is required</p>}
                {/* password */}
                <div class="form-floating mb-3">
                    <input type="password" 
                        className="form-control" 
                        id="floatingpassword" 
                        placeholder="****" 
                        {...register("password",{required:true})}/>
                    <label for="password">Password</label>
                </div>
                {errors.password?.type==='required' && <p className="alert alert-danger">password is required</p>}
                <div className="text-center mb-3">
                    <button className="btn btn-success" type="submit">Login</button>
                    <div className="text-danger" style={{cursor:"pointer"}} onClick={(()=>history.push("/signup"))}>New User? Signup</div>
                </div>
            </form>
        </div>
    )
}
export default Login