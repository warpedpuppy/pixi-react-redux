import React from 'react';
import AddHelper from "./AddHelper";
import ChangeName from "./ChangeName";
import { Col, Button, Glyphicon } from 'react-bootstrap';
import DeleteHelper from "./DeleteHelper";
import HomeCanvas from "./HomeCanvas";
import {game_state_edit} from "../../actions/index";
import { connect } from 'react-redux';

let HomeControlPanel = ({ dispatch }) => {

	
	function closePanel(e) {
		dispatch(game_state_edit(false));
		
	}

	return (
		<Col className="text-center">
			<AddHelper />

			<div id='deleteOrNamePanel' className="alert alert-info text-center hidden" role="alert">

				<Button className="closePanel" onClick={(e) => closePanel(e)} bsStyle="danger"><Glyphicon glyph="remove" /></Button>

				<div className="alert alert-success text-center nameColorPanel" role="alert">
					<ChangeName />
				</div>

				<div className="alert alert-danger text-center" role="alert">
				<h4>delete this ball: </h4>
				<DeleteHelper />
				</div>

			</div>
			
		</Col>
	)
}

HomeControlPanel = connect()(HomeControlPanel)

export default HomeControlPanel;