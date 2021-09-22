
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBooks = createAsyncThunk("getBooks",(async(_,thunkAPI)=>{
    const {data} = await axios.get("/books/getbooks")
    //console.log("data :",data)
    if(data.message==="books"){
        return data
    }
    else{
        return thunkAPI.rejectWithValue(data)
    }
}))

export const addBook = createAsyncThunk("addBook", (async (books, thunkAPI) => {
    //console.log("book",books)
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/addToBook", books, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("data12345",data)
    if (data.status === "success") {
        return data.book
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))

export const deleteBook = createAsyncThunk("deleteBook", (async ({ book, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/deleteFromBook", book, {
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

export const updatebook = createAsyncThunk("updatebook", (async ({ formData, index }, thunkAPI) => {
    const token = localStorage.getItem("token")
    const { data } = await axios.post("/books/updatetobook", formData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    //console.log("book update data",data);
    if (data.status === "success") {
        return {book: data.book, index}
    } else {
        return thunkAPI.rejectWithValue(data)
    }
}))
//setting initial state
const initialBookState = {
    books: [],
    isBooksLoading: false,
    isSuccess: false,
    booksError: "",
    booksCount:0,
    recentlyViewed:[]
}
// Slice
const booksSlice = createSlice({
    name: "books",
    initialState: initialBookState,
    reducers: {
        addRecentlyViewedBooks: (state,action)=>{
            state.recentlyViewed.splice(0,0,action.payload)
        }
    },
    extraReducers: {
        // Get categories
        [getBooks.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [getBooks.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books = action.payload.payload
            state.booksCount = action.payload.payload.length
        },
        [getBooks.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
         // Add category
         [addBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [addBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.push(action.payload)
        },
        [addBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
        // Delete category
        [deleteBook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [deleteBook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            state.books.splice(action.payload, 1)
        },
        [deleteBook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },
        // Update category
        [updatebook.pending]: state => {
            state.isBooksLoading = true
            state.booksError = ""
        },
        [updatebook.fulfilled]: (state, action) => {
            state.isBooksLoading = false
            //console.log(action.payload);
            state.books.splice(action.payload.index, 1, action.payload.book)
        },
        [updatebook.rejected]: (state, action) => {
            state.isBooksLoading = false
            state.booksError = action.payload.reason
        },

 
    }
 
})
export const {addRecentlyViewedBooks}=booksSlice.actions
export default booksSlice.reducer