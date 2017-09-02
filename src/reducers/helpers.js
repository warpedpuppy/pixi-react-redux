const helpers = (state = [], action) => {

switch (action.type) {
   case 'ADD_HELPER':
      return  [...state,{
      	id:action.helperQ,
      	helperQ: action.helperQ,
      	active:false, 
      	name:"",
      	color: "0xFFFFFF",
      }];
  case 'CHANGE_COLOR':
      let colorChanger = state.map((helper) => {
        		if(Number(action.id) === Number(helper.id)){
        			return {...helper, color:action.color}
        		}
        		return helper;
  	 	});
      return  colorChanger;
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
  	 	});
      return  obj;
    default:
      return state;
  }
}

export default helpers;
