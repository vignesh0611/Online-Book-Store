import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import BookTile from '../home page components/BooksDisplayByCategory';
import Category from '../home page components/SelectByCategory'
import { getBooks } from '../store/BooksSlice'
const useQuery = () => new URLSearchParams(useLocation().search)

const SearchPage = () => {
    const query = useQuery().get("query").toLowerCase()
    const { books } = useSelector(state => state.book)
    console.log("query:",books)
    const [filteredBooks, setFilteredBooks] = useState([]);
    let dispatch = useDispatch()
    useEffect(()=>{
        if(books.length<=0){
            dispatch(getBooks())
        }
    },[])
    // Books filtering based on search query
    useEffect(() => {
        if(books.length>0){
        setFilteredBooks(books.filter(book =>
            book.bookTitle.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.publisher.toLowerCase().includes(query) ||
            book.isbn.toString().includes(query)
        ))
    }
    }, [query]);
    console.log("filter",filteredBooks);
    return (
        <div className="container-fluid">
            <div className="d-none d-lg-block">
                <div className="row mt-2">
                    <div className="col-3">
                        <Category />
                    </div>
                    <div className="col-9">
                        <div className="border-start mt-2 mb-2 ps-2">
                            <h3 className="mt-2">Search Results for "{query}"</h3>
                            <div className="mt-2 mb-2">{filteredBooks.length} books found</div>
                            {
                                filteredBooks.map(books => (
                                    <BookTile books={books} />
                                ))
                            }
                            {
                                !filteredBooks.length &&
                                <div className="mt-5 fs-3">No result found...</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-block d-lg-none mt-2">
                <div className="display-5 mt-5">Search Results for "{query}"</div>
                    <div className="mt-3">{filteredBooks.length} books found</div>
                    {
                        filteredBooks.map(books => (
                            <BookTile books={books} />
                        ))
                    }
                    {
                        !filteredBooks.length &&
                        <div className="mt-5 fs-3">No result found...</div>                        }
            </div>
        </div>
    );
}

export default SearchPage;