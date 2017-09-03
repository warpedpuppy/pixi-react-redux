import React from 'react';
import { connect } from 'react-redux';

let HelperCounter = ({ ballQ }) => {
	return (
			<div>
 				<h2 className="text-center"> Current Balls: {ballQ}</h2>
<			/div>
		
	)
}

function mapStateToProps(state){
	return {
  		ballQ: state.balls.length
	}
}

HelperCounter = connect(mapStateToProps)(HelperCounter)

export default HelperCounter;