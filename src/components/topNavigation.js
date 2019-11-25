import React, { Component } from 'react';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem  } from 'mdbreact';
import {Link} from 'react-router-dom'


class TopNavigation extends Component {
    isLoggedIn = "false";
    state = {
        collapse: false
    }
  
    
    onClick = () => {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    toggle = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
      var status = localStorage.getItem("logins");
      var userid  = localStorage.getItem("userid");
      if(status ==="Yes")
      {
      if (userid === "1") 
      {
          return(
        <div>
        <MDBNavbar className="flexible-navbar" light expand="md" scrolling > 
                <MDBNavbarBrand href="">
                    <strong>My Library</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem >
                           <Link to="/disp" className="nav-link Ripple-parent">Home</Link>
                        </MDBNavItem>
                      
                    </MDBNavbarNav>
                    
                    <MDBNavbarNav right>
                        
                       
                        <MDBNavItem>
                        <Link to="/admin" className="nav-link Ripple-parent">Admin DashBoard</Link>   
                        </MDBNavItem>
                        <MDBNavItem>
                        <Link to="/logout" className="nav-link Ripple-parent">Logout</Link>   
                        </MDBNavItem>
                       
                       
                        </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>

      </div>
          )
       } 
       else
       {
           return(
       <div>
            <MDBNavbar className="flexible-navbar" light expand="md" scrolling > 
                <MDBNavbarBrand href="">
                    <strong>My Library</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem >
                           <Link to="/disp" className="nav-link Ripple-parent">Home</Link>
                        </MDBNavItem>
                      
                    </MDBNavbarNav>
                    
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <Link to="/profile"  className="nav-link Ripple-parent">Profile</Link>   
                       
                        </MDBNavItem>
                       
                        <MDBNavItem>
                        <Link to="/MyBooks" className="nav-link Ripple-parent">MyBooks</Link>   
                        </MDBNavItem>
                        <MDBNavItem>
                        <Link to="/logout" className="nav-link Ripple-parent">Logout</Link>   
                        </MDBNavItem>
                       
                       
                        </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
       </div>
           )
       }
        }
        else
        {
             return(
                <MDBNavbar className="flexible-navbar" light expand="md" scrolling > 
                <MDBNavbarBrand href="">
                    <strong>My Library</strong>
                </MDBNavbarBrand>
                <MDBNavbarToggler onClick = { this.onClick } />
                <MDBCollapse isOpen = { this.state.collapse } navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem >
                           <Link to="/disp" className="nav-link Ripple-parent">Home</Link>
                        </MDBNavItem>
                      
                    </MDBNavbarNav>
                    
                    <MDBNavbarNav right>
                        <MDBNavItem>
                        <Link to="/login" className="nav-link Ripple-parent">Login/SignUp</Link>   
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
                
             )
            
        }
    }
}

  
  export default 
  TopNavigation;