import React from 'react';
import './StartPage.css'
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCard, MDBCardBody, MDBCardImage, MDBCardHeader, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
class StartPage extends React.Component {
    render()
    {
  return (
    <div className="bg">
    <br/>
    <MDBContainer>
      <MDBCardHeader><h1 style = {{paddingLeft : "30%"}}>Hi Welcome to My Library</h1></MDBCardHeader>
      <MDBCardTitle><h1 style = {{paddingLeft : "10%"}}>We Have Collection Of Books of Different Categories that you can add to your Cart</h1></MDBCardTitle>
    </MDBContainer>
    <MDBContainer>
      <MDBRow>
   <MDBCol size="4">
      <MDBCard style={{ width: "18rem" }}>
        <MDBCardImage className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG1Px2HpQqgF3au4vkfZjMEFiP0LPpWgZeVd0zhHMxA9Po8QbCrg" waves />
        <MDBCardBody>
          <MDBCardTitle>    Various Categories</MDBCardTitle>
          <MDBCardText>
            We have a collection of books of various Categories like Technology , Management , Fiction , Non-Fiction and Business 
            <br/>
            <br/>
            <br/>
            <br/>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol size="4">
      <MDBCard style={{ width: "18rem" }}>
        <MDBCardImage className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRneuR3lPPOM9pQV8ZuZNOlZoMdHubdQ_VyxHmDhsAAnat217EK" waves />
        <MDBCardBody>
          <MDBCardTitle>User Friendly</MDBCardTitle>
          <MDBCardText>
            We display the books as required by the user . Users can add books their cart at any time and return them at any time .
            They can renew books of their choice
            <br/>
            <br/>
            <br/>
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    <MDBCol size="4">
      <MDBCard style={{ width: "18rem" }}>
      <MDBCardImage className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOLTxFcQNKQexgmHLVbYC4IUL-pGLXIRNUn0fGjKIAwfxEVBaYhA" waves />
        <MDBCardBody>
          <MDBCardTitle>Ratings And Comments</MDBCardTitle>
          <MDBCardText>
            Users can rate and comment on the books that they have taken and these comments are displayed to all the users .
            This help in making the right choice for the Users 
          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
    </MDBRow>
    
    </MDBContainer>
    <br/>
    <br/>
    <MDBContainer>
    <MDBCard>
    <Link to = "/disp"><MDBCardHeader><h1 style = {{paddingLeft : "30%"}}>Click Here To Explore</h1> </MDBCardHeader></Link>
    </MDBCard>
    </MDBContainer>
  </div>
  )
}
}
export default StartPage;