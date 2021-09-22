import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategories = createAsyncThunk("getCategories",(async(_,thunkAPI)=>{
    const {data} = await axios.get("/category/getcategory")
    //console.log("data :",data)
    if(data.message==="category"){
        return data
    }
    else{
        return thunkAPI.rejectWithValue(data)
    }
}))

export const addCategory = createAsyncThunk("addCategory", (async (category, thunkAPI) => {
    //console.log("addCategory",category)
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/addToCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(category)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const deleteCategory = createAsyncThunk("deleteCategory", (async ({ category, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/deletefromCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("delete data",data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const updateCategory = createAsyncThunk("updateCategory", (async ({ category, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/category/updatetoCategory", category, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log('category',data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue({ category, index })
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))
//setting initial state
const initialCategoryState = {
    categories: [],
    isCategoryLoading: false,
    categoryError: "",
    categoryCount:0
}
// Slice
const categorySlice = createSlice({
    name: "category",
    initialState: initialCategoryState,
    reducers: {
    },
    extraReducers: {
        // Get categories
        [getCategories.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [getCategories.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories = action.payload.payload
            state.categoryCount = action.payload.payload.length
        },
        [getCategories.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
         // Add category
        [addCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [addCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.push(action.payload)
        },
        [addCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
        // Delete category
        [deleteCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            state.categories.splice(action.payload, 1)
        },
        [deleteCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },
        // Update category
        [updateCategory.pending]: state => {
            state.isCategoryLoading = true
            state.categoryError = ""
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isCategoryLoading = false
            //console.log(action.payload);
            state.categories.splice(action.payload.index, 1, action.payload.category)
        },
        [updateCategory.rejected]: (state, action) => {
            state.isCategoryLoading = false
            state.categoryError = action.payload.reason
        },

    }
 
})
export default categorySlice.reducer