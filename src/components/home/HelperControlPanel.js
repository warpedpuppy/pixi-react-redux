import React from 'react';
import AddHelper from "./AddHelper";
import { Col } from 'react-bootstrap';

let HomeControlPanel = ({ helperQ }) => {
	return (
		<Col className="text-center">
			<AddHelper />
		</Col>
	)
}



export default HomeControlPanel;