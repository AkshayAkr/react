import React from "react";
import TopNavigation from '../topNavigation'
import { MDBContainer, MDBRow } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';
import logo from '../../assets/naruto.jpg'
import axios from 'axios';

class DisplayUserBooks extends React.Component {
    state =  {
        a : [],
        c: []
       
    }
outputdata = '';
 output = [];
    componentDidMount()
    {
        axios.get("http://localhost:3000/user/").then(res =>
        {
            this.r = res.data;
            this.setState(
                {
                    c: res.data
                    
                } );
        });
        axios.get("http://localhost:3000/data").then(res =>
                        {
                                this.setState(
                                            {
                                                a :res.data
                                            } );
                                }
                                )
    }
    sortByTitle = () =>
    {
        this.output.sort(function(a, b){
            var x  = a.Title.toLowerCase();
            var y  = b.Title.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        this.setState(
            {
               ...this.state
            }
        )
    }
    sortByAuthor = () =>
    {
        this.output.sort(function(a, b){
            var x  = a.Author.toLowerCase();
            var y  = b.Author.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });
        this.setState(
            {
               ...this.state
            }
        )
    }
    sortByUserName = () =>
    {
        this.output.sort(function(a, b){
            var x  = a.UserName.toLowerCase();
            var y  = b.UserName.toLowerCase();
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
        });   
        this.setState(
            {
               ...this.state
            }
        )
    }
    sortByIssuedDate = () =>
    {
        this.output.sort(function(a, b){
            var p = a.IssDate.slice(5,7);
            var q = b.IssDate.slice(5,7);
            var x  = a.IssDate.slice(8,10);
            var y  = b.IssDate.slice(8,10);
            if(p===q)
            {
            if (x < y) {return -1;}
            if (x > y) {return 1;}
            return 0;
            }
            else if (p>q)
            {
                return 1;
            }
            else return -1;
        });   
        this.setState(
            {
               ...this.state
            }
        )
    }
    render()
    {
        // eslint-disable-next-line
     let outputdata =  this.output.length === 0 ? (
        this.state.a.map(
            // eslint-disable-next-line
            dat =>
            {
                // eslint-disable-next-line
                this.state.c.map(
                    // eslint-disable-next-line
                    data =>
                    {
                        // eslint-disable-next-line
                        data.bookid.map(out =>
                            {
                                // eslint-disable-next-line
                                if(dat.id == out.bid)
                        {
                            var dataoutput = {"Title" : "" , "Author" : "" , UserId : "" , "UserName" : "" , "IssDate" : "" , "imageLink"  : "" }
                                dataoutput.Title = dat.title;
                                dataoutput.Author = dat.author;
                                dataoutput.UserId = data.id;
                                dataoutput.UserName = data.name;
                                dataoutput.IssDate = out.startdate.slice(0,10);
                                dataoutput.imageLink = dat.imageLink;
                                this.output.push(dataoutput);
                
                        }
                         }
                        )
                      }
                )
             }
        )
       )
       :
       (<div></div>)
        var outpu =  this.output.length>=1 ? ( this.output.map(
            dat =>
            {
                return(
                    <div  key = {dat.id}>
                <MDBCol >
                <MDBCard style={{ width: "22rem" }}>
                <MDBCardBody>
                    <MDBCardTitle>Title: {dat.Title}</MDBCardTitle>
                    <MDBCardTitle>Author: {dat.Author}</MDBCardTitle>
                    <MDBCardTitle>User Id: {dat.UserId}</MDBCardTitle>
                    <MDBCardTitle>User Name: {dat.UserName}</MDBCardTitle>
                    <MDBCardTitle>Issued Date: {dat.IssDate}</MDBCardTitle>
                    <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                   
                    </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                </div>
                )
                        }
        )              
                           
               
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
            <br/>
            <div className="sidebar-fixed position-fixed">
      <div className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </div>
      <div  className="content-section implementation">
      
      <div className="p-grid" style={{width:'250px'}}>
                        <div className="p-col-12">
                    
                            <input type="checkbox"  onClick = {this.sortByTitle} /> Sort By Book Title<br></br>
                        </div>
                        <div className="p-col-12">
                    
                            <input type="checkbox"  onClick = {this.sortByUserName} /> Sort By User Name<br></br>
                        </div>
                        <div className="p-col-12">
                          
                        <input type="checkbox"  onClick = {this.sortByAuthor} /> Sort By Author<br></br>
                        </div>
                        <div className="p-col-12">
                          
                          <input type="checkbox"  onClick = {this.sortByIssuedDate} /> Sort By IssuedDate<br></br>
                          </div>
                    </div>
                   </div>
        </div>
        <br/>
        <br/>
        <MDBContainer size="5" style={{ heigth: "300px"  }}>
      
      <MDBRow  >
      
    
    {outpu}
     </MDBRow>
     </MDBContainer>
            </div>
        )
    }
}

export default DisplayUserBooks