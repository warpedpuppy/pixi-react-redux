import React from "react";
import HelperCounter from "./home/HelperCounter";
import HomeCanvas from "./home/HomeCanvas";
import HelperControlPanel from "./home/HelperControlPanel";
import { connect } from 'react-redux';

// Home page component
let Home = ({resize, helpers, gameState}) => (
  // render
  
      <div className="page-home">
        <HelperCounter />
        <HomeCanvas resize={resize} helpers={helpers} gameState={gameState}/>
        <HelperControlPanel />
      </div>
   
)

function mapStateToProps(state){
	return {
		resize:state.resize,
		helpers:state.helpers,
    gameState:state.gameState,
  		
	}
}
Home = connect(mapStateToProps)(Home)
export default Home;