import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { resize } from '../../actions';
import { WindowResizeListener } from 'react-window-resize-listener';

let Resizer = ({ dispatch }) => {


	let 	homeCanvasWidth = (document.getElementById('homeCanvas'))?document.getElementById('homeCanvas').offsetWidth:500;
	return (

		 <WindowResizeListener onResize={windowSize => {
					dispatch(resize(windowSize.windowWidth, windowSize.windowHeight,  document.getElementById('homeCanvas').offsetWidth));
				}}/>
	)
}


Resizer = connect()(Resizer)

export default Resizer;