import React from 'react';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { game_state_edit, save_ball_state } from "../../actions/index";




export class HomeCanvas extends React.Component {
	
	constructor(props){
		super(props);
		this.dispatch = props.dispatch;
	
	}

	componentDidMount() {
		
		let 	width = this.width = document.getElementById('homeCanvas').offsetWidth,
				canvasHeight = this.canvasHeight = document.getElementById('homeCanvas').offsetHeight;

	    const 	app = this.app = new PIXI.Application(width, canvasHeight, {backgroundColor : 0x1099bb});
	    		
	    let		h = this.h,
	    		ballQ = this.ballQ = 0,
	   			itemBeingAltered = this.itemBeingAltered = undefined,
	    		ball;

	    this.remoteIndeces = [];//this is to assist in unnecessary instantiation
		this.balls_on_stage = [];
		this.balls = [];//this is to keep a local version of the remote array.  To see if we need to delete one
		

	    document.getElementById("homeCanvas").appendChild(app.view);
		
	    app.ticker.add(this.animate.bind(this));

	 	this.dispatch(game_state_edit(false));
   }

   animate(delta) {
		   
		   this.balls_on_stage.map(ball => {

			     	if(ball.move === true){
					    ball.x += ball.moveX;
					    ball.y += ball.moveY;

					   	if(ball.x > (this.props.resize.homeCanvasWidth - ball.radius) || ball.x < ball.radius)ball.moveX *= -1;

				     	if(ball.y > this.props.resize.homeCanvasHeight - ball.radius|| ball.y < ball.radius)ball.moveY *= -1;
					}
				})
		}

   componentWillUnmount(){
   		

   		//BIT OF WEIRDNESS HERE
   		//for some reason the xmove and ymov were going absolute value between actions and reducers, 
   		//so adding flag to prep for that
   		//not awesome, but functioal
   		this.balls_on_stage.map(ball =>{
   			if(ball.moveX < 0)ball.negX = "TRUE";
   			if(ball.moveY < 0)ball.negY = "TRUE";
   		
   		})

   		//we're sending a lot of data here -- maybe this should be shrunk
   		this.dispatch(save_ball_state(this.balls_on_stage));
   }
 

   state_change_handler() {

   		let localBalls = this.app.stage.children.length;
   		let remoteBalls = this.props.balls.length;
   		
		//add balls
		this.props.balls.map(ball => {
			 if(this.remoteIndeces.indexOf(ball.id) === -1) {
				this.add_helper_from_object(ball);
				this.remoteIndeces.push(ball.id);
			}
		})
		//remove balls
		if(remoteBalls === localBalls - 1) {
   				let diff = _.difference(this.balls,this.props.balls);
   				this.removeFromStage(diff[0]);
   		}

   		this.change_name_or_color(this.props.balls);
   		this.resize_app();
		this.clear_edit_screen(this.props.gameState.edit);


   }
   removeFromStage(ball){
   		
   		this.balls_on_stage.map(ball_on_stage => {
   			if(ball.id === ball_on_stage.id) {
   				ball_on_stage.parent.removeChild(ball_on_stage);
   				this.remoteIndeces.splice(this.remoteIndeces.indexOf(ball.id), 1);
   			}
   		})
   		this.balls.splice(this.balls.indexOf(ball), 1);
   }

   add_helper_from_object(ball_data){

		   		let h = new this.Ball(ball_data);
		   		h.x = ball_data.x;
		   		h.y = ball_data.y;
		   		h.on("click", this.Alter.bind(this))
				this.ballQ = this.props.balls.length;

				this.balls_on_stage.push(h);
				this.balls.push(ball_data); 
				this.app.stage.addChild(h);
				this.change_info_screen("BALLS_EXIST");
	}

	change_name_or_color(storeHelpers) {
   		storeHelpers.map(ball1 => {
   				this.balls_on_stage.map(ball2 => {
   						if(ball1.id === ball2.id) {
   							ball2.text.text = ball2.name = ball1.name;
	   			 			ball2.sprite.tint = ball2.storeColor = parseInt(ball1.storeColor);
   						}
   				})
   		})
	}
	resize_app(){
  
	   	if(this.width !== this.props.resize.homeCanvasWidth){
	   		this.width =  this.props.resize.homeCanvasWidth;
	   		this.app.renderer.resize( this.props.resize.homeCanvasWidth, this.props.resize.homeCanvasHeight);
   			this.balls_on_stage.map(helper => {
   				helper.x = _.random(helper.radius, this.props.resize.homeCanvasWidth-helper.radius);
				helper.y = _.random(helper.radius, this.props.resize.homeCanvasHeight-helper.radius);
   			})
	   	}
	}

   change_info_screen(string){
   		switch (string) {
   			case "EDIT_BALL":
   				return document.getElementById("infoPanel").innerHTML = "Change this ball's color, re-name it, or delete it!";
			case "BALLS_EXIST":
   				return document.getElementById("infoPanel").innerHTML = "Click on the ball to change its color, name it, or delete it!";
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
   			
			this.balls_on_stage.map(ball => ball.alpha = 1);
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
			this.change_info_screen("EDIT_BALL");
			
			document.getElementById("addHelper").classList.add("hidden");

			document.getElementById("deleteOrNamePanel").classList.remove("hidden");

			
			this.balls_on_stage.map(ball => {if(ball !== item){ball.alpha = 0.25;}})
	   	}
   }

   Ball(props){

   		//this ball constructore
   		let cont = new PIXI.Container();
   		cont.id = props.id;
   		cont.name = props.name;

		let sprite = new PIXI.Sprite.fromImage('/media/ball.png');

		sprite.tint = cont.storeColor = parseInt(props.storeColor);

		let text = new PIXI.Text(props.name, {fill:0xFFFFFF});

		text.text = props.name;
		sprite.scale.x = sprite.scale.y = cont.storeScale = props.storeScale;

		//this negX/negY handler is to handle the strange issue between actions and reducer
		cont.moveX = (props.negX === "TRUE")?props.moveX*-1:props.moveX;
		cont.moveY = (props.negY === "TRUE")?props.moveY*-1:props.moveY;
		cont.interactive = true;
	    cont.buttonMode = true;
	
		text.anchor.x = text.anchor.y =.5;
		sprite.anchor.x = sprite.anchor.y = .5;
		cont.addChild(sprite);
		cont.addChild(text);


		cont.text = text;
		cont.sprite = sprite;
		cont.move = true;
		cont.radius = props.radius;
		
       	return cont;
   }


  
	render(){
		if(this.app)this.state_change_handler();
		console.log(this.props)
		return (
			<div>
				<Col className="helperQDiv">
					<div id="homeCanvas"></div>
				</Col>
			</div>
		)
	}
}

export default connect()(HomeCanvas);

