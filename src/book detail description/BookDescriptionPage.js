import { useSelector } from "react-redux";
import { useParams } from "react-router"
import BookDetailsPage from "./BooksDetailsPage";
function BookDetailsDescriptionPage(){
    const {bookId} = useParams();
    const {books}=useSelector(state=>state.book)
    return(
        <div className="container-fluid">
            {/* to get book by filtering using Id */}
            {
                books.filter(books=>books._id === bookId).map(books =>(<BookDetailsPage books={books}/>))
            }
        </div>
    )
}

export default BookDetailsDescriptionPage