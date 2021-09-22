import { configureStore } from "@reduxjs/toolkit"; 
import categorySlice from "./CategorySlice";
import booksSlice from "./BooksSlice";
import userSlice from "./userSlice";
import cartSlice from "./CartSlice";
import wishList from "./WishListSlice"
import errorSlice from "./ErrorSlice"
export const Store = configureStore({
    reducer:{
        category:categorySlice,
        book:booksSlice,
        user:userSlice,
        cart:cartSlice,
        wishList:wishList,
        error:errorSlice
    }
})