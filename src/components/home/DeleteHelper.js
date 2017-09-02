import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { delete_helper, game_state_edit } from "../../actions";

let DeleteButton = ({ dispatch }) => {

	function deleteHandler(e){
		
		dispatch(delete_helper(e.target.getAttribute("data-id")));
		dispatch(game_state_edit(false));
	}
	return (
		<Button id="deleteHelper" bsStyle='danger' bsSize='large' onClick={	(e) => deleteHandler(e) }>
			Delete Ball&nbsp;
			<Glyphicon glyph="remove" />

		</Button>
	)
}


DeleteButton = connect()(DeleteButton)

export default DeleteButton;