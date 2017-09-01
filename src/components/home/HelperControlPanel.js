import React from 'react';
import AddHelper from "./AddHelper";
import ChangeName from "./ChangeName";
import { Col, Button, Glyphicon } from 'react-bootstrap';
import DeleteHelper from "./DeleteHelper";
import HomeCanvas from "./HomeCanvas";

let HomeControlPanel = ({ helperQ }) => {

	function closePanel(e) {
		e.target.parentElement.parentElement.classList.add("hidden");
		document.getElementById("infoPanel").classList.remove("hidden");
		document.getElementById("addHelper").classList.remove("hidden");
		document.getElementById("deleteOrNamePanel").classList.add("hidden");
	}

	return (
		<Col className="text-center">
			<AddHelper />

			<div id='deleteOrNamePanel' className="alert alert-info text-center hidden" role="alert">
				<Button className="closePanel" onClick={(e) => closePanel(e)} bsStyle="danger"><Glyphicon glyph="remove" /></Button>
				<h4>name this helper:</h4>
				<ChangeName />
				<h4>delete this helper: </h4>
				<DeleteHelper />
			</div>
			
		</Col>
	)
}



export default HomeControlPanel;