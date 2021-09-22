
import Carousel from './carousel'
import Category from './SelectByCategory'
import Books from './Books'
import Loader from '../AdditionalComponents/Loader'
import { useSelector, } from 'react-redux'
function DisplayPage(){
    let {isBooksLoading}=useSelector(state=>state.book)
    return(
        <div className="container-fluid">
            <div className="d-none d-lg-block">
                <div className="row mt-2 ">
                    <div className="col-3 ">
                        <Category/>
                    </div>
                    <div className="border-start col-9">
                        <Carousel/>
                        <Books/>
                        <hr />
                    </div>
                </div>
            </div>
            <div className="d-block d-lg-none mt-2">
                <Carousel/>
                <Books/>
            </div>
            {
                isBooksLoading && <Loader message="Loading home page..."/>
            }
        </div>
    )
}
export default DisplayPage