import React from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBCardTitle,MDBCol,MDBCard,MDBCardBody,MDBRow,MDBCardImage, MDBInput, MDBModalFooter } from 'mdbreact';
import {Messages} from 'primereact/messages';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import TopNavigation from '../topNavigation'
class ReturnBook extends React.Component {
    idd = '';
    rembid = '';
    bookid = '';
    review = '';
    r = [];
    userComments = {bookid : '' , comments : '' , rating : ''};
    state = {
      a : [],
      b: [],
      c: [],
      modal: false,
      rating :1
    }
      
      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
      
      onStarClick(nextValue) {
        this.setState({
            ...this.state,
            rating: nextValue});
      }
     
      componentDidMount()
    {
       this.idd = localStorage.getItem("userid");
        axios.get("http://localhost:3000/user/" +this.idd).then(res =>
            {
               this.setState(
                 {
                  b  : res.data.allBooks,
                  c :  res.data
                 }
               )
                        
                        
                    
            })
            this.bookid = this.props.match.params.bookid;
             axios.get("http://localhost:3000/data/" + this.bookid).then(res =>
                {
                    this.r = res.data;
                        this.setState(
                                    {
                                        a :[...this.state.a, res.data],
                                        
                                    } );
                        })
     }
     renew = async (id) =>
     {
          // eslint-disable-next-line
          this.state.c.bookid.map( data =>
         {
           // eslint-disable-next-line
            if(data.bid ==id)
            {
             let sdate = new Date();
             let edate = new Date();
             edate.setDate(edate.getDate()+7);
             data.startdate = sdate;
             data.enddate = edate;
            
             
            }
         })
            await axios.put("http://localhost:3000/user/" +this.idd ,
             {
                 name:  this.state.c.name ,
                 email  :this.state.c.email,
                 password : this.state.c.password,
                 noofbooks : this.state.c.noofbooks,
                 bookid : this.state.c.bookid,
                 allBooks : this.state.c.allBooks,
                 oldBookDetails :  this.state.c.oldBookDetails,
                 categories : this.state.c.categories,
                 comments : this.state.c.comments
                 
             }).then(res =>
                 {
                         this.messages.show({severity: 'success', summary: 'Success Message', detail: 'Renewed For 7 days from today'});
                         
                 }
                     );
                     setTimeout(() => {
                         window.location.reload()
                     }, 1000);
          
         
     }
    
    getEndDate = (id) =>
     {
         var  enddate = '';
         // eslint-disable-next-line
         this.state.c.bookid.map(data =>
             {
               // eslint-disable-next-line
                 if(data.bid == id)
                 {
                  enddate = data.enddate.slice(0,10)
                 }
             })
       
            return enddate
     }
        handleReview = (e) =>
        {
          this.review = e.target.value;
        }
     submitData = async (id) =>
     {
      this.toggle();
      for(var i =0 ;i<this.state.c.bookid.length;i++)
      {
        // eslint-disable-next-line
         if(this.state.c.bookid[i].bid == id)
        {
          this.state.c.bookid.splice(i,1);
          this.state.c.allBooks.splice(i,1);
        }
      }
        let isAvailable = '';
        this.userComments.bookid = this.bookid ;
        this.userComments.comments = this.review;
        this.userComments.rating = this.state.rating;
        
        this.state.c.comments.push(this.userComments);
        
        this.state.c.noofbooks -=1;
        this.r.noofcopies += 1;
        if(this.r.noofcopies >= 1)
        {
            isAvailable = "Yes"
        }
        else
        {
            isAvailable = "No"
        }
        await axios.put(
          "http://localhost:3000/data/" + this.bookid  ,
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
        await axios.put("http://localhost:3000/user/" +this.idd ,
        {
            name:  this.state.c.name ,
            email  :this.state.c.email,
            password : this.state.c.password,
            noofbooks : this.state.c.noofbooks,
            bookid : this.state.c.bookid,
            allBooks : this.state.c.allBooks,
            categories : this.state.c.categories,
            oldBookDetails :  this.state.c.oldBookDetails,
            comments :  this.state.c.comments
            
        }).then(res =>
            {
                    this.messages.show({severity: 'success', summary: 'Success Message', detail: 'Book Returned Successfully . Redirecting to MyBooks Page'});
                    
            }
                );
                setTimeout(() => {
                   this.props.history.push("/MyBooks")
                }, 3000);
              
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
                      if(dat.id == data)
                      {
              return(
                  <div  key = {dat.id}>
              <MDBCol >
              <MDBCard style={{ width: "22rem" }}>
              <MDBCardBody>
              <MDBCardTitle>Title: {dat.title}</MDBCardTitle>
                     <MDBCardTitle>Author: {dat.author}</MDBCardTitle>
                    <MDBCardTitle>Category: {dat.category}</MDBCardTitle>
                  <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
                  <MDBCardTitle>LastDate : {this.getEndDate(dat.id)} </MDBCardTitle>
                   <MDBCardTitle><MDBBtn onClick = {() => {this.renew(dat.id)}}>Renew</MDBBtn></MDBCardTitle>
                   <MDBBtn onClick={this.toggle}>Return</MDBBtn>
              <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <MDBModalHeader toggle={this.toggle}>Returning Book</MDBModalHeader>
                <MDBModalBody>
                <MDBCardTitle>Book Name: {dat.title}</MDBCardTitle>
                <form>
                <div className="grey-text">
                  <MDBInput
                    label="Write Review"
                    onChange = {this.handleReview} 
                  />
                  </div>
                </form>
                <MDBCardTitle>Please give rating</MDBCardTitle>
                <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={this.state.rating}
          onStarClick={this.onStarClick.bind(this)}
        />
                </MDBModalBody>
                <MDBModalFooter>
                  <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
                  <MDBBtn color="primary" onClick = {() =>{this.submitData(dat.id)}}>Save changes</MDBBtn>
                </MDBModalFooter>
              </MDBModal>  
                  </MDBCardBody>
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

export default ReturnBook


