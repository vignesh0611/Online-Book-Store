import { NavLink } from "react-router-dom"

function AdminSideBar({url}){
    return(
        <>
            {/* admin side bar */}
            <button className="btn"><NavLink className="categoryLink" to={`${url}/adminprofile`}>Profile</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/addcategory`}>Add Category</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/addbook`}>Add Book</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/editbooks`}>View Books</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/usermanagement`}>Manage User</NavLink></button><br />
        </>
    )
}
export default AdminSideBar