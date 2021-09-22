import React from "react"
const BooksDisplayBySelectingCategory=({books})=>{
    return(
        <div>
            <div className="card mb-3" style="max-width: 540px;">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={books.bookImage} class="img-fluid rounded-start" alt="books"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{books.bookTitle}</h5>
                            <p className="card-text">{books.author}</p>
                            <p className="card-text">{books.publisher}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BooksDisplayBySelectingCategory