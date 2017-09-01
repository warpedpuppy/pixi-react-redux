import React from 'react';
import { Col } from 'react-bootstrap';
import _ from 'lodash';
import { connect } from 'react-redux';
import { game_state_edit } from "../../actions/index";




export class HomeCanvas extends React.Component {
	
	constructor(props){
		super(props);
		console.log("home canvas constructr")
		console.log(props)
		this.dispatch = props.dispatch;
	}
	componentDidMount() {
		
		let 	width = this.width = document.getElementById('homeCanvas').offsetWidth;
	    const 	app = this.app = new PIXI.Application(width, 150, {backgroundColor : 0x1099bb});
	    		
	    let		h = this.h = new this.Helper(),
	    		helperQ = this.helperQ = 0,
	    		activeItem = this.activeItem = false;

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

	 this.dispatch(game_state_edit(false));

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
   add_helper(helpers){
		
   		let q = helpers.length;
	   	if(q > this.helperQ){
	   			this.helperQ = q;

		   		let h = new this.Helper();
		   		h.id = _.last(helpers).id;
		   		h.name = _.last(helpers).name;
				h.x = _.random(0, this.props.resize.homeCanvasWidth);
				h.y = _.random(0, 150);
				h.sprite.scale.x = h.sprite.scale.y = _.random(0.25,1, true);
				h.interactive = true;
			    h.buttonMode = true;
				h.on("click", this.Alter.bind(this))
				this.helpers.push(h);
				this.app.stage.addChild(h);

				document.getElementById("infoPanel").classList.remove("hidden");
	   	}
   }
   delete_helper(gameState, storeHelpers) {
   		console.log(gameState);
   		if(gameState.edit === true){
	   		if(storeHelpers.length === this.helpers.length)return;
	   		this.itemBeingAltered.parent.removeChild(this.itemBeingAltered);
	   		this.helpers.splice(this.helpers.indexOf(this.itemBeingAltered), 1);
			this.helperQ = storeHelpers.length;
			this.reset();
		}
   }
   static resetX(){
   		this.activeItem = false;
   		for(let i = 0; i < this.helperQ; i ++){this.helpers[i].alpha = 1;};
   }
   reset(){
   		this.activeItem = false;
   		for(let i = 0; i < this.helperQ; i ++){this.helpers[i].alpha = 1;};
   }
   change_name(storeHelpers) {
   		
   		for(let i = 0; i < storeHelpers.length; i++){
   			let remoteHelper = storeHelpers[i];
   			for(let j = 0; j < this.helpers.length; j++){
   				let localHelper = this.helpers[j];

	   			if(remoteHelper.id === localHelper.id) {
	   				console.log("CHANGE");
	   				localHelper.text.text = remoteHelper.name;
	   				break;
	   			}
	   		}
   		}
   			
   		


   }
   Alter(e){

   	if(this.activeItem === false){

   		this.dispatch(game_state_edit(true));

		this.activeItem = true; //this will prevent another item being selected
		let item = this.itemBeingAltered = e.target;

		document.getElementById("change_name_input").setAttribute("data-id", item.id);
		document.getElementById("deleteHelper").setAttribute("data-id", item.id)
		
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
		document.getElementById("infoPanel").classList.add("hidden");
		document.getElementById("addHelper").classList.add("hidden");
		document.getElementById("deleteOrNamePanel").classList.remove("hidden");

		//fade out the others
		for(let i = 0; i < this.helperQ; i ++){
					if(this.helpers[i] !== item){
						this.helpers[i].alpha = 0.25;
					}
	   			}
   	}
   }

   Helper(){
   		let cont = new PIXI.Container();
		let sprite = new PIXI.Sprite.fromImage('/media/helper.png');
		let text = new PIXI.Text("");
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
			//should unifty these
			this.resize_app(this.props.resize.homeCanvasWidth);
			this.add_helper(this.props.helpers);
			this.change_name(this.props.helpers);
			this.delete_helper(this.props.gameState, this.props.helpers);
		
		}
		return (
			<div>
				<Col className="helperQDiv">
					<div id="homeCanvas"></div>
				</Col>
				<div id='infoPanel' className="alert alert-info text-center hidden" role="alert">click on the insects to name/delete them</div>
				
			</div>
		)

	}
	

}
function mapStateToProps(state) {
	console.log("state from HomeCanvas ", state)
  return {
    resize: state.resize || [],
  };
}
export default connect(mapStateToProps)(HomeCanvas);

