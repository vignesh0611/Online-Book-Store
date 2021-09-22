import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { removeItemFromwishlist } from "../store/WishListSlice"
import { addToCart } from '../store/CartSlice'

function WishList(){
    let {wishList,isloading}=useSelector(state=>state.wishList)
    const [totalItems,setTotalItems] = useState(0)
    let dispatch = useDispatch()

    // useEffect(()=>{
    //     if(wishList.length){
    //         setTotalItems(wishList.map(item => +item.quantity).reduce((total,current)=>total+=current))
    //     }
    // },[wishList])
    // console.log(totalItems)
    const removeFromWishList = (bookIndex) =>{
        dispatch(removeItemFromwishlist(bookIndex))
    }
    const quantity = 1;
    // const decrementQuantity = ({cartItem,index}) => {
    //     let newCart = JSON.parse(JSON.stringify(cart))
    //     if(newCart[index].quantity === 1){
    //         dispatch(removeItemFromCart({cartItem,index}))
    //     }
    //     else{
    //         newCart[index].quantity--
    //         dispatch(updateItemQuantity(newCart[index]))
    //     }
    // }
    // const incrementQuantity = (index)=>{
    //     let newCart = JSON.parse(JSON.stringify(cart))
    //     newCart[index].quantity++
    //     dispatch(updateItemQuantity(newCart[index]))
    // }
    return(
        <div className="container mt-2">
            {
                wishList.length>0?
                <div className="row">
                <div className="col-12">
                    {
                        wishList.map((books,index)=>{
                            return(
                                <div className="row ">
                                    <div className="col-6 col-sm-3 col-md-2">
                                    {
                                        books.discount>0?
                                            <div style={{position:"relative"}}>
                                                <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{books.discount}%</div>
                                                    <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                                            </div>:
                                            <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                                    }
                                        {/* <img src={books.bookImage} className="img-fluid rounded-start" alt="books" /> */}
                                    </div>
                                    <div className="col-6 col-sm-3 col-md-3">
                                        <h5 className="card-title" style={{fontSize:"100%"}}><strong>{books.bookTitle}</strong></h5>
                                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>By: </strong>{books.author}</p>
                                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Rating: </strong>{books.rating}</p>
                                        {
                                            books.discount>0?
                                            <>
                                                <p className="card-text text-decoration-line-through" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>₹</strong>{books.price}</p>
                                                <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{Math.round((books.price)-((books.price)*(books.discount/100)))}</p>
                                            </>:
                                                <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{books.price}</p>
                                        }
                                    </div>
                                    <div className="col-12 col-sm-6 col-md-7">
                                        <h6 style={{fontSize:"100%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                                        <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>Ships within 2-4 Days</p>
                                        <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>₹39 shipping in India per item and low cost Worldwide</p>
                                        <div className="mt-2" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>
                                            <button type="button" className="btn btn-danger" style={{fontSize:"90%"}} onClick={()=>removeFromWishList({books,index})}><strong>Delete</strong></button>
                                            <button type="button" className="btn btn-secondary ms-2" style={{fontSize:"90%"}} onClick={()=>dispatch(addToCart({books,quantity})) && removeFromWishList({books,index})}><strong>Add to Cart</strong></button>
                                        </div>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })
                    }
                </div>
            </div>:
            <div>
                <h6 className="text-center">Nothing in Wishlist....</h6>
            </div>
            }
        </div>
    )
}
export default WishList