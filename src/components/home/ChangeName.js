import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { connect } from 'react-redux';
import { change_helper_name } from "../../actions";

  


let ChangeDeleteForm = ({dispatch}) => {
		function changeName(e){
			dispatch(change_helper_name(e.target.getAttribute("data-id"), e.target.value))
		}
	    return (
	      <form>
	        <FormGroup
	          controlId="formBasicText"
	        >
	          
	          <FormControl
	          	id="change_name_input"
	            type="text"
	            placeholder="Enter name"
	           	onChange={(e) => changeName(e)}
	          />
	          <FormControl.Feedback />
	          <HelpBlock className="aside">Name needs to be greater than two letters, less than seven</HelpBlock>
	        </FormGroup>
	      </form>
	    );
	
  
};


ChangeDeleteForm = connect()(ChangeDeleteForm)

export default ChangeDeleteForm;
