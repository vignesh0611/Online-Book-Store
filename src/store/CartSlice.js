import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// post cart items to db
export const addToCart = createAsyncThunk("addToCart",(async(bookQty,thunkAPI)=>{
    const token = localStorage.getItem("token")
    const {data} = await axios.post("/cart/addItemToCart",{books:bookQty.books, quantity:bookQty.quantity},{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("error data",data)
    //console.log("data :",data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(bookQty)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// get cart items from db
export const getItemsToCart = createAsyncThunk("getItemsToCart",(async(_,thunkAPI)=>{
    const token = localStorage.getItem("token")
    const {data} = await axios.get("/cart/getCartItems",{
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

//update quantity in cart
export const updateItemQuantity = createAsyncThunk("updateItemQuantity", (async (bookQty, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/updateCart", { books: bookQty.books, quantity: bookQty.quantity }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data12345:",data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(bookQty)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

// remove item from cart
export const removeItemFromCart = createAsyncThunk("removeItemFromCart", (async (bookIndex, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/cart/removeItemFromCart", { books: bookIndex.cartItem.books }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("remove:",data)
    if (data.status === "success") {
        return thunkAPI.fulfillWithValue(bookIndex.index)
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

//setting initial state
const initialCartState = {
    cart: [],
    cartemail:"",
    isCartLoading: false,
    cartError: "",
    cartCount:0
}
// Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: initialCartState,
    reducers: {
        resetCart: state => {
            state = initialCartState
            return state
        },
        setEmail: (state, action) => {
            state.cartemail = action.payload
        }
    },
    extraReducers: {
        // post cart
        [addToCart.pending]: state => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [addToCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            //state.cart.push(action.payload)
            //state.cartCount = action.payload.payload.length
            const index = state.cart.findIndex(bookQty => JSON.stringify(bookQty.books) === JSON.stringify(action.payload.books))
            index >= 0 ? state.cart[index]["quantity"] += action.payload.quantity : state.cart.push(action.payload)
        },
        [addToCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.reason
            //console.log(action.payload);
        },
        
        // get to cart
        [getItemsToCart.pending]: state => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [getItemsToCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cart=action.payload.payload
            state.cartemail=action.payload.cartemail
            //state.cartCount = action.payload.payload.length
        },
        [getItemsToCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.reason
        },
        //update cart
        [updateItemQuantity.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [updateItemQuantity.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cart.find(bookQty => JSON.stringify(bookQty.books) === JSON.stringify(action.payload.books))["quantity"] = action.payload.quantity
        },
        [updateItemQuantity.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.reason
        },
        //remove from cart
        [removeItemFromCart.pending]: (state, action) => {
            state.isCartLoading = true
            state.cartError = ""
        },
        [removeItemFromCart.fulfilled]: (state, action) => {
            state.isCartLoading = false
            state.cart.splice(action.payload, 1)
        },
        [removeItemFromCart.rejected]: (state, action) => {
            state.isCartLoading = false
            state.cartError = action.payload.reason
        },

    }
 
})
export const { resetCart, setEmail } = cartSlice.actions
export default cartSlice.reducer