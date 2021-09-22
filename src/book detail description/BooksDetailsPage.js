import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRecentlyViewedBooks } from '../store/BooksSlice';
import DescriptionPageRight from './DescriptionPageRight';
import { addToCart } from '../store/CartSlice'
import { addToWishList } from '../store/WishListSlice'
import Quantity from '../cart/Quantity';
import { useHistory } from 'react-router';
import Loader from '../AdditionalComponents/Loader'
const BookDetailsPage=({books})=>{
    const {recentlyViewed,isBooksLoading} = useSelector(state=>state.book)
    const { userObj,isSuccess } = useSelector(state=>state.user)
    let {wishList}=useSelector(state=>state.wishList)
    const dispatch = useDispatch()
    const [quantity,setQuantity] = useState(1);
    const history = useHistory()
    useEffect(()=>{
        if(recentlyViewed.indexOf(books) === -1){
            dispatch(addRecentlyViewedBooks(books))
        }
    },[books])
    return(          
        <div className="row mt-4">
            <div className="col-lg-10 col-md-9 col-sm-12">
                <div className="row mb-2">
                    <div className="col-6 col-sm-4 col-md-3">
                        {
                            books.discount>0?
                                <div style={{position:"relative"}}>
                                    <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{books.discount}%</div>
                                    <img src={books.bookImage} className="img-fluid rounded-start" width="100%" alt="books" />
                                </div>:
                                <img src={books.bookImage} className="img-fluid rounded-start" width="100%" alt="books" />
                        }
                    </div>
                    <div className="col-6 col-sm-8 col-md-3">
                        <h5 className="card-title" style={{fontSize:"100%"}}><strong>{books.bookTitle}</strong></h5>
                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>By: </strong>{books.author}</p>
                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong>{books.publisher}</p>
                        <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Rating: </strong>{books.rating}</p>
                        {
                            books.discount>0?
                            <>
                                <p className="card-text text-decoration-line-through" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>₹</strong>{books.price}</p>
                                <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{(books.price)-((books.price)*(books.discount/100))}</p>
                            </>:
                                <p className="card-text text-success" style={{fontSize:"150%",margin:"0px",padding:"0px"}}><strong>₹</strong>{books.price}</p>
                        }
                    </div>
                    <div className="col-12 col-sm-12 col-md-6">
                        <h6 style={{fontSize:"100%",margin:"0px",padding:"0px"}} className="text-success"><strong>Available</strong></h6>
                        <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>Ships within 2-4 Days</p>
                        <p style={{fontSize:"80%",margin:"0px",padding:"0px"}}>₹39 shipping in India per item and low cost Worldwide</p>
                        <div className = "d-flex mt-2">
                            <div className="text-danger"><strong>Quantity:</strong></div>
                                <div className="input-group input-group-sm ms-2">
                                    <div className="input-group-text cursor-pointer" onClick={()=>quantity >=2 && setQuantity(+quantity - 1)}>-</div>
                                    <input type="text" className="text-center" style={{width:"15%"}} placeholder="Quantity" value={quantity} onChange={(e)=>setQuantity(e.target.value)}/>
                                    <div className="input-group-text cursor-pointer" onClick={()=>quantity >=1 && setQuantity(+quantity + 1)}>+</div>
                                </div>
                        </div>
                        <div className="mt-2">
                            <button type="button" class="btn btn-danger " style={{fontSize:"90%"}} onClick={()=>!isSuccess? history.push("/login"):isSuccess&&userObj.role === "admin"? alert("You are admin."): dispatch(addToCart({books,quantity}))}><strong>Add To Cart</strong></button>
                            <button type="button" class="btn btn-secondary ms-2 wishlistbtn" style={{fontSize:"90%"}} onClick={()=>!isSuccess? history.push("/login"):isSuccess&&userObj.role === "admin"? alert("You are admin."):  !JSON.stringify(wishList).includes(JSON.stringify(books))&&dispatch(addToWishList({books}))}><strong>Add to Wishlist</strong></button>
                        </div>
                    </div>
                </div>
                <hr />
                <div>
                    {/* pre to leave space before para start */}
                    <h5>Description</h5>
                    <p>{books.description}</p>
                    <div className="row container-fluid mb-2">
                        <div className="col-md-6">
                            <div className="border-end d-none d-md-block">
                            <div className="row">
                                <div className="col-5">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>ISBN: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Author: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Height: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Width: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>No of Pages: </strong></p>
                                </div>
                                <div className="col-7">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.isbn}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.author}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.publisher}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.height} mm</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.width} mm</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.pages}</p>
                                </div>
                            </div>
                            </div>
                            <div className="d-block d-sm-block d-md-none">
                            <div className="row">
                                <div className="col-5">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>ISBN: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Author: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Publisher: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Height: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Width: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>No of Pages: </strong></p>
                                </div>
                                <div className="col-7">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.isbn}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.author}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.publisher}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.height} mm</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.width} mm</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.pages}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-md-6 ">
                            <div className="row">
                                <div className="col-5">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Rating: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Language: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Category: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Weight: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Released Date: </strong></p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}><strong>Discount: </strong></p>
                                </div>
                                <div className="col-7">
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.rating}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.language}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.category}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.weight} gr</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.releaseDate}</p>
                                    <p className="card-text" style={{fontSize:"80%",margin:"0px",padding:"0px"}}>{books.discount}%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <div className="col-lg-2 col-md-3 border-start d-none d-md-block">
                <DescriptionPageRight recentlyViewed={recentlyViewed}/>
            </div>
            {/* {
                books && <Loader message="Loading Books..."/>
            } */}
        </div>
        );    
}    
export default BookDetailsPage



