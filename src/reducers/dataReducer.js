
const dataReducer = (state = [] , action) =>
{
    
    switch(action.type)
    {
       case "add_state" :
     
    return [...state , {...action.data}]
    default :
    
    return state
}
}
export default dataReducer;