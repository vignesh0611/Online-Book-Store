import { useState } from 'react'
import AddCategory from "./AddCategory"
import ViewCategories from "./ViewCategories"
import CategoryEdit from "./CategoryEdit"
function MainCategoryPage(){
    const [show, setShow] = useState(false);
    const [updateIndex, setUpdateIndex] = useState(-1);
    return(
        <div>
            <h5 className="text-center">Categories</h5>
            <div className="row mt-4">
                {/* to display add category */}
                <div className="col-md-6">
                    <h6>Add New Category</h6>
                    <AddCategory />
                </div>
                {/* to display view category */}
                <div className="col-md-6">
                   <h6>View Category</h6>
                   <ViewCategories setShow={setShow} setUpdateIndex={setUpdateIndex} />
                </div>
                {/* category edit modal */}
                <CategoryEdit show={show} setShow={setShow} updateIndex={updateIndex} setUpdateIndex={setUpdateIndex} />
            </div>
        </div>
    )
}
export default MainCategoryPage