import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { getBooks } from "../store/BooksSlice"
function Books(){
    let {books}=useSelector(state=>state.book)
    let dispatch = useDispatch()
    useEffect(()=>{
        if(books.length<=0){
            dispatch(getBooks())
        }
    },[])
    const history=useHistory()  
    const count=0;  
    return(
        <div className="mt-2">
            <div className="border-top" style={{fontSize:"120%"}}>Best Selling</div>
            <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6" >
                {
                    books.filter(books=>books.tag === "Best selling").slice(0,6).map((pro,index)=>{
                        return(
                            <div className="cols" key={index}>
                                <button className ="btn" onClick={()=>history.push({ pathname: `/book/${pro._id}`})}>
                                    <div className="card mb-4 border-0">
                                        <div >
                                            {
                                            pro.discount>0?
                                            <div style={{position:"relative"}}>
                                                <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{pro.discount}%</div>
                                                <img src={pro.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                                            </div>:
                                                <img src={pro.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                                            }
                                        </div>
                                        <div className="text-center">
                                            <div className="justify-content-center d-flex">
                                                {
                                                    pro.discount>0?
                                                    <><h6 className="mb-0 pb-0 text-decoration-line-through" style={{paddingTop:"4px"}}><strong>₹</strong>{pro.price}</h6>
                                                    <h5 className="text-danger"> <strong>₹</strong>{Math.round((pro.price)-((pro.price)*(pro.discount/100)))}</h5></>:
                                                    <h5 className="mb-0 pb-0 text-danger" style={{marginBottom:"4px"}}><strong>₹</strong>{pro.price}</h5>
                                                }
                                            </div>
                                            <p className="mt-0 pt-0 mb-0 pb-0"><strong>{pro.bookTitle}</strong></p>
                                            <p className="mt-0 pt-0 mb-0 pb-0" style={{fontStyle:"italic"}}>{pro.author}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            
                            )
                        })
                    }
                    <br />
                    </div>
                    <div className="border-top" style={{fontSize:"120%"}}>New Arrivals</div>
                    <div className="row row-cols-2 row-cols-sm-4 row-cols-md-6 row-cols-lg-6" >
                    {
                    books.filter(books=>books.tag === "New arrivals").slice(0,6).map((pro,index)=>{
                        return(
                            <div className="cols" key={index}>
                                <button className ="btn" onClick={()=>history.push({ pathname: `/book/${pro._id}`})}>
                                    <div className="card mb-4 border-0">
                                        <div >
                                            {pro.discount>0?
                                            <div style={{position:"relative"}}>
                                                <div className="text-white rounded-circle p-1" style={{position:"absolute",right:"0%",backgroundColor:"red",margin:"-5%"}}>{pro.discount}%</div>
                                                <img src={pro.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                                            </div>:
                                                <img src={pro.bookImage} alt="" height="150px" width="100px" className="mx-auto"/>
                                            }
                                        </div>
                                        <div className="text-center">
                                            <div className="justify-content-center d-flex">
                                                {pro.discount>0?
                                                <><h6 className="mb-0 pb-0 text-decoration-line-through" style={{paddingTop:"4px"}}><strong>₹</strong>{pro.price}</h6>
                                                <h5 className="text-danger"> <strong>₹</strong>{Math.round((pro.price)-((pro.price)*(pro.discount/100)))}</h5></>:
                                                <h5 className="mb-0 pb-0 text-danger" style={{marginBottom:"4px"}}><strong>₹</strong>{pro.price}</h5>
                                                }
                                            </div>
                                            <p className="mt-0 pt-0 mb-0 pb-0"><strong>{pro.bookTitle}</strong></p>
                                            <p className="mt-0 pt-0 mb-0 pb-0" style={{fontStyle:"italic"}}>{pro.author}</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                            
                            )
                        })
                    }
                    {/* {count=count+1} */}
            </div>
                {/* {console.log("count",count)} */}
        </div>
    )
}
export default Books