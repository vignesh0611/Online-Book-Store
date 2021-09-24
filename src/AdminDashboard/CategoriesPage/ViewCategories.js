import {MdDelete} from 'react-icons/md'
import {FaEdit} from 'react-icons/fa'
import { useEffect } from "react"
import { useDispatch, useSelector, } from 'react-redux'
import { getCategories, deleteCategory } from "../../store/CategorySlice"
import Loader from '../../AdditionalComponents/Loader'
function ViewCategories({ setShow, setUpdateIndex }){
    //console.log(categories);
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())
    },[])
    let {categories, isCategoryLoading}=useSelector(state=>state.category)
    return(
        <div>
            {/* view category */}
            <table className="text-center table-bordered w-100">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Category</th>
                        <th>Option</th>
                        {/* {console.log("category",categories)} */}
                    </tr>
                </thead>
                <tbody>
                    {
                        categories.map((category,index)=>{
                            return(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{category.category}</td>
                                    <td>
                                        {/* edit btn */}
                                        <span className="text-secondary cursor-pointer" onClick={() => { setShow(true); setUpdateIndex(index) }}><FaEdit/></span>
                                        {/* delete btn */}
                                        <span className="ms-2 text-danger cursor-pointer" onClick={() => dispatch(deleteCategory({ category, index }))}><MdDelete/></span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        isCategoryLoading && 
                        <tr className="text-center"><td><Loader message="Loading...."/></td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
export default ViewCategories