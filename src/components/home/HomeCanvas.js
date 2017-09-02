import React from 'react';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { game_state_edit } from "../../actions/index";




export class HomeCanvas extends React.Component {
	
	constructor(props){
		super(props);
		this.dispatch = props.dispatch;
		console.log("HomeCanvas constructr props = ", props);

	}

	componentDidMount() {
		
		let 	width = this.width = document.getElementById('homeCanvas').offsetWidth,
				canvasHeight = this.canvasHeight = 160;
	    const 	app = this.app = new PIXI.Application(width, canvasHeight, {backgroundColor : 0x1099bb});
	    		
	    let		h = this.h,
	    		ballQ = this.ballQ = 0,
	   			itemBeingAltered = this.itemBeingAltered = undefined,
	    		ball;

		this.helpers = [];
		var that = this;
	    document.getElementById("homeCanvas").appendChild(app.view);
		

	   app.ticker.add(function(delta) {
		   
		   that.helpers.map(ball => {

			     	if(ball.move === true){
					    ball.x += ball.moveX;
					    ball.y += ball.moveY;
					    if(ball.x > (that.width - ball.radius) || ball.x < ball.radius)ball.moveX *= -1;
				     	if(ball.y > that.canvasHeight - ball.radius|| ball.y < ball.radius)ball.moveY *= -1;
					}
				})
		});

	   var manager = new PIXI.interaction.InteractionManager(app.stage, app.view);

	 this.dispatch(game_state_edit(false));

   }
 

   state_change_handler() {

   		let localBalls = this.app.stage.children.length;
   		let remoteBalls = this.props.helpers.length;
   		

   		if(remoteBalls > localBalls) {
   				this.add_helper();
   		} else if(remoteBalls < localBalls) {
   				this.delete_helper();

   		} else {
   			this.change_name_or_color(this.props.helpers);
   		}

   		this.resize_app();
		this.clear_edit_screen(this.props.gameState.edit);
   }



	add_helper(){
		   		let h = new this.Helper(_.last(this.props.helpers).id,  _.last(this.props.helpers).name, this.props);
		   		h.on("click", this.Alter.bind(this))
				h.x = _.random(h.radius, (this.props.resize.homeCanvasWidth - h.radius));
				h.y = _.random(h.radius, (160-h.radius));
				this.ballQ = this.props.helpers.length;
				this.helpers.push(h);
				this.app.stage.addChild(h);
				this.change_info_screen("BALLS_EXIST");
	}

	delete_helper() {
	   		this.itemBeingAltered.parent.removeChild(this.itemBeingAltered);
	   		this.helpers.splice(this.helpers.indexOf(this.itemBeingAltered), 1);
			this.ballQ = this.props.helpers.length;
			
	}
	change_name_or_color(storeHelpers) {
   		storeHelpers.map(ball1 => {
   				this.helpers.map(ball2 => {
   						if(ball1.id === ball2.id) {
   							ball2.text.text = ball1.name;
	   			 			ball2.sprite.tint = parseInt(ball1.color);
   						}
   				})
   		})
	}
	resize_app(){
  
	   	if(this.width !== this.props.resize.homeCanvasWidth){
	   		this.width =  this.props.resize.homeCanvasWidth;
	   		this.app.renderer.resize( this.props.resize.homeCanvasWidth, 150);
   			this.helpers.map(helper => {
   				helper.x = _.random(helper.radius, this.props.resize.homeCanvasWidth-helper.radius);
				helper.y = _.random(helper.radius, 160-helper.radius);
   			})
	   	}
	}

   change_info_screen(string){
   		switch (string) {
			case "BALLS_EXIST":
   				return document.getElementById("infoPanel").innerHTML = "Click on the ball to change its color or delete it!";
			default:
	      		return document.getElementById("infoPanel").innerHTML = "Add some balls!";
	  	}

   }
  



  
   clear_edit_screen(edit_mode){
   		if(!edit_mode) {
   			if(this.ballQ > 0)
   				this.change_info_screen("BALLS_EXIST");
   			else 
   				this.change_info_screen();

			document.getElementById("infoPanel").classList.remove("hidden");
			document.getElementById("addHelper").classList.remove("hidden");
			document.getElementById("deleteOrNamePanel").classList.add("hidden");
			document.getElementById("change_name_input").value = "";

   			if(this.itemBeingAltered) {
   				TweenLite.to(this.itemBeingAltered.sprite.scale, 0.5, {x:this.itemBeingAltered.storeScale, y:this.itemBeingAltered.storeScale})
   				this.itemBeingAltered.move = true;
   				this.itemBeingAltered = undefined
   			}
   			
			this.helpers.map(ball => ball.alpha = 1);
   		}
   }
  

   Alter(e){

   	if(this.itemBeingAltered === undefined){

   		this.dispatch(game_state_edit(true));

		
		let item = this.itemBeingAltered = e.target;

		document.getElementById("change_name_input").setAttribute("data-id", item.id);
		document.getElementById("deleteHelper").setAttribute("data-id", item.id)
		document.getElementById("changeColorSelect").setAttribute("data-id", item.id);
		if(item.text.text !== "")document.getElementById("change_name_input").value = item.text.text;

		item.move = false;
		let midwidth = this.props.resize.homeCanvasWidth/2;
		TweenLite.to(item, 1, {x:midwidth, y:80});
		TweenLite.to(item.sprite.scale, 1, {x:1, y:1});
		TweenLite.to(item.sprite, 1, {x:1, y:1, rotation:0});

		//move item to the top
		let p = item.parent;
		p.removeChild(item);
		p.addChild(item);

		

		//open control panel
		document.getElementById("infoPanel").innerHTML = "Change this ball's color, re-name it, or delete it!";
		document.getElementById("addHelper").classList.add("hidden");

		document.getElementById("deleteOrNamePanel").classList.remove("hidden");

		
		this.helpers.map(ball => {if(ball !== item){ball.alpha = 0.25;}})
   	}
   }

   Helper(id, name){
   		let cont = new PIXI.Container();
   		cont.id = id;
   		cont.name = name;
		let sprite = new PIXI.Sprite.fromImage('/media/ball.png');
		let text = new PIXI.Text("", {fill:0xFFFFFF});
		sprite.scale.x = sprite.scale.y = cont.storeScale = _.random(0.25,0.75, true);
		cont.moveX = cont.moveY = _.random(0.25,1, true);
		cont.interactive = true;
	    cont.buttonMode = true;
		
		text.anchor.x = text.anchor.y =.5;
		//text.y = 25;
		sprite.anchor.x = sprite.anchor.y = .5;
		cont.addChild(sprite);
		cont.addChild(text);
		cont.text = text;
		cont.sprite = sprite;
		cont.move = true;
		cont.radius = cont.width/2;
		
       	return cont;
   }
  
	render(){

		if(this.app)this.state_change_handler();
		
		
		return (
			<div>
				<Col className="helperQDiv">
					<div id="homeCanvas"></div>
				</Col>
				
				
			</div>
		)

	}
	

}
function mapStateToProps(state) {
console.log("state from HomeCanvas ", state)
  return {
   	helpers:state.helpers,
   	game_state:state.game_state,
   	resize:state.resize
  };
}
export default connect(mapStateToProps)(HomeCanvas);

