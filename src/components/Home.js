import React from "react";
import BallCounter from "./home/BallCounter";
import HomeCanvas from "./home/HomeCanvas";
import ControlPanel from "./home/ControlPanel";
import { connect } from 'react-redux';

// Home page component
let Home = ({resize, balls, gameState}) => (
  // render
  
      <div className="page-home">
        <BallCounter />
        <div id='infoPanel' className="alert alert-info text-center" role="alert">add some balls!</div>
        <HomeCanvas resize={resize} balls={balls} gameState={gameState}/>
        <ControlPanel />
       </div>
   
)

function mapStateToProps(state){
	return {
		resize:state.resize,
		balls:state.balls,
    gameState:state.gameState,
  		
	}
}
Home = connect(mapStateToProps)(Home)
export default Home;