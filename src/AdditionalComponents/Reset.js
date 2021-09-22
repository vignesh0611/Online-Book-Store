import { resetCart } from "../store/CartSlice"
import { resetUserState } from "../store/UserSlice"
import { resetWishList } from "../store/WishListSlice"

const ResetAllState = (dispatch) => {
    localStorage.clear()
    dispatch(resetCart())
    dispatch(resetUserState())
    dispatch(resetWishList())
}
export default ResetAllState