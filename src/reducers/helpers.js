const helpers = (state = [], action) => {

switch (action.type) {
    case 'ADD_HELPER':
      return  [...state,{
      	id:action.helperQ,
      	helperQ: action.helperQ,
      	active:false, 
      	name:"",
      }]
  case 'DELETE_HELPER':
      return state.filter(helper =>
        Number(helper.id) !== Number(action.id)
      );
  	 case 'CHANGE_NAME':
  	 	let obj = state.map((helper) => {
        	
        		if(Number(action.id) === Number(helper.id)){
        			return {...helper, name:action.name}
        		}
        		return helper;
  	 	}
        		
      	);
      
      	
      return  obj;
    default:
      return state;
  }
}

export default helpers;
