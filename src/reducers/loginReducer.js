
const loginReducer = (state = [] , action) =>
{
   var isloggedin = "true" ; 
  


    switch(action.type)
    {
       case "get_login" :
 
    return isloggedin
    case "get_logout" :
     
    return !isloggedin
    default :
    return !isloggedin
}
}
export default loginReducer;