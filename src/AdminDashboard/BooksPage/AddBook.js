import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addBook, updatebook } from '../../store/BooksSlice';
import DefaultImage from "../../images/bookImage.jpg"

const AddBook = ({ updateIndex, setUpdateIndex, setShow }) => {
    const {books,isSuccess}=useSelector(state=>state.book)
    const { categories } = useSelector(state => state.category)
    const [file,setFile] = useState(null)
    const dispatch = useDispatch()
    //console.log("isSuccess",isSuccess)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({
        defaultValues: { ...books[updateIndex],bookImage:"" }
    })
    const watchBookImage = watch("bookImage",[])
    const formSubmit = book => {
        const formData = new FormData()
        if (updateIndex >= 0) {
            if (book.bookImage) {
                formData.append("bookImage", book.bookImage[0], book.bookImage[0].name)
            }
            else{
                book.bookImage = books[updateIndex].bookImage
            }
            book = JSON.stringify(book)
            formData.append("books", book)
            dispatch(updatebook({ formData, index: updateIndex }))
            setUpdateIndex(-1)
            return setShow(false)
        }
        else{
                formData.append("bookImage", book.bookImage[0], book.bookImage[0].name)
            // book._id = userObj._id
            // book.cartemail = cartemail
            delete book.bookImage
            book = JSON.stringify(book)

            formData.append("books", book)

            dispatch(addBook(formData))
            //console.log(formData)
            //if (books.findIndex(book => book.bookTitle === book.bookTitle) < 0) {
                // dispatch(addBook(book))
            //}
        }
        //setFile(null);
        reset()
    }
    // const onFileSelect = (event) =>{
    //     setFile(event.target.files[0])
    // }

    return (
        <div className={updateIndex >= 0 ? "container-fluid " : "container-fluid mt-3"}> 
            {
                updateIndex<0 &&
                <h5 className="mb-3 text-center text-secondary">Add Book</h5>
            }
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="text-center">
                    {/* {
                        file? <img src={URL.createObjectURL(file)} className="border border-dark" width="200px" alt="" />
                                        // : userObj.profilePicture
                                        //     ?
                                        //     <img src={userObj.profilePicture} className="border border-dark" width="200px" alt="" />
                        :<img src={DefaultImage} className="border border-dark" width="200px" alt="" />
                    } */}<div className="form-group mb-3 align-items-center">
                            <label htmlFor="bookImage" className="cursor-pointer">
                                {
                                    watchBookImage.length !== 0 ?
                                        <span className="ms-5 mb-3 card p-1">
                                            <img src={URL.createObjectURL(watchBookImage[0])} width="100%" alt="" />
                                        </span>: updateIndex >=0 ?
                                                    <span className="ms-5 mb-3 card p-1">
                                                        <img src={books[updateIndex].bookImage} width="100%" alt="" />
                                                    </span>:
                                                        <span className="ms-5 mb-3 p-1">
                                                            <img src={DefaultImage} width="50%" className="border p-1" alt="" />
                                                        </span>
                                }

                            </label><br />
                            <label htmlFor="bookImage">
                                <div className="text-danger fw-bold cursor-pointer ms-5">
                                    Choose Book Image
                                </div>
                            </label>
                            {
                                updateIndex >=0?
                                    <input
                                    type="file" className="d-none" accept="image/*"
                                    id="bookImage" placeholder="#" name="bookImage"
                                    {...register("bookImage")} />:
                                        <input
                                            type="file" className="d-none" accept="image/*"
                                            id="bookImage" placeholder="#" name="bookImage"
                                            {...register("bookImage", { required: true })} />
                            }
                        </div>
                        {errors.bookImage?.type === "required" && <p className="text-danger mt-1">Book Image is required</p>}
                </div>
                {/* Book image
                <div className="row justify-content-center">
                    <div className="text-center mb-3">
                        <label htmlFor="bookImage" id="bookImageLabel" className="text-danger cursor-pointer fw-bold">Add Book Image</label>
                        {errors.bookImage?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category is required</p>}
                        
                        <input type="file" className="d-none form-control"
                            accept="image/*" name="bookImage"
                            id="bookImage" onChange={onFileSelect} />
                    </div>
                </div> */}
                {/* book Name */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="bookTitle"
                        {...register("bookTitle", { required: true })} />
                    {errors.bookTitle?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Book Name is required</p>}
                    <label for="floatingInput">Book Name</label>
                </div>
                {/* Category */}
                <div className="form-floating mb-3">
                    <select class="form-select" aria-label="Default select example" id="floatingInput" placeholder="#" name="category" {...register("category", { required: true })}>
                        <option disabled>-- Category --</option>
                        {
                            categories.map((category,index)=>{
                                return(
                                   <option value={category.category}>{category.category}</option>
                                )
                            })
                        }
                    </select>
                    {errors.category?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category is required</p>}
                    <label for="floatingInput">Category</label>
                </div>
                {/* Discount */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="discount"
                        {...register("discount", { required: true })} />
                    {errors.discount?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Discount is required</p>}
                    <label for="floatingInput">Discount(Number only(eg:10))</label>
                </div>
                {/* Release Date */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="releaseDate"
                        {...register("releaseDate", { required: true })} />
                    {errors.releaseDate?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Release Date is required</p>}
                    <label for="floatingInput">Release Date(eg:06 Nov 1998)</label>
                </div>
                {/* Height */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="height"
                        {...register("height", { required: true })} />
                    {errors.height?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Height is required</p>}
                    <label for="floatingInput">Height in mm(eg:134)</label>
                </div>
                {/* Width */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="width"
                        {...register("width", { required: true })} />
                    {errors.width?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Width is required</p>}
                    <label for="floatingInput">Width- in mm(eg:150)</label>
                </div>
                {/* Language */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="language"
                        {...register("language", { required: true })} />
                    {errors.language?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Language is required</p>}
                    <label for="floatingInput">Language</label>
                </div>
                {/* Tag */}
                <div className="form-floating mb-3">
                    <select class="form-select" aria-label="Default select example" id="floatingInput" placeholder="#" name="tag" {...register("tag", { required: true })}>
                        <option disabled>-- Tag --</option>
                        <option value="Best selling">Best Selling</option>
                        <option value="New arrivals">New Arrivals</option>
                    </select>
                    {errors.category?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Tag is required</p>}
                    <label for="floatingInput">Tag</label>
                </div>
                {/* ISBN */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="isbn"
                        {...register("isbn", { required: true })} />
                    {errors.isbn?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">ISBN is required</p>}
                    <label for="floatingInput">ISBN</label>
                </div>
                {/* Author */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="author"
                        {...register("author", { required: true })} />
                    {errors.author?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Author is required</p>}
                    <label for="floatingInput">Author</label>
                </div>
                {/* Publisher */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="publisher"
                        {...register("publisher", { required: true })} />
                    {errors.publisher?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Publisher is required</p>}
                    <label for="floatingInput">Publisher</label>
                </div>
                {/* Price */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="price"
                        {...register("price", { required: true })} />
                    {errors.price?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Price is required</p>}
                    <label for="floatingInput">Price (eg: 250)</label>
                </div>
                {/* Rating */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="rating"
                        {...register("rating", { required: true })} />
                    {errors.rating?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Rating is required</p>}
                    <label for="floatingInput">Rating(eg:4.7)</label>
                </div>
                {/* Description */}
                <div class="form-floating mb-3">
                    <textarea
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="description"
                        {...register("description", { required: true })} ></textarea>
                    {errors.description?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Description is required</p>}
                    <label for="floatingInput">Description</label>
                </div>
                {/* Weight */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="weight"
                        {...register("weight", { required: true })} />
                    {errors.weight?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Weight is required</p>}
                    <label for="floatingInput">Weight in gr(eg:350)</label>
                </div>
                {/* Pages */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="pages"
                        {...register("pages", { required: true })} />
                    {errors.pages?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Pages is required</p>}
                    <label for="floatingInput">Pages(eg:300)</label>
                </div>

                <div className="text-center mt-4 mb-5">
                    {
                        !updateIndex
                            ?
                            <>
                                <button className="btn btn-danger mt-3" type="submit">Add</button>
                                <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                            </>
                            :
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default AddBook;