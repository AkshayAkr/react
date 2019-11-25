import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBModalFooter , MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import {Link} from 'react-router-dom';
import axios from "axios";
import {Messages} from 'primereact/messages';
import TopNavigation from './topNavigation'
import {Checkbox} from 'primereact/checkbox';

class SignUp extends React.Component
 {
  nam = '';
  emal = '';
  passwod = '';
  p =[];
  b = [];
  d = 0; 
  state =
  {
    Categories: []
  }
  OnCategoryChange = (e) =>
  {
 let selectedCategories = [...this.state.Categories];
 if(e.checked)
     selectedCategories.push(e.value);
 else
     selectedCategories.splice(selectedCategories.indexOf(e.value), 1);
this.setState({Categories: selectedCategories});
}
  componentDidMount()
  {
    axios.get("http://localhost:3000/user").then(res =>
    {

            this.p = res.data;
    }
        );
  }
  handleName = (e) =>
  {
    this.nam  = e.target.value;
   
   
  }
  handleEmail = (e) =>
  {
    
    this.emal =  e.target.value;  
    
 
  
   
}
  handlepass = (e) =>
  {
    this.passwod = e.target.value;
    
    
  }

  handleSignIn = () =>
  {
    var e = 0;
    // eslint-disable-next-line
    this.p.map(data =>
      {
        if(data.email === this.emal)
        {
          e=1;
         this.messages.show({ life: 2000, severity: 'warn',  detail: 'Email id already exists Kindly login or try with different email id'});
         }
      });
      if(/[0-9!@#$%^&*()""'':;<>?/.,]/.test(this.nam))
      {
        e=1;
        this.messages.show({ life: 1000, severity: 'warn',  detail: 'Name Cannot have numbers or special characters'});   
      }
      if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test( this.emal))
  {
    e=1;
    this.messages.show({ life: 1000, severity: 'warn',  detail: 'Email Id not correct'}); 
 
  }
  if(this.passwod.length<8)
    {
      e=1;
      this.messages.show({ life: 1000, severity: 'warn',  detail: 'Password length should be minimum 8 characters'}); 
    }
      if(e===0)
      {
        axios.post("http://localhost:3000/user",
      {
        name : this.nam,
        email : this.emal,
        password : this.passwod,
        noofbooks : 0,
        bookid : [],
        allBooks :[],
        categories : this.state.Categories ,
        comments : [],
        oldBookDetails : []

    }).then(res =>
        {

    
        })
        this.messages.show({severity: 'success',  detail: 'Details saved sucessfully Redirecting to Login Page. Kindly login'});
        setTimeout(() => {
          this.props.history.push("/login")
      }, 1000);
      }
      
}
  render()
  {


  return (
    <div>
    <TopNavigation/>
    <Messages ref={(el) => this.messages = el} />
    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form >
                <p className="h4 text-center py-4">Sign up</p>
                <div className="grey-text">
                  <MDBInput
                    label="Your name"
                    icon="user"
                    onChange = { this.handleName}
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                type="email"
                validate
                error="wrong"
                success="right"
                onChange = { this.handleEmail}
                  />
                  <MDBInput
                    label="Your password"
                    type="password"
                    icon="lock"
                    onChange = { this.handlepass}
                   />
                </div>
                <div  className="content-section implementation">
      <div className="p-grid" style={{width:'250px'}}>
      <h5>Select Categories of your choice</h5>
                        <div className="p-col-12">
                            <Checkbox id="cb1" value="Technology" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Technology') !== -1}></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label">Technology</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox id="cb2" value="Business" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Business') !== -1}></Checkbox>
                            <label htmlFor="cb2" className="p-checkbox-label">Business</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox id="cb3" value="Fiction" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Fiction') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Fiction</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox id="cb3" value="Management" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Management') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Management</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox id="cb3" value="Non Fiction" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Non Fiction') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Non Fiction</label>
                        </div>
                    </div>
                   </div>
                <div className="text-center py-4 mt-3">
                 <MDBBtn color="cyan"  onClick = {this.handleSignIn} >
                    Register
                  </MDBBtn>
              
                  <MDBModalFooter>
                    <div className="font-weight-light">
                    <Link to = '/Login'> <p>Already A Member Sign In</p></Link>
                    </div>
                  </MDBModalFooter>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    </div>
  );
};
}
export default SignUp;