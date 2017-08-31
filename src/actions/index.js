
export let resize = (width, height, homeCanvasWidth) => 
	({
	  type: 'SCREEN_RESIZE',
	  windowWidth: width,
	  windowHeight: height,
	  homeCanvasWidth: homeCanvasWidth,
})


let helpers = 0;
export let add_helper = () => 
	({
	  type: 'ADD_HELPER',
	  helperQ: helpers ++,
})

