import React from 'react';
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';
import TopNavigation from './topNavigation'
import { Link } from "react-router-dom";
import {Messages} from 'primereact/messages';
import { MDBContainer, MDBRow } from "mdbreact";

class MyBooks extends React.Component 
{
 
    p =[];
    r= [];
    idd ='';

    state =  {
        a : [],
        b: [],
        c: []
       
    }

     
    componentDidMount()
    {
       this.idd = localStorage.getItem("userid");
        axios.get("http://localhost:3000/user/" +this.idd).then(res =>
            {
                this.r = res.data;
                this.setState(
                    {
                        b : res.data.allBooks,
                        c: res.data
                        
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
        const outpu = this.state.b.length>=1 ? (this.state.a.map(
            dat =>
            {
                return(
                this.state.b.map(
                    // eslint-disable-next-line
                    data =>
                    {
                        // eslint-disable-next-line
                        if(data == dat.id)
                        {
                return(
                    <div  key = {dat.id}>
                <MDBCol >
                <MDBCard style={{ width: "22rem" }}>
                <Link to = {"/mybook/" + dat.id}>
                <MDBCardBody>
                    <MDBCardTitle>Title: {dat.title}</MDBCardTitle>
                     <MDBCardTitle>Author: {dat.author}</MDBCardTitle>
                    <MDBCardTitle>Category: {dat.category}</MDBCardTitle>
                    <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                    </MDBCardBody>
                    </Link>
                    </MDBCard>
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
                (
                    <div>
                    <br/>
                    <br/>
        <h1>No Books Taken Yet</h1>
      </div>
                )
           
            
            

        return(
            <div>
            <TopNavigation/>
           <Messages ref={(el) => this.messages = el} />
            <MDBContainer size="5" style={{ heigth: "300px"  }}>
      
      <MDBRow  >
      
    
    {outpu}
     </MDBRow>
     </MDBContainer>
         
            </div>
        )
    }
}
export default MyBooks