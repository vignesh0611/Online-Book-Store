import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router"
function Register(){
    let {register,handleSubmit, formState: { errors } } = useForm()
    let [userRegisterStatus,setUserRegisterStatus] = useState("")
    let [passwordMatch,setPasseordMatch] = useState("")
    let history = useHistory()
    // to register user on form submit
    const onRegisterFormSubmit = async(userObj) => {
        //console.log(userObj)
        userObj.role = "user"
        userObj.address = ""
        if(userObj.password === userObj.confirmpassword){
            delete userObj.confirmpassword
            let responseObj = await axios.post("/user/register",userObj)
            let payload = responseObj.data
            if(payload.message==="Success"){
                history.push("/login")
            }
            else{
                setUserRegisterStatus("*email already existed")
            }
        }
        else{
            setPasseordMatch("*password doesnot match")
        }
        
    }
    return(
        <div className="container-fluid">
            <div className="row mt-5 mb-5">
                <h1 className="text-center">REGISTER HERE</h1>
                <form className="col-11 col-sm-8 col-md-6 mx-auto shadow pt-3" onSubmit={handleSubmit(onRegisterFormSubmit)}>
                    {/* name */}
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="name" 
                            placeholder="Name" 
                            {...register("name",{required:true})}/>
                        <label for="name">Name</label>
                    </div>
                    {errors.name?.type==='required' && <p className="alert alert-danger">Name is required</p>}
                    
                    {/* email */}
                    <div class="form-floating mb-3">
                        <input type="email" 
                            className="form-control" 
                            id="floatingemail" 
                            placeholder="asdf@gmail.com" 
                            {...register("email",{required:true})}/>
                        <label for="email">E-mail</label>
                    </div>
                    {errors.email?.type==='required' && <p className="alert alert-danger">email is required</p>}
                    <p className="text-danger">{userRegisterStatus}</p>

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

                    {/* confirm password */}
                    <div class="form-floating mb-3">
                        <input type="password" 
                            className="form-control" 
                            id="floatingconfirmpassword" 
                            placeholder="****" 
                            {...register("confirmpassword",{required:true})}/>
                        <label for="confirmpassword">Confirm Password</label>
                    </div>
                    {errors.confirmpassword?.type==='required' && <p className="alert alert-danger">password is required</p>}
                    <p className="text-danger">{passwordMatch}</p>
                    
                    {/* dob */}
                    <div class="form-floating mb-3">
                        <input type="date" 
                            className="form-control" 
                            id="dob" 
                            placeholder="dob" 
                            {...register("dob",{required:true})}/>
                        <label for="dob">DOB</label>
                    </div>
                    {errors.dob?.type==='required' && <p className="alert alert-danger">DOB is required</p>}
                    <div className="text-center mb-3">
                        <button className="btn btn-success">Submit</button>
                        <div className="text-danger" style={{cursor:"pointer"}} onClick={(()=>history.push("/login"))}>Already a User? Login</div>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Register