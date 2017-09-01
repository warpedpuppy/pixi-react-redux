const GameState = (state = [], action = {}) => {

switch (action.type) {
	case 'EDIT_HELPER':
      return  {
      	edit: action.edit,
      }
    default:
      return state || false;
  }
}

export default GameState;
