  import React from "react";
import axios from "axios";
import {MDBCard,MDBCardBody,MDBCardImage,MDBCardTitle,MDBCardText,MDBCol,MDBRow} from "mdbreact";
import {Checkbox} from 'primereact/checkbox';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import TopNavigation from '../topNavigation';
import logo from '../../assets/narutoo.jpg'
import { MDBContainer} from "mdbreact";

class DisplayBooks extends React.Component {
  s = [];
  p =[];
  state = {
    a: [],
    val: "",
    checked: false,
    Categories: []
  };
  OnCategoryChange = (e) =>
     {
       
    let selectedCategories = [...this.state.Categories];
    if(e.checked)
        selectedCategories.push(e.value);
    else
        selectedCategories.splice(selectedCategories.indexOf(e.value), 1);
this.setState({Categories: selectedCategories});
}

  componentDidMount() {
   
    if (this.props.data.length === 0) {
      axios.get("http://localhost:3000/data").then(res => {
        this.s = res.data;
        // eslint-disable-next-line
        this.s.map(data => {
          this.props.addData(data);
        });
      });
    }
  }

  search(e) {
    this.setState({
      val: e.target.value.substr(0, 20)
    });
  }

  getCategory = (catego, props) => {
    var myBook = [];
    props.forEach(ele => {
      catego.forEach(cate => {
        if (cate === ele.category) {
          myBook.push(ele);
        }
      })
    })
    return myBook;
  }
  render() {
  let dataout =  this.state.Categories.map(out => {
    return out;
  })
    let filtereddata =
    this.state.Categories.length >= 1
      ? 
        (
          this.getCategory(dataout, this.props.data)
         )
         
        : this.props.data.map(out => {
            return out;
          });
    var manipulatedData = filtereddata.filter(out => {
      
      return(
         out.author.toLowerCase().indexOf(this.state.val.toLowerCase()) !== -1 ||
       out.title.toLowerCase().indexOf(this.state.val.toLowerCase()) !== -1 
       );
      
     
    });
    const bookDetails = manipulatedData.length ===0 ? (
      <div>
        <h1>Sorry No Books Available</h1>
      </div>
    ) :
    // eslint-disable-next-line
      (manipulatedData.map(dat => {
      if(dat.isAvailable === "Yes")
      {
      return (
        <div key={dat.id}>
          <MDBCol key = {dat.id} >
                <MDBCard style={{ width: "20rem"}}>
                <Link to={"/book/" + dat.id}>
                <MDBCardBody>
                    <MDBCardTitle> {dat.title}</MDBCardTitle>
                    <MDBCardText>
                    {dat.author}
                    </MDBCardText>
                    <MDBCardImage className="img-fluid" src={dat.imageLink} waves  />
    
                    </MDBCardBody>
                </Link>
                </MDBCard>
                <br/>
                </MDBCol>
                
        </div>
      );
      }
    })) 
    
    return (

      <div>
    <TopNavigation />

      <div className="sidebar-fixed position-fixed">
      <div className="logo-wrapper waves-effect">
                <img alt="MDB React Logo" className="img-fluid" src={logo}/>
            </div>
      <div  className="content-section implementation">
      
      <div className="p-grid" style={{width:'250px'}}>
                        <div className="p-col-12">
                            <Checkbox inputId="cb1" value="Technology" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Technology') !== -1}></Checkbox>
                            <label htmlFor="cb1" className="p-checkbox-label">Technology</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="cb2" value="Business" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Business') !== -1}></Checkbox>
                            <label htmlFor="cb2" className="p-checkbox-label">Business</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="cb3" value="Fiction" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Fiction') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Fiction</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="cb3" value="Management" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Management') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Management</label>
                        </div>
                        <div className="p-col-12">
                            <Checkbox inputId="cb3" value="Non Fiction" onChange={this.OnCategoryChange} checked={this.state.Categories.indexOf('Non Fiction') !== -1}></Checkbox>
                            <label htmlFor="cb3" className="p-checkbox-label">Non Fiction</label>
                        </div>
                    </div>
                   </div>
        </div>
        <br/>
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search Here From Title or Author name" type="text"
          value={this.state.val}
          onChange={e => {
            this.search(e);
          }} aria-label="Search" />
        <br/>
 <MDBContainer size="4" style={{ heigth: "300px"  }}>
      
      <MDBRow  style={{ heigth: "300px" }}>{bookDetails}
     
    
     </MDBRow>
     </MDBContainer>
  
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    data: state.dataReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addData: data => dispatch({ type: "add_state", data })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayBooks);
