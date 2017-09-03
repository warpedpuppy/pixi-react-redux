
export let resize = (width, height, homeCanvasWidth) => 
	({
	  type: 'SCREEN_RESIZE',
	  windowWidth: width,
	  windowHeight: height,
	  homeCanvasWidth: homeCanvasWidth,
})


let helpers = 1;
export let add_helper = (ball_props) => 
	({
	  type: 'ADD_HELPER',
	  helperQ: helpers ++,
	  id:helpers,
	  ball_props:ball_props
})


export let game_state_edit = (edit) => 
	({
		type:'EDIT_HELPER',	
		edit: edit,
})			


export let save_ball_state = (balls) => 
	({
		type:'SAVE_STATE',	
		balls: balls

})

export let change_color = (id, color) => 
	({
	  type: 'CHANGE_COLOR',
	  color: color,
	  id:id,
})
export let delete_helper = (id) => 
	({
	  type: 'DELETE_HELPER',
	  helperQ: helpers --,
	  id:id,
})
export let change_helper_name = (id, name) => 
	({
	  type: 'CHANGE_NAME',
	  name: name,
	  id:id,
	  helperQ:helpers,

})



