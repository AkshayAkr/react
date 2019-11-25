import React from 'react';

class LogOut extends React.Component {
 
    render() { 
    localStorage.removeItem("logins");
    localStorage.removeItem("userid");
    localStorage.removeItem("bookid");
    this.props.history.push("/disp")
 
      
      return(
       <div>
          
          
          </div>
      )
    }
}

export default LogOut 