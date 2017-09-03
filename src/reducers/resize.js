const resize = (state = [], action) => {



switch (action.type) {
    case 'SCREEN_RESIZE':
      return  {
	  windowWidth: action.windowWidth,
	  windowHeight: action.windowHeight,
	  homeCanvasWidth: action.homeCanvasWidth,
	  homeCanvasHeight: action.homeCanvasHeight
	}
    default:
      return state;
  }
}

export default resize;
