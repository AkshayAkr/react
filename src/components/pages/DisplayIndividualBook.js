import React from 'react';
import {connect} from 'react-redux';
import { MDBContainer, MDBRow } from "mdbreact";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCol } from 'mdbreact';
import axios from 'axios';
import {Messages} from 'primereact/messages';
import TopNavigation from '../topNavigation';
import UserComments from './UserComments'


class DisplayIndividualBook extends React.Component 
{
    p = [];
    u =[];
    k ={"bid": "",
    "startdate": "",
    "enddate": ""};
    id = ''
    r = []
    categ = ''
    state =  {
        a : []
       
    }
    componentDidMount()
    {

    this.id = this.props.match.params.book_id;
     axios.get("http://localhost:3000/data/" + this.id).then(res =>
        {
            this.r = res.data;
                this.setState(
                            {
                                a :[...this.state.a, res.data],
                                
                            } );
                })

               
    }
   show = async () =>
   {
    
        var bid = localStorage.getItem("userid");
       await axios.get("http://localhost:3000/user/" + bid).then(res =>
            {
                    this.p = res.data;
            }
                );
                this.check(this.p , bid);
   }
   check = (p , bid) =>
   {
    
    if(p.noofbooks ===2)
    {
        this.messages.show({severity: 'error', detail: 'Cannot added the book as your cart is full'});
   
    }
    else if(p.noofbooks ===1)
    {
        if(p.bookid.length >0)
           {
               // eslint-disable-next-line
               p.bookid.map(data =>
                {
                    if(data.bid === this.id)
                    {
                      
                         this.messages.show({severity: 'warn',  detail: 'Book already added to cart'});
                       
                    }
                    else{
                       let isAvailable = '';
                this.messages.show({severity: 'success',  detail: 'Successfully added to cart'});
                this.p.noofbooks += 1; 
                let sdate = new Date();
                let edate = new Date();
                edate.setDate(edate.getDate()+7);
                this.k.bid = this.id;
                this.k.startdate = sdate;
                this.k.enddate = edate;
                p.bookid.push(this.k);
                this.r.noofcopies -= 1;
                if(this.r.noofcopies === 0)
                {
                    isAvailable = "No"
                }
                else
                {
                    isAvailable = "Yes"
                }
                axios.put("http://localhost:3000/user/" +bid ,
                {
                    name:  p.name ,
                    email  :p.email,
                    password : p.password,
                    noofbooks : p.noofbooks,
                    bookid : p.bookid,
                    allBooks : [...p.allBooks , this.id],
                    oldBookDetails :  [...p.oldBookDetails , this.id],
                    categories : p.categories,
                    comments : p.comments
                    
                }).then(res =>
                    {
                        
                            
                    }
                        );
                        axios.put(
                            "http://localhost:3000/data/" + this.id  ,
                            {
                                "id": this.r.id,
                                "ISBN" : this.r.ISBN ,
                                 "author": this.r.author,
                                "category": this.r.category,
                                 "imageLink": this.r.imageLink,
                                "isAvailable": isAvailable,
                                "noofcopies" : this.r.noofcopies,
                                "title": this.r.title
                            }).then(res =>
                                {
                                       
                                }
                                    );
                                    
                                   
                                    
                }
                })
            
           }    
           }
           
    
    else{
        let isAvailable = '';
        this.messages.show({severity: 'success', detail: 'Successfully added to cart'});
        p.noofbooks += 1; 
        let sdate = new Date();
        let edate = new Date();
        edate.setDate(edate.getDate()+7);
        this.k.bid = this.id;
        this.k.startdate = sdate;
        this.k.enddate = edate;
        p.bookid.push(this.k);
        this.r.noofcopies -= 1;
                if(this.r.noofcopies === 0)
                {
                    isAvailable = "No"
                }
                else
                {
                    isAvailable = "Yes"
                }
        axios.put("http://localhost:3000/user/" + bid  ,
        {
            name:  p.name ,
            email  :p.email,
            password : p.password,
            noofbooks : p.noofbooks,
            bookid : p.bookid, 
            allBooks : [...p.allBooks , this.id],
            oldBookDetails :  [...p.oldBookDetails , this.id],
            categories : p.categories,
            comments : p.comments
        }).then(res =>
            {
                
            }
                );
                axios.put(
                    "http://localhost:3000/data/" + this.id  ,
                    {
                                "id": this.r.id,
                                "ISBN" : this.r.ISBN ,
                                 "author": this.r.author,
                                "category": this.r.category,
                                 "imageLink": this.r.imageLink,
                                "isAvailable": isAvailable,
                                "noofcopies" : this.r.noofcopies,
                                "title": this.r.title
                    }).then(res =>
                        {
                               
                        }
                            );
                            
                           
        }
   }
    showMessage =  () => {
        var status= localStorage.getItem("logins")
        if(status === "Yes")
        {
           this.show();
        }
       else
       {
        this.messages.show({severity: 'success', detail: 'Redirecting To Login Page. Kindly Login or SignUp'});
        setTimeout(() => {
            this.props.history.push("/login")
        }, 1000);
        
        }
       

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
               
                <MDBCardBody>
                    <MDBCardTitle>ISBN: {dat.ISBN}</MDBCardTitle>
                    <MDBCardTitle>Title: {dat.title}</MDBCardTitle>
                    <MDBCardTitle>Author: {dat.author}</MDBCardTitle>
                    <MDBCardTitle>Category: {dat.category}</MDBCardTitle>
                    <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                    </MDBCardBody>
              
                </MDBCol>
                </div>
                )
            }
    )
     return (
        <div>
        <div>
        <TopNavigation/>
        <br/>
        </div>
           <Messages ref={(el) => this.messages = el} />
           <MDBCard style={{ width: "30rem" }}>
           <MDBContainer size="4" >
      
      <MDBRow  style={{ heigth: "300px" }}>{outpu}
     
    
     </MDBRow>
     </MDBContainer>
     </MDBCard>
     <br/>
    <div>
    
    <MDBBtn onClick={this.showMessage} style = {{alignContent : "center"}} >Add To MyCart</MDBBtn>
    </div>
    <div>
    <UserComments bid = {this.id}/>
    </div>
    </div>
    )
}

}
const mapStateToProps = (state) =>
{
    return {
        data : state.dataReducer
    }
}
export default connect(mapStateToProps)(DisplayIndividualBook)