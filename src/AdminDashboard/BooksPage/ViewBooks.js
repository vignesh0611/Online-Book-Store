import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import { useDispatch, useSelector, } from 'react-redux'
import { deleteBook } from "../../store/BooksSlice"
function ViewBooks({ setShow, setUpdateIndex }){
    const {books}=useSelector(state=>state.book)
    let dispatch = useDispatch()
    return(
        <div>
            <h5 className="mt-5 text-center text-danger">Books-View/Edit/Delete</h5>
            <div className="table-responsive">
                {/* to display book details in table */}
                <table className="table table-bordered w-50" style={{width:"50%",fontSize:"80%"}}>
                    <thead>
                        <tr>
                            <th>Book Image</th>
                            <th>Book Title</th>
                            <th>Category</th>
                            <th>Discount</th>
                            <th>Release Date</th>
                            <th>Height</th>
                            <th>Width</th>
                            <th>Language</th>
                            <th>Tag</th>
                            <th>ISBN</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Weight</th>
                            <th>Pages</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book,index)=>{
                                return(
                                    <tr>
                                        <td><img src={book.bookImage} alt="" width="100%" /></td>
                                        <td>{book.bookTitle}</td>
                                        <td>{book.category}</td>
                                        <td>{book.discount}</td>
                                        <td>{book.releaseDate}</td>
                                        <td>{book.height}</td>
                                        <td>{book.width}</td>
                                        <td>{book.language}</td>
                                        <td>{book.tag}</td>
                                        <td>{book.isbn}</td>
                                        <td>{book.author}</td>
                                        <td>{book.publisher}</td>
                                        <td>{book.price}</td>
                                        <td>{book.rating}</td>
                                        <td>{book.weight}</td>
                                        <td>{book.pages}</td>
                                        <td>
                                            {/* edit btn */}
                                            <span className="ms-2 text-secondary cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FaEdit/></span>
                                            {/* delete btn */}
                                            <span className="ms-2 text-danger cursor-pointer" onClick={() => dispatch(deleteBook({ book, index }))}><MdDelete/></span>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default ViewBooks