import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
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
    //console.log(wishList.length)
    return(
        <div>
            {/* side bar */}
            <button className="btn"><NavLink className="categoryLink" to={`${url}/profile`}>Profile</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/profilecart`}>Cart (<span >{totalItems}</span>)</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/wishlist`}>Wishlist (<span>{wishListCount}</span>)</NavLink></button><br />
        </div>
    )
}
export default UserSidBar