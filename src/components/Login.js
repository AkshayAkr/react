import React, { Component } from 'react';
import { MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBModalFooter,MDBIcon,MDBCardHeader,MDBBtn,MDBInput } from "mdbreact";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {Messages} from 'primereact/messages';
import TopNavigation from './topNavigation'

class Login extends Component {
  p=[]
  name = ''
  email = ''
  password = ''
  
  showSuccess = () => {
    var d = localStorage.getItem("userid");
     this.messages.show({ severity: 'success', detail: 'Welcome' });
     // eslint-disable-next-line
     if( d == 1)
     {
      this.props.history.push("/admin")
     }
     else
      this.props.history.push("/disp")     
  }
  showError = () => {
    this.messages.show({ life : 2000,severity: 'error', detail: 'Invalid UserName or Password .Try Again'});
       
  }
  check =  () =>
  {
    // eslint-disable-next-line
    this.p.map(data=>
      {
        if(data.email === this.email)
        {
          if(data.password === this.password)
          {
            localStorage.setItem("userid" , data.id)
            localStorage.setItem("logins", "Yes")
            this.showSuccess();
          }
        }
        },
      this.showError()
      )

   

  }
  componentDidMount()
  {
    axios.get("http://localhost:3000/user").then(res =>
    {
            this.p = res.data;
    }
        );
  }
  handleEmail = (e) =>
  {
    this.email =  e.target.value;
  
  }
  handlepass = (e) =>
  {
    this.password = e.target.value;
   
  }
    render() {
      return (
        <div>
        <TopNavigation/>
        <Messages ref={(el) => this.messages = el} />
        <br/>
        <div onSubmit ={this.check}>
        <MDBContainer >
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                      <MDBIcon icon="lock" /> Login:
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput
                        label="Type your email"
                        icon="envelope"
                        group
                        type="email"
                        onChange = { this.handleEmail}
                        validate
                        error="wrong"
                        success="right"
                      />
                      <MDBInput
                        label="Type your password"
                        icon="lock"
                        group
                        type="password"
                        onChange = { this.handlepass}
                        validate
                      />
                    </div>
    
                  <div className="text-center mt-4">
             <MDBBtn
                      color="light-blue"
                      className="mb-3"
      
                      onClick = {this.check}
                    >
                      Login
                    </MDBBtn>
                 
                  </div>
                  </form>
                  <MDBModalFooter>
                    <div className="font-weight-light">
                    
                     <Link to = '/SignUp'> <p>Not a member? Sign Up</p></Link>
                   
                    </div>
                  </MDBModalFooter>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        </div>
        </div>
      );
    }
}


export default Login
