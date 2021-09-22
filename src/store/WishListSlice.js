import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// add to wishlist db 
export const addToWishList = createAsyncThunk("addToWishList",(async(books,thunkAPI)=>{
    //console.log("bookQty".bookQty)
    const token = localStorage.getItem("token")
    const {data} = await axios.post("/wishlist/addItemToWishList",{books:books.books},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data :",data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(books)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// get items from wishlist 
export const getItemsFromWishList = createAsyncThunk("getItemsFromWishList",(async(_,thunkAPI)=>{
    const token = localStorage.getItem("token")
    const {data} = await axios.get("/wishlist/getItemsfromWishList",{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data1 :",data)
    if (data.status === "success") {
        return data
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

//remove items from wishlist
export const removeItemFromwishlist = createAsyncThunk("removeWishlistItem", (async ({ books, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/wishlist/removeItemFromWishList", { books }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

//initialize state
const initialWishListState = {
    wishList: [],
    wishListEmail:"",
    isWishListLoading: false,
    wishListError: "",
    wishListCount:0
}
const wishListSlice = createSlice({
    name: "wishList",
    initialState: initialWishListState,
    reducers: {
        resetWishList: state => {
            state = initialWishListState
            return state
        },
        setWishListEmail: (state, action) => {
            state.wishListEmail = action.payload
        }
    },extraReducers: {
        // post to wishlist
        [addToWishList.pending]: state => {
            state.isWishListLoading = true
            state.wishListError = ""
        },
        [addToWishList.fulfilled]: (state, action) => {
            state.isWishListLoading = false
            state.wishList.push(action.payload.books)
            //state.cartCount = action.payload.payload.length
        },
        [addToWishList.rejected]: (state, action) => {
            state.isWishListLoading = false
            state.wishListError = action.payload.reason
            //console.log("wishlist add",action.payload)
        },
        //get from wishlist
        [getItemsFromWishList.pending]: (state, action) => {
            state.isWishlistLoading = true
            state.wishlistError = ""
        },
        [getItemsFromWishList.fulfilled]: (state, action) => {
            state.isWishlistLoading = false
            state.wishList = action.payload.wishListItems
            state.wishListEmail = action.payload.wishListEmail
        },
        [getItemsFromWishList.rejected]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistError = action.payload.reason
        },
        //remove from wishlist
        [removeItemFromwishlist.pending]: (state, action) => {
            state.isWishlistLoading = true
            state.wishlistError = ""
        },
        [removeItemFromwishlist.fulfilled]: (state, action) => {
            state.isWishlistLoading = false
            state.wishList.splice(action.payload, 1)
        },
        [removeItemFromwishlist.rejected]: (state, action) => {
            state.isWishlistLoading = false
            state.wishlistError = action.payload.reason
        },
    }
})

export const { resetWishList, setWishListEmail } = wishListSlice.actions
export default wishListSlice.reducer