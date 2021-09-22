import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import AdminSideBar from "./AdminSideBar"
import DefaultImage from "../images/images.png"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { setEmail } from "../store/CartSlice"
import { updateUserData } from "../store/UserSlice"
import Loader from "../AdditionalComponents/Loader"
function AdminProfile(){
    let {userObj,isSuccess,isError,isLoading} = useSelector(state => state.user)
    let {cartemail} = useSelector(state => state.cart)
    let [saveSuccess,setSaveSuccess] = useState("")
    const [file,setFile] = useState(null)
    const dispatch = useDispatch() 
    const{register,handleSubmit} = useForm({
        defaultValues:{
            name:userObj.name,
            email:userObj.email,
            address:userObj.address,
            pincode:userObj.pincode,
            phno:userObj.phno
        }
    })
    useEffect(()=>{
        if(userObj.email !== cartemail){
            dispatch(setEmail(userObj.email))
        }
    },[userObj.email])
    function updateData(data){
        //console.log("data123",data)
        const formData = new FormData()
        if (file) {
            formData.append("profilePicture", file, file.name)
        }
        data._id = userObj._id
        data.cartemail = cartemail
        data = JSON.stringify(data)

        formData.append("user", data)

        dispatch(updateUserData(formData))
        //console.log("formData",formData)
        
        setSaveSuccess("*Changes Updated Successfully")
    }
    //console.log("is loading",isSuccess)
    const onFileSelect = (event) =>{
        setFile(event.target.files[0])
    }
    return(
        <div>
            {/* <div className="row">
                <div className="col-md-3">
                    <AdminSideBar/>
                </div>
                <div className="col-md-9"> */}
                    <h4>Hello {userObj.name} (Admin)</h4>
                    <h6 className="text-center">Edit Profile Here</h6>
                    <div className="text-center mt-4">
                            {
                                file
                                    ? <img src={URL.createObjectURL(file)} className="border border-dark rounded-circle" width="200px" alt="" />
                                    : userObj.profilePicture
                                        ?
                                        <img src={userObj.profilePicture} className="border border-dark rounded-circle" width="200px" alt="" />
                                        :
                                        <img src={DefaultImage} className="border border-dark rounded-circle" width="200px" alt="" />
                            }
                        </div>
                    <form className="mt-3 w-75 mx-auto" onSubmit={handleSubmit(updateData)}>
                        <div className="row justify-content-center">
                            <div className="text-center mb-3">
                                <label htmlFor="profilePicture" id="profilePictureLabel" className="text-danger cursor-pointer fw-bold">Change Profile Picture</label>
                                    <input
                                        type="file" className="d-none"
                                        accept="image/*" name="profilePicture"
                                        id="profilePicture" onChange={onFileSelect} />
                                </div>
                            </div>
                        <div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" name="name"
                            {...register("name",{required:true})} />
                            <label for="floatingInput">Name</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" name="email"
                            {...register("email",{required:true})} />
                            <label for="floatingInput">E-mail</label>
                            {/* {isError && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">{isError}</p>} */}
                            {/* <p className="text-danger">{isError}</p> */}
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" value={userObj.dob}
                             />
                            <label for="floatingInput">DOB</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" name="address"
                            {...register("address",{required:true})} />
                            <label for="floatingInput">Address</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" name="pincode"
                            {...register("pincode",{required:true})} />
                            <label for="floatingInput">Pincode</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control" id="floatingInput" placeholder="#" name="phno"
                            {...register("phno")} />
                            <label for="floatingInput">Mobile No (Optional)</label>
                        </div>
                        </div>
                        {
                            isLoading && <Loader message="Updating changes..."/>
                        }
                        {/* <p className="text-center text-danger">{saveSuccess}</p> */}
                        {isError && <p className="alert alert-danger w-25 text-center mx-auto py-2 mt-2">Id already in use</p>}
                        <div className="text-center mb-2 mt-2">
                            <button className="btn btn-danger " type="submit">Save</button>
                            {/* <button className="btn btn-warning ms-2">Reset</button> */}
                        </div>
                    </form>
                </div>
        //     </div>
        // </div>
    )
}
export default AdminProfile