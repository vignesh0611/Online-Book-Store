import {useEffect,useState} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import UserSideBar from "./UserSideBar"
import ProfileCart from './ProfileCart'
import Cart from "../cart/Cart"
import Profile from "./Profile"
import WishList from "./WishList"
import { decrypt } from "../AdditionalComponents/Encrypt"
import { setUser } from "../store/UserSlice"
import {UnAuthReqFallback} from "../AdditionalComponents/UnAuthReqFallBack"
import { Switch, useRouteMatch,Route, BrowserRouter, useHistory } from "react-router-dom"
import ResetAllState from '../AdditionalComponents/Reset';
import { setError } from '../store/ErrorSlice'
function UserDashboardPage(){
    let { url,path } = useRouteMatch()
    const { userObj,isError } = useSelector(state=>state.user)
    const {wishList,wishlistError}=useSelector(state=>state.wishList)
    const {cart,cartError}=useSelector(state=>state.cart)
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()
    //console.log("error message",isError)
    // jwt expire message
    useEffect(() => {
        if (["jwt expired", "token not available"].indexOf(isError || cartError || wishlistError) >= 0) {
          ResetAllState(dispatch)
          dispatch(setError("Session expired. Please login again."))
          history.push("/")
        }
      }, [isError, cartError, wishlistError]);
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
        //console.log("stored user",storeUser);
        if(storeUser && storeUser.role === "user" && token){
            if(!Object.keys(userObj).length){
                dispatch(setUser(storeUser))
            }
        }
        else if (userObj.role !== "user"){
            UnAuthReqFallback(dispatch,history)
        }
    },[userObj])

    return(
        <BrowserRouter>
        <div className="container">
            <div className="row">
                <div className="col-md-2">
                    <UserSideBar url={url}/>
                </div>
                <div className="col-md-10">
                    <Switch>
                        <Route path={`${path}/profile`}>
                            <Profile/>
                        </Route>
                        <Route path={`${path}/profilecart`}>
                            <Cart/>
                        </Route>
                        <Route path={`${path}/wishlist`}>
                            <WishList/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
        </BrowserRouter>
    )
}
export default UserDashboardPage