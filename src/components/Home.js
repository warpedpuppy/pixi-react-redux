import React from "react";
import HelperCounter from "./home/HelperCounter";
import HomeCanvas from "./home/HomeCanvas";
import HelperControlPanel from "./home/HelperControlPanel";
import { connect } from 'react-redux';

// Home page component
let Home = ({resize, helpers}) => (
  // render
  
      <div className="page-home">
        <HelperCounter />
        <HomeCanvas resize={resize} helpers={helpers}/>
        <HelperControlPanel />
      </div>
   
)

function mapStateToProps(state){
	return {
		resize:state.resize,
		helpers:state.helpers
  		
	}
}
Home = connect(mapStateToProps)(Home)
export default Home;