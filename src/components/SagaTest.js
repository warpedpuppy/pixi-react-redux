import React from "react";
import {Col, Button} from "react-bootstrap";

// Not found page component
export default class NotFound extends React.Component {
  // render
  render() {
    return (
      <div className="page-not-found">
        <h4>Saga Test</h4>

        <Col xs={6} md={4}><Button>Start Ball Drop</Button></Col>


        <Col xs={12} md={8} ><div id="saga_canvas">asdf</div></Col>
      </div>
    );
  }
}
