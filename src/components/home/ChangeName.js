import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { change_helper_name, change_color } from "../../actions";

  


let ChangeDeleteForm = ({dispatch}) => {
		function changeName(e){
			dispatch(change_helper_name(e.target.getAttribute("data-id"), e.target.value))
		}
		function changeColor(e){
			console.log("changeName")
			dispatch(change_color(e.target.getAttribute("data-id"), e.target.value))
		}
	    return (
	      <form>
	        <FormGroup
	          controlId="formBasicText"
	        >
	          <h4>name this ball:</h4>
	          
	          <input maxLength="10" type="text" className="form-control" placeholder="Enter name" id="change_name_input" onChange={(e) => changeName(e)} />

	          <FormControl.Feedback />
	          <HelpBlock className="aside">Name needs to be greater than two letters, less than seven</HelpBlock>
	        </FormGroup>
			<div className="form-group">
				<h4 >change ball color:</h4>
				<select className="form-control" id="changeColorSelect" onChange={(e) => changeColor(e)}>
				<option value="0xFFFFFF">white</option>
				<option value="0xFF9900">orange</option>
				<option value="0x551A8B">purple</option>
				<option value="0xFF69B4">pink</option>
				<option value="0x0000FF">blue</option>
				<option value="0xFFFF00">yellow</option>
				<option value="0x00FF00">green</option>
				</select>
				</div>
	      </form>
	    );
	
  
};


ChangeDeleteForm = connect()(ChangeDeleteForm)

export default ChangeDeleteForm;
