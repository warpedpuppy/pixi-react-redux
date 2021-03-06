import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";
import HomeCanvas from "../home/HomeCanvas";


export default class Menu extends React.Component {


	render(){
				return (
					<Navbar collapseOnSelect>
					    <Navbar.Header>
					      <Navbar.Brand >pixi/react/redux</Navbar.Brand>
					      <Navbar.Toggle />
					    </Navbar.Header>
					    <Navbar.Collapse>
					    <Nav pullRight>
							<IndexLinkContainer to="/">
						       <NavItem>
						       		home
						       </NavItem>
					       </IndexLinkContainer>

   							<LinkContainer to="/about">
						       <NavItem>
						       		about
						       </NavItem>
					       </LinkContainer>

					       </Nav>
					    </Navbar.Collapse>
				  	</Navbar>
		  )
	}


}