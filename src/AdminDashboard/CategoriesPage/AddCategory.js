import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addCategory, updateCategory } from '../../store/CategorySlice';
import Loader from '../../AdditionalComponents/Loader'
const AddCategory = ({ updateIndex, setUpdateIndex, setShow }) => {
    const { categories, isCategoryLoading } = useSelector(state => state.category)
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: { ...categories[updateIndex] }
    })
    const formSubmit = category => {
        // if category updated
        if (updateIndex >= 0) {
            dispatch(updateCategory({ category, index: updateIndex }))
            setUpdateIndex(-1)
            return setShow(false)
        }
        // if new category added
        if (categories.findIndex(cat => cat.category === category.category) < 0) {
            dispatch(addCategory(category))
        }
        reset()
    }
    return (
        <div>
            <form className={updateIndex >= 0 ? "mt-4 w-100" : "w-75 mt-4"} onSubmit={handleSubmit(formSubmit)}>
                {/* Category Name */}
                <div class="form-floating mb-3">
                    <input
                        type="text" class="form-control"
                        id="floatingInput" placeholder="#" name="category"
                        {...register("category", { required: true })} />
                    {errors.category?.type === "required" && <p className="alert alert-danger w-50 text-center mx-auto py-2 mt-2">Category Name is required</p>}
                    <label for="floatingInput">Category Name</label>
                </div>
                {
                    isCategoryLoading && <Loader message="Adding Category..."/>
                }
                <div className="text-center mt-4 mb-5">
                    {
                        !updateIndex?
                            // to add category
                            <>
                                <button className="btn btn-danger mt-3" type="submit">Add</button>
                                <button className="btn btn-secondary mt-3 ms-4" type="reset" onClick={() => reset()}>Reset</button>
                            </>
                            :
                            // to update category
                            <button className="btn btn-danger mt-3" type="submit">Update</button>
                    }
                </div>
            </form>
        </div>
    );
}

export default AddCategory;