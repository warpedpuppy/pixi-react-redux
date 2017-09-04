import React from "react";
import Navbar from "./common/navbar";
import "../stylesheets/main.scss";
import { connect } from "react-redux";
import Resizer from "./core/Resizer";



export class App extends React.Component {


  render() {
  	//const {resize} = this.props;
    return (
      <div className="container">
      	<Navbar />
       {this.props.children}
       	<Resizer />
      </div>
    );
  }
}



// export the connected class
function mapStateToProps(state) {
  return {
    resize: state.resize || [],
  };
}
export default connect(mapStateToProps)(App);