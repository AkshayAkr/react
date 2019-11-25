import React from "react";
import axios from "axios";
import { MDBCard, MDBCol, MDBRow, MDBContainer, MDBCardImage, MDBCardBody, MDBCardTitle } from 'mdbreact';
import TopNavigation from '../topNavigation'
import src1 from '../../assets/naruto.jpg';

import { Link } from "react-router-dom";

class Profile extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            p : [],
            a:[],
            b :[],
            c : []
          }
    }
    idd = '';
    
componentDidMount()
{
    this.idd = localStorage.getItem("userid");
    axios.get("http://localhost:3000/user/" +this.idd).then(res =>
        {
            this.setState(
                {
                    p: res.data,
                    b :res.data.categories,
                    c : res.data.oldBookDetails
                    
                } );
        })

        axios.get("http://localhost:3000/data").then(res =>
        {
                                this.setState(
                                            {
                                                a :res.data
                                            } );
                                }
                                )
    }

render()
  {
    let dataout = this.state.b.map(data =>
        {
            return data + "\n"
        })
    const outpu = this.state.b.length >0 ? (
        this.state.a.map(dat =>
            {
               return(
                   // eslint-disable-next-line
                this.state.p.categories.map(out =>
                    {
                        if(dat.category === out)
                        {
                            return(
                                <div key={dat.id}>
                                <MDBCol key = {dat.id} >
                                      <MDBCard style={{ width: "20rem"}}>
                                      <Link to={"/book/" + dat.id}>
                                      <MDBCardBody>
                                      <MDBCardTitle>Title: {dat.title}</MDBCardTitle>
                                        <MDBCardTitle>Author: {dat.author}</MDBCardTitle>
                                        <MDBCardTitle>Category: {dat.category}</MDBCardTitle>
                                          <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                          
                                          </MDBCardBody>
                                      </Link>
                                      </MDBCard>
                                      <br/>
                                      </MDBCol>
                                      
                              </div>
                            )}
                        })
               )
                        }
                    )
                
               
    
    ) :
    (<div>
        <h2>No Books</h2>
        <br/>
        <br/>
        <br/>
    </div>)
     const profile = 
        <MDBRow className="justify-content-center">
        <MDBCol sm="12" md="6" lg="3" className="mb-5">
            <MDBCard>
                <MDBCardImage className="img-fluid" src={src1} />
                <MDBCardBody>
                  Favourite Categories:  {dataout}
                  <br/>
                </MDBCardBody>
                </MDBCard>
                </MDBCol>
                </MDBRow>

        const oldbook = this.state.c.length > 0 ?
        (
            this.state.a.map(dat =>
                {
                    return(
                        // eslint-disable-next-line
                    this.state.p.oldBookDetails.map(out =>
                        {
                            // eslint-disable-next-line
                                if(dat.id == out )
                                {
                                    return(
                                       <div  key = {dat.id}>
                                        <MDBCol >
                                        <MDBCard style={{ width: "20rem"}}>
                                        <MDBCol >
                                        <MDBCardBody>
                                        <MDBCardTitle>Title: {dat.title}</MDBCardTitle>
                                        <MDBCardTitle>Author: {dat.author}</MDBCardTitle>
                                        <MDBCardTitle>Category: {dat.category}</MDBCardTitle>
                                            <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                                            </MDBCardBody>
                                      
                                        </MDBCol>
                                        </MDBCard>
                                        <br/>
                                        </MDBCol>
                                        </div>
                                       
                                    )

                                }
                            
                        }
                    )
                    )
                    })
            
        ) 
        : 
        (<div>
        </div>
        )
  return (
    <div>
    <TopNavigation/>
    {profile}
    <MDBContainer size="4" style={{ heigth: "300px"  }}>
    <h1 style = {{paddingLeft : "30%"}}>Books Of the Liked Category</h1>
    <br/>
    <br/>
      <MDBRow  style={{ heigth: "300px" }}>
     {outpu}
     </MDBRow>
     </MDBContainer>
     <br/>
     <div>
     <MDBContainer >
     <h1 style = {{paddingLeft : "35%"}}>Books Taken</h1>
     <MDBRow  style={{ heigth: "300px" }}>
     <br/>
     <br/>
     <br/>
     {oldbook}
     </MDBRow>
     </MDBContainer>
     </div>
    
    
    
    
    
    </div>
  )
  }
}
export default Profile