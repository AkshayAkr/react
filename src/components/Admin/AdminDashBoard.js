import React from "react";
import TopNavigation from '../topNavigation'
import { Link } from "react-router-dom";

class AdminDashBoard extends React.Component {
    render()
    {
        return(
            <div>
            <TopNavigation/>
            <br/>
            <br/>
            
            <Link to = "/addbook"><button>Add a Book</button></Link>
            <br/>
            <br/>
            <Link to = "/updatebook"><button>Update/Delete a Book</button></Link>
            <br/>
            <br/>
            <Link to = "/userbooks"><button>Display All Books taken by users</button></Link>
            </div>
        )
    }
}
export default AdminDashBoard