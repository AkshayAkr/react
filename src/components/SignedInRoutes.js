import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import DisplayIndividualBook from "./pages/DisplayIndividualBook";
import DisplayBooks from "./pages/DisplayBooks";
import MyBooks from "./MyBooks";
import LogOut from "./LogOut";
import StartPage from "./pages/StartPage";
import ReturnBook from './pages/ReturnBook'
import Profile from './pages/Profile'
import AdminDashBoard from './Admin/AdminDashBoard'
import AddBook from './Admin/AddBook'
import UpdateBook from './Admin/UpdateBook'
import UpdateIndividualBook from './Admin/UpdateIndividualBook'
import DisplayUserBooks from './Admin/DisplayUserBooks'

class SignedInRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path = "/" component = {StartPage}/>
        <Route exact path="/disp" component={DisplayBooks} />
        <Route path="/book/:book_id" component={DisplayIndividualBook} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/SignUp" component={SignUp} />
        <Route path="/MyBooks" component={MyBooks} />
        <Route path="/logout" component={LogOut} />
        <Route path = "/mybook/:bookid" component ={ReturnBook}/>
        <Route path = "/admin" component = {AdminDashBoard}/>
        <Route path = "/addbook" component = {AddBook}/>
        <Route path = "/updatebook" component = {UpdateBook}/>
        <Route path = "/update/:bid" component = {UpdateIndividualBook}/>
        <Route path = "/userbooks" component = {DisplayUserBooks}/>
        <Route  path="**" component={StartPage} />
      </Switch>
    );
  }
}
export default SignedInRoutes;
