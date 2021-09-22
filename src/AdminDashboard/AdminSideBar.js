import { NavLink } from "react-router-dom"

function AdminSideBar({url}){
    return(
        <>
            <button className="btn"><NavLink className="categoryLink" to={`${url}/adminprofile`}>Profile</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/addcategory`}>Add Category</NavLink></button><br />
            {/* <button className="btn"><NavLink className="footerLink" to="/profile">Edit Category</NavLink></button><br /> */}
            <button className="btn"><NavLink className="categoryLink" to={`${url}/addbook`}>Add Book</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/editbooks`}>Edit Books</NavLink></button><br />
            <button className="btn"><NavLink className="categoryLink" to={`${url}/usermanagement`}>Manage User</NavLink></button><br />
        </>
    )
}
export default AdminSideBar