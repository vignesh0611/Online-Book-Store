import { Route, Switch, useRouteMatch, useHistory } from "react-router"
import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import AdminSideBar from "./AdminSideBar"
import AdminProfile from "./AdminProfile"
import ViewBooks from "./BooksPage/ViewBooks"
import MainCategoryPage from "./CategoriesPage/MainCategoryPage"
import AddBook from "./BooksPage/AddBook"
import EditBook from "./BooksPage/EditBook"
import UserManagement from "./UserManagement/UserManagementPage"
// import { useState } from "react"
import { decrypt } from "../AdditionalComponents/Encrypt"
import { setUser } from "../store/UserSlice"
import { UnAuthReqFallback } from "../AdditionalComponents/UnAuthReqFallBack"
function AdminDashboard(){
    let {url,path} = useRouteMatch()
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    const { userObj } = useSelector(state=>state.user)
    //const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    // handle refresh
    useEffect(()=>{
        let storeUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        try{
            storeUser = decrypt(storeUser)
        }
        catch(error){
            UnAuthReqFallback(dispatch,history)
        }
        if(storeUser && storeUser.role === "admin" && token){
            if(!Object.keys(userObj).length){
                dispatch(setUser(storeUser))
            }
        }
        else if (userObj.role !== "admin"){
            UnAuthReqFallback(dispatch,history)
        }
    },[userObj])
    return(
        // admin dashbord rout part
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminSideBar url={url}/>
                </div>
                <div className="col-md-9">
                    <Switch>
                        <Route path={`${path}/adminprofile`}>
                            <AdminProfile/>
                        </Route>
                        <Route path={`${path}/addcategory`}>
                            <MainCategoryPage/>
                        </Route>
                        <Route path={`${path}/editbooks`}>
                            <ViewBooks setShow={setShow} setUpdateIndex={setUpdateIndex}/>
                        </Route>
                        <Route path={`${path}/addbook`}>
                            <AddBook/>
                        </Route>
                        <Route path={`${path}/usermanagement`}>
                            <UserManagement/>
                        </Route>                        
                    </Switch>
                </div>
                <EditBook show={show} setShow={setShow} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex}/>
            </div>
        </div>
    )
}
export default AdminDashboard