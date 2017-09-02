
export let resize = (width, height, homeCanvasWidth) => 
	({
	  type: 'SCREEN_RESIZE',
	  windowWidth: width,
	  windowHeight: height,
	  homeCanvasWidth: homeCanvasWidth,
})


let helpers = 1;
export let add_helper = () => 
	({
	  type: 'ADD_HELPER',
	  helperQ: helpers ++,
	  id:helpers,
})


export let game_state_edit = (edit) => 
	({
		type:'EDIT_HELPER',	
		edit: edit,
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



