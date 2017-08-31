const helpers = (state = [], action) => {



switch (action.type) {
    case 'ADD_HELPER':
      return  [...state,{
      	helperQ: action.helperQ,
      }]
    default:
      return state;
  }
}

export default helpers;
