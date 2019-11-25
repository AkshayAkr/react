import React from "react";
import TopNavigation from '../topNavigation'
import { MDBContainer,MDBRow, MDBCol,MDBCard,MDBCardBody,MDBCardText ,MDBCardImage,MDBCardTitle,MDBBtn } from "mdbreact";
import axios from 'axios';
import {Messages} from 'primereact/messages';

import { Link } from "react-router-dom";

class UpdateBook extends React.Component {
    s = [];
state =
{
    a : []
}
componentDidMount()
{
    axios.get("http://localhost:3000/data").then(res => {
        this.s = res.data;
        // eslint-disable-next-line
        this.s.map(data => {
         this.setState(
             {
                 a : [...this.state.a , data]
             }
         )
        });
      });
}

delete = (id) =>
{
    axios.delete("http://localhost:3000/data/" + id ).then(res => {
        
});
this.messages.show({severity: 'success',  detail: ' Successfully Deleted'});
setTimeout(() => {
    window.location.reload()
}, 1000);

}
    render()
    {
        const outpu =
        this.state.a.map(
            dat =>
            {
                return(
                    <div  key = {dat.id}>
                <MDBCol >
                <MDBCard style={{ width: "20rem"}}>
                <MDBCardBody>
                    <MDBCardTitle> {dat.title}</MDBCardTitle>
                    <MDBCardTitle> {dat.category}</MDBCardTitle>
                    <MDBCardText>{dat.author} </MDBCardText>
                    <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                    </MDBCardBody>
                <Link to = {"/update/" + dat.id}> <MDBBtn style = {{ marginLeft  : "90px"}}>Update</MDBBtn></Link>
                    <MDBBtn onClick = {() => {this.delete(dat.id)}} >Delete</MDBBtn>
                    </MDBCard>
                </MDBCol>
                </div>
                )
            }
    )
        return(
            <div>
            <TopNavigation/>
            
           <Messages ref={(el) => this.messages = el} />
            <MDBContainer size="4" style={{ heigth: "300px"  }}>
      
      <MDBRow  style={{ heigth: "300px" }}>
      {outpu}
     
    
     </MDBRow>
     </MDBContainer>
            </div>
        )
    }

}

export default UpdateBook;