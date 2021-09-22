import {GiShoppingCart} from "react-icons/gi"
import BooksImage from '../images/1449543142.svg'
import SearchNav from '../category/SearchNav'
import {NavLink} from 'react-router-dom'
import ResetAllState from "../AdditionalComponents/Reset"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from "react"
import { useState } from "react"
import { getItemsToCart } from "../store/CartSlice"
import { updateUserData } from "../store/UserSlice"
import DefaultImage from "../images/images.png"
//import { useHistory } from 'react-router'
function HomeNavBar(){
    let {userObj,isSuccess} = useSelector(state => state.user)
    //console.log("1234",userObj)
    let {cart,isloading}=useSelector(state=>state.cart)
    const [totalItems,setTotalItems] = useState(0)
    useEffect(()=>{
        if(userObj.length<=0){
            dispatch(updateUserData())
        }
    },[userObj])
    useEffect(() => {
        if (cart.length) {
            setTotalItems(cart.map(item => +item.quantity).reduce((total, current) => total += current))
        }
        if (!cart.length){
            setTotalItems(0)
        }
    }, [cart]);
    let dispatch = useDispatch()
    //let history = useHistory()
    //let dispatch = useDispatch()
    const onUserLogout=()=>{
        ResetAllState(dispatch)
        //history.push("/")
    }
    let activeLinkStyle={
        color:"#ffffff",
        fontWeight:"bold"
      }
    return(
        <div>
        {/* style={{backgroundColor:"#D0D3D4"}} */}
            <nav className="navbar navbar-expand-lg navbar-light bg-secondary bg-gradient" >
                <div className="container-fluid">
                    {/* <div className="d-flex d-none d-sm-block d-md-none">
                        <NavLink className="navbar-brand fontLogo" activeStyle={activeLinkStyle} style={{fontSize:"120%",marginRight:"0%"}} to="/home"><img src={BooksImage} alt="" width="20%" /> MyBookShelf</NavLink>
                        <button className="navbar-toggler" style={{fontSize:"60%"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div> */}
                    {/* <div className="d-flex"> */}
                        <NavLink className="navbar-brand fontLogo text-white" activeStyle={activeLinkStyle} style={{fontSize:"120%",width:"40%"}} to="/home"><img src={BooksImage} alt="" width="100px" /> MyBookShelf</NavLink>
                        <button className="navbar-toggler float-end text-white" style={{fontSize:"100%"}} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    {/* </div> */}
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 float-end ">
                            { !isSuccess?
                            <>
                                <li className="nav-item ">
                                    <NavLink className="nav-link text-white" activeStyle={activeLinkStyle} to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-white" activeStyle={activeLinkStyle} to="/signup">Signup</NavLink>
                                </li>
                            </>: isSuccess && userObj.role === "user"?
                            <>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userObj.name}
                                    {
                                        userObj.profilePicture?
                                                <img src={userObj.profilePicture} className="border border-dark rounded-circle" width="40px" alt="" />
                                                :
                                                <img src={DefaultImage} className="border border-dark rounded-circle" width="40px" alt="" />
                                    }
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">    
                                        <NavLink className="nav-link " to={`/`} onClick={onUserLogout}>Logout</NavLink>
                                        <NavLink className="nav-link " to={`/userdashboard/${userObj.name}`}>Dashboard</NavLink>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link text-decoration-none position-relative text-white" activeStyle={activeLinkStyle} to="/cart">Cart<GiShoppingCart/><span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger">
                                        {totalItems}
                                    </span></NavLink>
                                </li>
                            </>:
                            <>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {userObj.name}
                                    </a>
                                    <ul class="dropdown-menu" aria-labelledby="navbarDropdown">    
                                        <NavLink className="nav-link" to={`/`} onClick={onUserLogout}>Logout</NavLink>
                                        <NavLink className="nav-link" to={`/admindashboard/${userObj.name}`}>Dashboard</NavLink>
                                    </ul>
                                </li>
                                {/* <li className="nav-item">
                                    <NavLink className="nav-link" activeStyle={activeLinkStyle} to="/cart"><GiShoppingCart/></NavLink>
                                </li>   */}
                            </>
                            }
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" activeStyle={activeLinkStyle} to="/contact-us">Contact Us</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link text-white" activeStyle={activeLinkStyle} to="/category">Category</NavLink>
                            </li>
                            <li>
                                <SearchNav/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default HomeNavBar