import { resetCart } from "../store/CartSlice"
import { resetUserState } from "../store/UserSlice"
import { resetWishList } from "../store/WishListSlice"

const ResetAllState = (dispatch) => {
    // reset all state after logout
    localStorage.clear()
    dispatch(resetCart())
    dispatch(resetUserState())
    dispatch(resetWishList())
}
export default ResetAllState