import React from "react";

// Not found page component
export default class About extends React.Component {
  // render
  render() {
    return (
      <div className="about">
        <h4>About this application</h4>
        <p>This application combines React, Redux, and Pixi.</p>
        <p>This page's primary purpose is to show that the state will be preserved in the ball page if you leave and then re-enter.</p>
      </div>
    );
  }
}
