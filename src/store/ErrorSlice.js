import { createSlice } from '@reduxjs/toolkit'
const ErrorSlice = createSlice({
    name:"error",
    initialState : {error: ""},
    reducers:{
        setError:(state,action) =>{
            state.error = action.payload
        }
    }
})

export const { setError } = ErrorSlice.actions
export default ErrorSlice.reducer