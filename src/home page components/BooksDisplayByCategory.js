import React from 'react';
import { useDispatch } from 'react-redux';
import {useHistory} from 'react-router'
import Loader from '../AdditionalComponents/Loader'
import { useSelector, } from 'react-redux'
//import { addToCart } from '../store/CartSlice'
const BookTile=({books})=>{
    let history=useHistory()
    let {isBooksLoading}=useSelector(state=>state.book)
    //let dispatch = useDispatch()
    return(        
        <div>
            <div onClick={()=>history.push({ pathname: `/book/${books._id}`})}>
                <div className="row mb-2">
                    <div className="col-6 col-sm-3 col-md-2">
                        {
                            books.discount>0?
                                <div style={{position:"relative"}}>
                                    <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{books.discount}%</div>
                                        <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                                </div>:
                                <img src={books.bookImage} className="img-fluid rounded-start" alt="books" />
                        }
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
                        {/* <div className="mt-2">
                            <button type="button" className="btn btn-danger" style={{fontSize:"90%"}}><strong>Buy Now</strong></button>
                            <button type="button" className="btn btn-secondary ms-2" style={{fontSize:"90%"}}><strong>Add to Wishlist</strong></button>
                        </div> */}
                    </div>
                </div>
            </div>
            <hr />
            {
                isBooksLoading && <Loader message="Loading Books..."/>
            }
        </div>
    );    
}    
export default BookTile



