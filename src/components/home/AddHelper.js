import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { add_helper } from "../../actions";
import _ from 'lodash';

let AddButton = ({ dispatch, resize }) => {
	

	let move_val = _.random(0.25,1, true);
	let scale = _.random(0.25,0.75, true);
	let radius = 82*scale;

	let ball_props = {
		storeScale: _.random(0.25,0.75, true),
		storeColor: "0xFFFFFF",
		name: "init", 
		x:_.random(radius, (resize.homeCanvasWidth - radius)),
		y:_.random(radius, (160-radius)),
		moveX: move_val,
		moveY:move_val,
		negX:"FALSE",
		negY:"FALSE",

	}
	return (
		<Button id="addHelper" bsStyle='success' bsSize='large' onClick={
			() => {dispatch(add_helper(ball_props))
			}}>
			Add Ball&nbsp;
			<Glyphicon glyph="plus" />

		</Button>
	)
}
function mapStateToProps(state) {
//console.log("state from AddButton ", state)
  return ({
   	helpers:state.helpers,
   	game_state:state.game_state,
   	resize:state.resize
  });
}

AddButton = connect(mapStateToProps)(AddButton)

export default AddButton;