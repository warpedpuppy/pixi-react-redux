import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { add_helper } from "../../actions";
import _ from 'lodash';

let AddButton = ({ dispatch, resize }) => {
	
	function generate_props(){
			
		let move_val = _.random(0.25,1, true),
			scale = _.random(0.25,0.75, true),
			radius = (82*scale)/2,
			rotate =  _.random(0.05,.2, true),
			ball_props = {
				storeScale: _.random(0.25,0.75, true),
				storeColor: "0xFFFFFF",
				name: "", 
				x:_.random(radius, (resize.homeCanvasWidth - radius)),
				y:_.random(radius, (resize.homeCanvasHeight - radius)),
				moveX: move_val,
				moveY:move_val,
				negX:"FALSE",
				negY:"FALSE",
				radius:radius,
				rotate:rotate
			}

		return ball_props;
	}

	return (
		<Button id="addHelper" bsStyle='success' bsSize='large' onClick={
			() => {dispatch(add_helper(generate_props()))
			}}>
			Add Ball&nbsp;
			<Glyphicon glyph="plus" />
		</Button>
	)
}
function mapStateToProps(state) {
  return ({
   	resize:state.resize
  });
}

AddButton = connect(mapStateToProps)(AddButton)

export default AddButton;