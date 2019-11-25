import React from "react";
import TopNavigation from '../topNavigation'
import { MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardHeader,MDBBtn,MDBInput } from "mdbreact";
import axios from 'axios';
import {Messages} from 'primereact/messages';
import {Dropdown} from 'primereact/dropdown';

class UpdateIndividualBook extends React.Component {
    id = '';
    state =
    {
      "ISBN": '',
      "author": '',
      "category": "",
      "imageLink": "",
      "isAvailable": "",
      "noofcopies": '',
      "title": ""
    }
        componentDidMount()
        {
    
        this.id = this.props.match.params.bid;
    
         axios.get("http://localhost:3000/data/" + this.id).then(res =>
            {
                    this.setState(
                                {
                                    "ISBN": res.data.ISBN,
                                    "author": res.data.author,
                                    "category": res.data.category,
                                    "imageLink": res.data.imageLink,
                                    "isAvailable": res.data.isAvailable,
                                    "noofcopies": res.data.noofcopies,
                                    "title": res.data.title
                                    
                                } );
                    })
    }
       
onCategoryChange = (e) =>
        {
            this.setState({
              category : e.target.value
            })
        }
handleTitle = (e) =>
{
    this.setState(
        {
          title : e.target.value
        }
    )
}
handleAuthor = (e) =>
{
    this.setState(
        {
          author : e.target.value
        }
    )
}
handleLink = (e) =>
{
    this.setState(
        {
          imageLink : e.target.value
        }
    )
}
handleCopies = (e) =>
{
    this.setState(
        {
          noofcopies : e.target.value
        }
    )
}
check = async () =>
{
    await axios.put("http://localhost:3000/data/" + this.id,
    {
      "ISBN" :this.state.ISBN,
      "author":this.state.author,
     "category":this.state.category.name,
      "imageLink":this.state.imageLink,
     "isAvailable":this.state.isAvailable,
     "noofcopies" : this.state.noofcopies,
     "title":this.state.title
    }
    ).then(res =>
    {
     
    })
    this.messages.show({severity: 'success', detail: 'Book Updated Successfully'});
    setTimeout(() => {
      this.props.history.push("/admin")
  }, 1500);
    
}
    render()
    {
        const category = [
            {name: 'Technology'},
            {name: 'Business'},
            {name: 'Fiction'},
            {name: 'Management'},
            {name: 'Non Fiction'}
        ];
        return(
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
                     Update Book Details:
                    </h3>
                  </MDBCardHeader>
                  <form>
                    <div className="grey-text">
                      <MDBInput label="ISBN" value = {this.state.ISBN}/>
                      <MDBInput label="Enter Book Title" value = {this.state.title} onChange = {this.handleTitle} />
                      <MDBInput label="Enter Author Name" value = {this.state.author} onChange = {this.handleAuthor} />
                      <div className="content-section implementation">
                      <Dropdown value={this.state.category} options={category}  onChange={this.onCategoryChange} placeholder="Select a Category" optionLabel="name"/>                  
                      </div>
                        <MDBInput label= "Add ImageLink" value = {this.state.imageLink} onChange = {this.handleLink} />
                      <MDBInput label= "Change No oF Copies Available" type = "number" value = {this.state.noofcopies} onChange = {this.handleCopies} />
                    
                      
                    </div>
    
                  <div className="text-center mt-4">
             <MDBBtn
                      color="light-blue"
                      className="mb-3"
      
                      onClick = {this.check}
                    >
                      Update Book
                    </MDBBtn>
                 
                  </div>
                  </form>
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
export default UpdateIndividualBook