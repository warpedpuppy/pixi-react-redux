import React from 'react';
import { Col } from 'react-bootstrap';
import { connect } from 'react-redux';

let HelperCounter = ({ helperQ }) => {
	return (
			<div>
 				<h2 className="text-center"> Current Helpers: {helperQ}</h2>
<			/div>
		
	)
}

function mapStateToProps(state){
	return {
  		helperQ: state.helpers.length
	}
}

HelperCounter = connect(mapStateToProps)(HelperCounter)

export default HelperCounter;