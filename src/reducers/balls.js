import _ from 'lodash';

const helpers = (state = [], action) => {

switch (action.type) {
   case 'ADD_BALL':
      return  [...state,{
        ...action.ball_props,
      	id:action.helperQ,
      	helperQ: action.helperQ,
      	active:false, 
      }];
  case 'CHANGE_COLOR':
      let colorChanger = state.map((helper) => {
        		if(Number(action.id) === Number(helper.id)){
        			return {...helper, storeColor:action.color}
        		}
        		return helper;
  	 	});
      return  colorChanger;
  case 'DELETE_BALL':
      return state.filter(helper =>
        Number(helper.id) !== Number(action.id)
      );
  case 'SAVE_STATE':
    let i = 0;
    let balls = state.map((ball) => {
        let s = {...ball, x:action.balls[i].x, y:action.balls[i].y, scale:action.balls[i].storeScale, name:action.balls[i].name, color:action.balls[i].color, negX: action.balls[i].negX, negY: action.balls[i].negY, radius: action.balls[i].radius}
                i++;
                return s;
      
      });
      return  balls;
  case 'CHANGE_NAME':
  	 	let obj = state.map((helper) => {
        		if(Number(action.id) === Number(helper.id)){
        			return {...helper, name:action.name}
        		}
        		return helper;
  	 	});
      return  obj;
    default:
      return  state;
  }
}

export default helpers;
