import { useHistory } from "react-router"
const DescriptionPageRight2=({book})=>{
    let history = useHistory()
    return(
        <div className="cols">
            <button className ="btn" onClick={()=>history.push({ pathname: `/book/${book._id}`})}>
                <div className="card mb-4 border-0">
                    <div >
                        {
                            book.discount>0?
                                <div style={{position:"relative"}}>
                                    <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{book.discount}%</div>
                                        <img src={book.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                                    </div>:
                                    <img src={book.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                        }
                    </div>
                    {/* <img src={book.bookImage} alt="" height="100%" width="100%" className="mx-auto"/> */}
                    <div className="text-center">
                        {/* <div className="d-flex justify-content-center">
                            <h6 className="mb-0 pb-0 text-decoration-line-through"><strong>₹</strong>{book.price}</h6>
                            <h6 className="text-danger"><strong>₹</strong>{(book.price)-((book.price)*(book.discount/100))}</h6>
                        </div> */}
                        <div className="justify-content-center d-flex">
                            {
                                book.discount>0?
                                <>
                                    <h6 className="mb-0 pb-0 text-decoration-line-through" style={{paddingTop:"4px"}}><strong>₹</strong>{book.price}</h6>
                                    <h5 className="text-danger"> <strong>₹</strong>{Math.round((book.price)-((book.price)*(book.discount/100)))}</h5>
                                </>:
                                <h5 className="mb-0 pb-0 text-danger" style={{marginBottom:"4px"}}><strong>₹</strong>{book.price}</h5>
                            }
                        </div>
                        <p className="mt-0 pt-0 mb-0 pb-0"><strong>{book.bookTitle}</strong></p>
                        <p className="mt-0 pt-0 mb-0 pb-0" style={{fontStyle:"italic"}}>{book.author}</p>
                    </div>
                </div>
            </button>
        </div>
    )
}
export default DescriptionPageRight2