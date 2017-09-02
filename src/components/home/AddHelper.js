import React from 'react';
import { Glyphicon, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { add_helper } from "../../actions";

let AddButton = ({ dispatch }) => {


	return (
		<Button id="addHelper" bsStyle='success' bsSize='large' onClick={
			() => {dispatch(add_helper())
			}}>
			Add Ball&nbsp;
			<Glyphicon glyph="plus" />

		</Button>
	)
}


AddButton = connect()(AddButton)

export default AddButton;