import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"

import { Switch, useRouteMatch,Route } from "react-router"
import ProfileCart from "./ProfileCart"
import WishList from "./WishList"
import { useSelector } from "react-redux"
function UserSidBar({url}){
    let {userObj} = useSelector(state=>state.user)
    let {wishList,isloading}=useSelector(state=>state.wishList)
    let {cart}=useSelector(state=>state.cart)

    let [wishListCount,setWishListCount]=useState(0)
    const [totalItems,setTotalItems] = useState(0)

    useEffect(()=>{
        setWishListCount( wishList.length );
    },[wishList])
    useEffect(() => {
        if (cart.length) {
            setTotalItems(cart.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cart.length){
            setTotalItems(0)
        }
    }, [cart]);
    //let { url,path } = useRouteMatch()
    //console.log(wishList.length)
    return(
        <div>
            <button className="btn"><NavLink className="categoryLink" to={`${url}/profile`}>Profile</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/profilecart`}>Cart (<span >{totalItems}</span>)</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/wishlist`}>Wishlist (<span>{wishListCount}</span>)</NavLink></button><br />
            {/* <Switch>
            <Route path={`${path}/profilecart`}>
                    <ProfileCart/>
                </Route>
            </Switch> */}
        </div>
    )
}
export default UserSidBar