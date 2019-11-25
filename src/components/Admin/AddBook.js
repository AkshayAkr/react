import React from "react";
import TopNavigation from '../topNavigation'
import { MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardHeader,MDBBtn } from "mdbreact";
import axios from 'axios';
import {Messages} from 'primereact/messages'
import { FormBuilder,FieldGroup,FieldControl,Validators, } from "react-reactive-form";

const TextInput = ({ handler, touched, hasError, meta }) => (
  <div>
    <input placeholder={`Enter ${meta.label}`} {...handler()}/>
    <span>
        {touched
        && hasError("required")  
        && `${meta.label} is required`}
    </span>
  </div>  
)

const Categories = ({ handler }) => (
  <div >
    <div >
      <label>Category:</label>
    </div>
    <div>
      <div>
        <input {...handler("radio", "Technology")} />
        <label>Technology</label>
      </div>
      <div>
        <input {...handler("radio", "Business")} />
        <label>Business</label>
      </div>
      <div>
        <input {...handler("radio", "Fiction")} />
        <label>Fiction</label>
      </div>
      <div>
        <input {...handler("radio", "Management")} />
        <label>Management</label>
      </div>
      <div>
        <input {...handler("radio", "Non Fiction")} />
        <label>Non Fiction</label>
      </div>
    </div>
  </div>
);
class AddBook extends React.Component {

 

  BookForm = FormBuilder.group({
    ISBN: ["", Validators.required ],
    title: ["", Validators.required ],
    name: ["", Validators.required ],
    category: ["", Validators.required ],
    link: ["", Validators.required ],
    copies : ["" , Validators.required]
    });
handleReset=() => {
    this.BookForm.reset();
}
handleSubmit= async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3000/data" ,
    {
      "author": this.BookForm.value.name,
     "category": this.BookForm.value.category,
      "imageLink": this.BookForm.value.link,
     "isAvailable": "Yes",
     "noofcopies" : this.BookForm.value.copies,
     "title": this.BookForm.value.title
    }
    ).then(res =>
    {

    })
    this.messages.show({severity: 'success', detail: 'Book Added Successfully'});
   
    this.BookForm.reset();
    setTimeout(() => {
      this.props.history.push("/admin")
  }, 1500);
}

    render()
    {
        return(
            <div>
            <TopNavigation/>
        <Messages ref={(el) => this.messages = el} />
        <br/>
        <div>
        <MDBContainer >
          <MDBRow>
            <MDBCol md="6">
              <MDBCard>
                <MDBCardBody>
                  <MDBCardHeader className="form-header deep-blue-gradient rounded">
                    <h3 className="my-3">
                     Add Book Details:
                    </h3>
                  </MDBCardHeader>
                  <br/>
        <FieldGroup control = {this.BookForm} 
         render={({ invalid }) => (
                  <form onSubmit={this.handleSubmit}>
                     <div className="grey-text">
                    <FieldControl name="ISBN" render={TextInput} meta={{ label: "ISBN" }}/>
                    <FieldControl name="title" render={TextInput} meta={{ label: "title" }}/>
                    <FieldControl name="name" render={TextInput} meta={{ label: "name" }}/>
                    <FieldControl name="category" render={Categories} meta={{ label: "category" }}/>
                    <FieldControl name="link" render={TextInput} meta={{ label: "link" }}/>
                    <FieldControl name="copies" render={TextInput} meta={{ label: "copies" }}/>
                    </div>
                  <div className="text-center mt-4">
                  <MDBBtn
                     
                      onClick={this.handleReset}
                    >
                      Reset
                    </MDBBtn>
                    <MDBBtn
                      type="submit"
                      disabled={invalid}
                    >
                      Submit
                    </MDBBtn>
                 
                  </div>
         </form> )} /> 
            </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
                  </div>
               
       
        </div>
        )
    }
}
export default AddBook