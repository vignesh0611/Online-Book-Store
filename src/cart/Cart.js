import { useState } from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { getItemsToCart } from "../store/CartSlice"
import { updateItemQuantity, removeItemFromCart } from "../store/CartSlice"

function Cart(){
    let {cart,isloading}=useSelector(state=>state.cart)
    const [totalItems,setTotalItems] = useState(0)
    const [totalPrice,setTotalPrice] = useState(0)
    const [discountPrice,setDiscountPrice] = useState(0)
    // to claculate total/discount/no.of items in cart
    useEffect(()=>{
        if(cart.length){
            setTotalItems(cart.map(item => +item.quantity).reduce((total,current)=>total+=current))
            setTotalPrice(cart.map(item => +((item.quantity)*item.books.price)).reduce((total,current)=>total+=current))
            setDiscountPrice(cart.map(item => +(item.quantity*((item.books.price)-((item.books.price)*(item.books.discount/100))))).reduce((total,current)=>total+=current))
        }
    },[cart])
    let dispatch = useDispatch()
    useEffect(()=>{
        if(cart.length<=0){
            dispatch(getItemsToCart())
        }
    },[])
    // to remove item from cart
    const removeFromcart = (bookIndex) =>{
        dispatch(removeItemFromCart(bookIndex))
    }
    // to decrement the quantity
    const decrementQuantity = ({cartItem,index}) => {
        let newCart = JSON.parse(JSON.stringify(cart))
        if(newCart[index].quantity === 1){
            dispatch(removeItemFromCart({cartItem,index}))
        }
        else{
            newCart[index].quantity--
            dispatch(updateItemQuantity(newCart[index]))
        }
    }
    // to increment the quantity
    const incrementQuantity = (index)=>{
        let newCart = JSON.parse(JSON.stringify(cart))
        newCart[index].quantity++
        dispatch(updateItemQuantity(newCart[index]))
    }
    return(
        <div className="container-fluid mt-2">
            {
                cart.length>0?
                    <div className="row">
                        {/* cart part */}
                        <div className="col-lg-8">
                            {
                                cart.map((cartItem,index)=>{
                                    return(
                                        <div className="row ">
                                            <div className="col-6 col-sm-3 col-md-2">
                                                {
                                                    cartItem.books.discount>0?
                                                        <div style={{position:"relative"}}>
                                                            <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{cartItem.books.discount}%</div>
                                                                <img src={cartItem.books.bookImage} className="img-fluid rounded-start" alt="books" />
                                                        </div>:
                                                        <img src={cartItem.books.bookImage} className="img-fluid rounded-start" alt="books" />
                                                }
                                            </div>
                                            <div className="col-6 col-sm-3 col-md-3">
                                                <h5 className="card-title" style={{fontSize:"100%"}}><strong>{cartItem.books.bookTitle}</strong></h5>
                                                <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>By: </strong>{cartItem.books.author}</p>
                                                <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{cartItem.books.publisher}</p>
                                                <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Rating: </strong>{cartItem.books.rating}</p>
                                                {
                                                    cartItem.books.discount>0?
                                                    <>
                                                        <p className="card-text text-decoration-line-through" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>₹</strong>{cartItem.books.price}</p>
                                                        <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{Math.round((cartItem.books.price)-((cartItem.books.price)*(cartItem.books.discount/100)))}</p>
                                                    </>:
                                                        <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{cartItem.books.price}</p>
                                                }
                                            </div>
                                            <div className="col-12 col-sm-6 col-md-7">
                                                <h6 style={{fontSize:"100%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                                                <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>Ships within 2-4 Days</p>
                                                <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>₹39 shipping in India per item and low cost Worldwide</p>
                                                <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>
                                                    Cost of {cartItem.quantity} books <span className="card-text text-success"><strong>₹</strong>{Math.round(cartItem.quantity*((cartItem.books.price)-((cartItem.books.price)*(cartItem.books.discount/100))))}</span>
                                                </p>
                                                <div className = "d-flex mt-2" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>
                                                    <div className="text-danger"><strong>Quantity:</strong></div>
                                                        <div className="input-group input-group-sm ms-2">
                                                            <div className="input-group-text cursor-pointer" onClick={()=>decrementQuantity({cartItem,index})}>-</div>
                                                            <input type="text" className="text-center" style={{width:"15%"}} placeholder="Quantity" value={cartItem.quantity}/>
                                                            <div className="input-group-text cursor-pointer" onClick={()=>incrementQuantity(index)}>+</div>
                                                        </div>
                                                </div>
                                                <div className="mt-2 mb-2" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>
                                                    <button type="button" className="btn btn-danger" style={{fontSize:"90%"}} onClick={()=>removeFromcart({cartItem,index})}><strong>Delete</strong></button>
                                                </div>
                                            </div>
                                            <hr />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {/* summary part */}
                        <div className="col-lg-4 ">
                            <div className="mt-2 rounded p-2 bg-secondary bg-gradient">
                            <h5 className="text-center text-white"><strong>Cart Summary</strong></h5>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Total Items: </strong>
                                    </div>
                                    <div className="col-5">
                                        {totalItems}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Total Price: </strong>
                                    </div>
                                    <div className="col-5">
                                        <strong>₹</strong>{totalPrice}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Discount Price: </strong>
                                    </div>
                                    <div className="col-5">
                                        <strong>₹</strong>{Math.round(discountPrice)}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Delevery Charge: </strong>
                                    </div>
                                    <div className="col-5">
                                        <strong>₹</strong>39
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Net Total: </strong>
                                    </div>
                                    <div className="col-5">
                                        <strong>₹</strong>{39+(Math.round(discountPrice))}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7">
                                        <strong className="text-dark">Your Saving: </strong>
                                    </div>
                                    <div className="col-5">
                                        <strong>₹</strong>{Math.round(totalPrice-discountPrice)}
                                    </div>
                                </div>                                
                            </div>
                            <button className="btn btn-secondary float-end mt-2 mb-2"><strong>Check Out</strong></button>
                        </div>
                    </div>:
                    <div>
                        <h6 className="text-center">Nothing in Cart....</h6>
                    </div>
            }
        </div>
    )
}
export default Cart