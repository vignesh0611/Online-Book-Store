import { useSelector } from "react-redux";
import { useParams } from "react-router"
import BookDetailsPage from "./BooksDetailsPage";
function BookDetailsDescriptionPage(){
    const {bookId} = useParams();
    const {books}=useSelector(state=>state.book)
    return(
        <div className="container">
            {
                books.filter(books=>books._id === bookId).map(books =>(<BookDetailsPage books={books}/>))
            }
        </div>
    )
}

export default BookDetailsDescriptionPage