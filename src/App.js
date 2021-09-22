//import logo from './logo.svg';
//import './App.css';
import {BrowserRouter,Switch,NavLink,Route,useHistory} from 'react-router-dom'
import HomePage from './home page components/homepage'
import HomeNavBar from './home page components/homeNavBar';
import Categorypage from './home page components/CategoryPage';
import DisplayPage from './home page components/displayPage'
import Category from './home page components/SelectByCategory'
import Footer from './home page components/Footer'
import SearchPage from './category/SearchFunction';
import BookDetailsDescriptionPage from './book detail description/BookDescriptionPage';
import Register from './Register/Register';
import Login from './Register/Login';
import UserDashboardPage from './UserDashboard/UserDashboardPage';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Cart from './cart/Cart'
import { getCategories } from "./store/CategorySlice"
import { getItemsFromWishList } from "./store/WishListSlice"
import { getItemsToCart } from "./store/CartSlice"
import { getBooks } from "./store/BooksSlice"
import { usersfromDB } from "./store/UserSlice"
import Message from "./AdditionalComponents/message"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "./store/UserSlice"
import { UnAuthReqFallback } from "./AdditionalComponents/UnAuthReqFallBack"
import { decrypt } from "./AdditionalComponents/Encrypt"
import ResetAllState from './AdditionalComponents/Reset';
import { setError } from './store/ErrorSlice'
import ContactUs from './home page components/ContactUs';
function App() {
    const { categories,categoryError } = useSelector(state=>state.category)
    const {wishList,wishlistError}=useSelector(state=>state.wishList)
    const {cart,cartError}=useSelector(state=>state.cart)
    const {books,booksError}=useSelector(state=>state.book)
    const {  userObj,getUsers,isSuccess,isError } = useSelector(state=>state.user)
    const history = useHistory()
    const dispatch = useDispatch()
    const { error } = useSelector(state => state.error)
    useEffect(()=>{
        if(!getUsers.length && isSuccess && userObj.role === "admin"){
            //console.log("function log");
            dispatch(usersfromDB())  
        }
    },[userObj])
    useEffect(()=>{
        if(!wishList.length && isSuccess){
            dispatch(getItemsFromWishList())
        }
    },[userObj])
    // let dispatch = useDispatch()
    useEffect(()=>{
        if(!categories.length){
            dispatch(getCategories())
        }
    },[])
    useEffect(()=>{
        if(!cart.length && isSuccess){
            dispatch(getItemsToCart())
        }
    },[userObj])
    useEffect(()=>{
        if(!books.length){
            dispatch(getBooks())
        }
    },[])
    // to maintain token expire
    useEffect(() => {
        if (["jwt expired", "token not available"].indexOf(isError || cartError || wishlistError || booksError || categoryError) >= 0) {
          ResetAllState(dispatch)
          dispatch(setError("Session expired. Please login again."))
          history.push("/")
        }
      }, [isError, cartError, wishlistError, booksError, categoryError]);
    // to maintain refresh
    useEffect(()=>{
        let storeUser = localStorage.getItem("user")
        const token = localStorage.getItem("token")
        try{
            storeUser = decrypt(storeUser)
        }
        catch(error){
            UnAuthReqFallback(dispatch,history)
        }
        if(storeUser && (storeUser.role === "user" || storeUser.role === "admin") && token){
            if(storeUser && token){
                dispatch(setUser(storeUser))
            }
        }
    },[])
  return (
    <div>
      {
          error && <Message message={error} variant="danger"/>
      }
        <HomeNavBar/>
        <Switch>
                <Route exact path="/">
                    <DisplayPage/>
                </Route>
                <Route path="/home">
                    <DisplayPage/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/signup">
                    <Register/>
                </Route>
                <Route path="/userdashboard">
                    <UserDashboardPage/>
                </Route>
                <Route path="/admindashboard">
                    <AdminDashboard/>
                </Route>
                <Route path="/cart">
                    <Cart/>
                </Route>
                <Route path="/contact-us">
                    <ContactUs/>
                </Route>
                <Route path="/category">
                    <Category/>
                </Route>
                <Route path="/search">
                    <SearchPage/>
                </Route>
                <Route path="/book/:bookId">
                    <BookDetailsDescriptionPage/>
                </Route>
                <Route path="/:category">
                    <Categorypage/>
                </Route>
          </Switch>
      <Footer/>
    </div>
  )
}

export default App;
