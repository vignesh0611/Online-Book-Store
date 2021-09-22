import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Loader from "../../AdditionalComponents/Loader"
import {updateRole} from "../../store/UserSlice"
function UserManagement(){
    const { getUsers,isLoading } = useSelector(state=>state.user)
    const dispatch = useDispatch()
    // manage user status active/blocked
    const toggleStatus = ({ user, index }) => {
        const userEdited = { email: user.email, name: user.name }
        user.status === "active" ? userEdited.status = "blocked" : userEdited.status = "active"
        dispatch(updateRole({ user: userEdited, index }))
    }
    // manage user role user/admin
    const toggleRole = ({ user, index }) => {
        const userEdited = { email: user.email }
        user.role === "user" ? userEdited.role = "admin" : userEdited.role = "user"
        dispatch(updateRole({ user: userEdited, index }))
    }
    return(
        <div>
            <div className="container-fluid">
                <h5 className="mt-5 text-center text-danger">User Management</h5>
                <div className="table-responsive">
                    {/* user table */}
                    <table className="table table-bordered " style={{fontSize:"80%"}}>
                        <thead>
                            <tr className="text-center">
                                <th>S.no.</th>
                                <th>Name</th>
                                <th>E-Mail</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Addresses</th>
                                <th>Created At</th>
                                <th>Last Login</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                getUsers.map((user, index) => {
                                    return(
                                        <tr className="text-center" key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phno || "-"}</td>
                                            <td>{user.role}</td>
                                            <td>{user.address || "-"}</td>
                                            <td>{user.accountCreatedIn}</td>
                                            <td>{user.lastLogin}</td>
                                            <td>{user.status}</td>
                                            <td className="text-center">
                                                <span className="text-danger fw-bold cursor-pointer" onClick={() => toggleStatus({ user, index })}>{user.status === "active" ? "Block" : "Unblock"}</span>
                                                <span className="ms-3 text-danger fw-bold cursor-pointer" onClick={() => toggleRole({ user, index })}>{user.role === "user" ? "Make_Admin" : "Make_User"}</span>
                                            </td>
                                        </tr>
                                     )}
                            )}
                            {
                                isLoading?
                                    <tr className="text-center"><td colSpan="12"><Loader message="Loading Users..." /></td></tr>
                                    : !getUsers.length &&
                                    <tr className="text-center"><td colSpan="12">No Records Found</td></tr>
                            }                          
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default UserManagement 