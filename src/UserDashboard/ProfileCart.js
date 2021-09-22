import UserSideBar from "./UserSideBar"
import Cart from "../cart/Cart"
//import ProfileCart from "./UserDashboard/ProfileCart"

function Profile(){
    //const {url,path} = useRouteMatch()

    return(
        <div>
            {/* <div className="row">
                <div className="col-md-2">
                    <UserSideBar/>
                </div>
                <div className="col-md-10"> */}
                    <Cart/>
                    {/* <Switch>
                    <Route path={`${path}/profilecart`}>
                        <ProfileCart/>
                    </Route>
                    </Switch> */}
                {/* </div>
            </div> */}
        </div>
    )
}
export default Profile