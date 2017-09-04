import React from "react";
import Navbar from "./common/navbar";
import "../stylesheets/main.scss"
import Resizer from "./core/Resizer";

export default class App extends React.Component {

  render() {
    return (
      <div className="container">
        	<Navbar />
            {this.props.children}
         	<Resizer />
      </div>
    );
  }
}

