import { NavLink } from 'react-router-dom'
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getCategories } from "../store/CategorySlice"
function Category(){
    let dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCategories())
    },[])
    let {categories}=useSelector(state=>state.category)
    return(
        <div className="container-fluid">
            <h5>Select By Category</h5>
            {
                categories.map((category,index)=>{
                    return(
                        <div>
                            <NavLink className="categoryLink" to={`/${category.category}`}>{category.category} <br /></NavLink>
                        </div> 
                    )
                })
            }
        </div>
    )
}
export default Category