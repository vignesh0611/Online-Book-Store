import { useForm } from "react-hook-form"
import { useHistory } from "react-router"

function SearchNav(){
    let history = useHistory()
    const {register,handleSubmit} = useForm()
    const onSearchFormSubmit = searchField => {
        history.push(`/search?query=${searchField.searchQuery}`)
    }
    return(
        <div>
            <form className="d-flex" onSubmit={handleSubmit(onSearchFormSubmit)}>
                <input
                    className="form-control me-2"
                    type="search" name="searchQuery"
                    placeholder="Search Books..."
                    {...register("searchQuery", { required: true })} />
                <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
        </div>
    )
}
export default SearchNav