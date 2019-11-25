import React from 'react';
import {  MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact';
import axios from "axios";

class UserComments extends React.Component 
{

    p = [];
    state = {
        a : []
    }
    componentDidMount() {
          axios.get("http://localhost:3000/user").then(res =>{
                    this.setState(
                        {
                            a : res.data
                        }
                    )        
    });
   
          
         
        
      }
    
    render()
    {
        const comments = this.state.a.map(data =>
            {
                return(
                    data.comments.map(out =>
                        {
                               if(out.bookid === this.props.bid)
                               {
                                   return(
                                       <div key = {data.id}>
                                       <MDBCard style={{ width: "50rem"}}>
                                           <MDBCardTitle style={{paddingLeft : "30%" }}>User Comments And Ratings</MDBCardTitle>
                                           <MDBCardBody><h3>User Name : {data.name}</h3></MDBCardBody>
                                           <MDBCardBody><h3>Comments : {out.comments}</h3></MDBCardBody>
                                           <MDBCardBody><h3>Ratings Given : {out.rating}</h3></MDBCardBody> 
                                       </MDBCard>
                                       <br/>
                                       </div>
                                       )
                               }
                               else
                               {
                                   return(
                                   <div>

                                   </div>
                                   )
                               }
                               
                            }
                            
                           )
                           
                )
                })
                
        return(
            <div>
            <br/>
            <br/>
           {comments}
           
       </div>
        )
    }
}

export default UserComments