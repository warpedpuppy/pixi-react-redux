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
			     	if(that.helpers[i].move === true){
					    that.helpers[i].sprite.rotation += 0.05 * delta;
					}
				}
		});

	   var manager = new PIXI.interaction.InteractionManager(app.stage, app.view);

		 

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
				h.sprite.scale.x = h.sprite.scale.y = _.random(0.25,1, true);
				h.interactive = true;
			    h.buttonMode = true;
				h.on("click", this.Alter.bind(this))
				this.helpers.push(h);
				this.app.stage.addChild(h);
	   	}
   }
   Alter(e){
   	var item = e.target;
   	item.move = false;
   	var midwidth = this.props.resize.homeCanvasWidth/2;
   	TweenLite.to(item, 1, {x:midwidth, y:80});
   	TweenLite.to(item.sprite.scale, 1, {x:1, y:1});
   	TweenLite.to(item.sprite, 1, {x:1, y:1, rotation:0});

   }

   Helper(){
   		let cont = new PIXI.Container();
		let sprite = new PIXI.Sprite.fromImage('/media/helper.png');
		let text = new PIXI.Text("asdf");
		text.anchor.x = .5;
		text.y = 25;
		sprite.anchor.x = sprite.anchor.y = .5;
		cont.addChild(sprite);
		cont.addChild(text);
		cont.text = text;
		cont.sprite = sprite;
		cont.move = true;
       	return cont;
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


