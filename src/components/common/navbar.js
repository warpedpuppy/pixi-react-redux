import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'React-Bootstrap';
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";


export default class Menu extends React.Component {

	render(){
				return (
					<Navbar collapseOnSelect>
					    <Navbar.Header>
					      <Navbar.Brand>
					      
					        animation
					     
					      </Navbar.Brand>
					      <Navbar.Toggle />
					    </Navbar.Header>
					    <Navbar.Collapse>
					    <Nav pullRight>

							

					       </Nav>
					    </Navbar.Collapse>
				  	</Navbar>
		  )
	}


}