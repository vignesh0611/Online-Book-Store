import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'
import { decrypt } from "../AdditionalComponents/Encrypt"
export const userLogin = createAsyncThunk('loginUser',async (userCredentialObj,thunkAPI)=>{
        // make post
        //console.log("useeCrediobj",userCredentialObj);
        // type is user
        let data;
        let response=await axios.post('/user/login',{user:userCredentialObj})
        data=response.data

        if (data.message === "Success"){
            // save in local storage of browser
            localStorage.setItem("token",data.token)
            localStorage.setItem("user", data.user)
            const decryptUserObj = decrypt(data.user)
            //console.log("111111",decryptUserObj);
            return decryptUserObj
        }
        if(data.message === "Invalid email" || data.message === "Invalid password" || data.message === "Your Id has been blocked. Contact admin to continue shopping"){
            // it will provide data to rejected state
            return thunkAPI.rejectWithValue(data)
        }
        // else if(data.message === "failed"){
        //     return thunkAPI.rejectWithValue(data)
        // }
})
export const updateUserData = createAsyncThunk("updateUserData", async (formData, thunkAPI) => {
    //console.log("formData",formData)
    const token = localStorage.getItem("token")
    const { data } = await axios.put("/user/updateUserData", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data1111111",data);
    if (data.status === "success") {
        return data.user
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

// get users
export const usersfromDB = createAsyncThunk("usersfromDB", async (_, thunkAPI) => {
    const token = localStorage.getItem("token")
    const  { data }  = await axios.get("/user/getusers", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("datauser",data);
    if (data.status === "success") {
        return data.users
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})
 
// update role
export const updateRole = createAsyncThunk("updateRole", async ({ user, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.put("/user/updaterole", user, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("update data",data);
    if (data.status === "success") {
        return { user, index }
    } else {
        return thunkAPI.rejectWithValue(data)
    }
})

const initialStateOfUser = {
    userObj:{},
    isSuccess:false,
    isLoading:false,
    isError:"",
    invalidLoginMessage:'',
    getUsers: []
}

const userSlice = createSlice({
    name:"user",
    initialState: initialStateOfUser,
    reducers:{
        setUser: (state,action)=>{
            state.userObj = action.payload
            state.isSuccess = true
            return state
        },
        resetUserState:(state,action)=>{
            state = initialStateOfUser
            return state
        }
    },
    extraReducers:{
        [userLogin.fulfilled]: (state,action) => {
            state.userObj = action.payload
            state.isSuccess = true
            state.isLoading = false
            state.invalidLoginMessage = ''
            state.isError = false
        },
        [userLogin.pending]: (state,action) => {
            state.isLoading = true
        },
        [userLogin.rejected]: (state,action) => {
            state.isError = true
            state.isLoading = false
            state.invalidLoginMessage = action.payload.message
        },
        [updateUserData.pending]: (state, action) => {
            state.isError = ""
            state.isLoading = true
        },
        [updateUserData.fulfilled]: (state, action) => {
            state.userObj = { ...state.userObj, ...action.payload }
            state.isLoading = false
            state.isError = ""
        },
        [updateUserData.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.payload.reason
        },
        // Get users
        [usersfromDB.pending]: (state, action) => {
            state.isError = ""
            state.isLoading = true
        },
        [usersfromDB.fulfilled]: (state, action) => {
            state.isLoading = false
            state.getUsers = action.payload
        },
        [usersfromDB.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.payload.reason
        },
        // Update role
        [updateRole.pending]: (state, action) => {
            state.isError = ""
            state.isLoading = true
        },
        [updateRole.fulfilled]: (state, action) => {
            state.isLoading = false
            action.payload.user.status
                ? state.getUsers[action.payload.index].status = action.payload.user.status
                : state.getUsers[action.payload.index].role = action.payload.user.role
        },
        [updateRole.rejected]: (state, action) => {
            state.isLoading = false
            state.isError = action.payload.reason
        },
    }
})
export const {userState,resetUserState,setUser}=userSlice.actions

export default userSlice.reducer
