import React from 'react';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';



export default class HomeCanvas extends React.Component {
	
	constructor(){
		super();
	}
	componentDidMount() {
		
		let 	width = this.width = document.getElementById('homeCanvas').offsetWidth;
	    const 	app = this.app = new PIXI.Application(width, 150, {backgroundColor : 0x1099bb});
	    		
	    let		h = this.h = new this.Helper(),
	    		helperQ = this.helperQ = 0;

		this.helpers = [];
		var that = this;
	    document.getElementById("homeCanvas").appendChild(app.view);

	   app.ticker.add(function(delta) {
		    
		     for(let i = 0; i < that.helperQ; i ++){
				    that.helpers[i].rotation += 0.05 * delta;
				}

		});

   }
  resize_app(new_width){
  
	   	if(this.width !== new_width){
	   		this.width = new_width;
	   		this.app.renderer.resize(new_width, 150);
	   		for(let i = 0; i < this.helperQ; i ++){
				    this.helpers[i].x = _.random(0, this.props.resize.homeCanvasWidth);
					this.helpers[i].y = _.random(0, 150);
				}
	   	}
   }
   add_helper(q){
   
	   	if(q !== this.helperQ){
	   			this.helperQ = q;
		   		let h = this.h;
		   		h = new this.Helper();
				h.x = _.random(0, this.props.resize.homeCanvasWidth);
				h.y = _.random(0, 150);
				h.anchor.x = h.anchor.y = .5;
				this.helpers.push(h);
				this.app.stage.addChild(h);
	   	}
   }

   Helper(){
		let sprite = new PIXI.Sprite.fromImage('/media/helper.png');
       	return sprite;
   }
  
	render(){
		if(this.app){
			this.resize_app(this.props.resize.homeCanvasWidth);
			this.add_helper(this.props.helpers.length)
		
		}
		return (
			<Col className="helperQDiv">
				<div id="homeCanvas"></div>
			</Col>
		)

	}
	

}


