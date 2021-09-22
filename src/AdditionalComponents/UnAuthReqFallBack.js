import { setError } from "../store/ErrorSlice"
import resetAllState from "./Reset"

// for unauthorized request detection
export const UnAuthReqFallback = (dispatch, history) => {
    resetAllState(dispatch)
    dispatch(setError("Unauthorized access detected. Please login again."))
    history.push("/")
}