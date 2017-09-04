import React from "react";
import BallCounter from "./home/BallCounter";
import HomeCanvas from "./home/HomeCanvas";
import ControlPanel from "./home/ControlPanel";

// Home page component
let Home = ({resize, balls, gameState}) => (
  
      <div className="page-home">
        <BallCounter />
        <div id='infoPanel' className="alert alert-info text-center" role="alert">add some balls!</div>
        <HomeCanvas />
        <ControlPanel />
       </div>
   
)

export default Home;