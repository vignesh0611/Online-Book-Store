import React from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"
import Category from "../home page components/SelectByCategory"
import BookTile from "./BooksDisplayByCategory"
import OffCanvas from "../category/OffCancas"
function Categorypage(){
    const {category} = useParams()
    const {books}=useSelector(state=>state.book)
    return(
        // filter book based on category
        <div className="container-fluid">
            <div className="d-none d-lg-block">
                <div className="row mt-2 ">
                    <div className="col-3 ">
                        <Category/>
                    </div>
                    <div className="col-9">
                        <div className="border-start mt-2 mb-2 ps-2">
                            <h3 className="mt-2">{category} Books</h3>
                                <div className="mt-2">{books.filter(books=>books.category === category).length} results found</div>
                                <hr />
                                    {
                                        books.filter(books=>books.category === category).map(books =>(<BookTile books={books}/>))
                                    }
                        </div>
                    </div>
                </div>
            </div>    
            <div className="d-block d-lg-none">
            <div className="mt-2 mb-2 ps-2">
                <OffCanvas/>
                <h3 className="mt-2">{category} Books</h3>
                <div className="mt-2">{books.filter(books=>books.category === category).length} results found</div>
                <hr />
                    {
                        books.filter(books=>books.category === category).map(books =>(<BookTile books={books}/>))
                    }               
                 </div>
            </div>
        </div>
    )
}
export default Categorypage