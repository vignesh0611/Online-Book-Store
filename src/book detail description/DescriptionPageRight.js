import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import DescriptionPageRight1 from "./DescriptionPageRight1";
function DescriptionPageRight({recentlyViewed}){
    // console.log("rescent",recentlyViewed)
    const { bookId } = useParams()
    const [similarBooks, setSimilarBooks] = useState([]);
    const { books } = useSelector(state => state.book)
    // to fin similar book in filtering method
    useEffect(() => {
        const currentBook = books.find(books => books._id === bookId)
        setSimilarBooks(books.filter(books => (
            books.category === currentBook.category &&
            books._id !== bookId
        )).slice(0, 2))
    }, [bookId]);
    return(
        <div>
            {/* to get similar books */}
            <div className="border-bottom">
                <DescriptionPageRight1 title="Similar Books" books={similarBooks} />
            </div>
            <DescriptionPageRight1 title="Recently Viewed Books" books={recentlyViewed.slice(0,2)}/>
        </div>
    )
}
export default DescriptionPageRight