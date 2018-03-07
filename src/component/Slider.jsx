import {UIInput} from "rainbowui-core";
import {Util} from "rainbow-foundation-tools";
import "../css/slider.css";
import PropTypes from 'prop-types';

export default class Slider extends UIInput {
	
	renderInput(){
		let inputRef = this.getInputRefProperty();
		return (
			<input id={this.componentId} name={this.getName()} type="text" ref={inputRef} data-auto-test={this.getNameForTest()} />
		);
	}
	
	componentDidMount(){
		super._componentDidMount();
		
		if(this.props.io != "out"){
			//this.initEvent();
			//this.initValue();
			this.initValidator();
			this.initComponent();
		}
	}
	
	initComponent(){
		let _self = this;
		let value = _self.getComponentValue();
		value = Util.isArray(value) ? value : parseInt(value);
		
		$("#" + this.componentId).slider({
			value: value,
			//value: [0, 20],
			min: parseInt(this.props.min),
			max: parseInt(this.props.max),
			step: parseInt(this.props.step),
			enabled: Util.parseBool(this.props.enabled),
			orientation: this.props.orientation,//Accepts 'vertical' or 'horizontal'
			tooltip: this.props.tooltip, //Accepts: 'show' or 'hide'
			selection: "none", //Accepts: 'before', 'after' or 'none'. 
			handle: this.props.handle,
			precision: 2,
			formatter: function(value) {
				//console.log("==formatter==" + value);
				//_self.onComponentChange();
				return "Current value: " + value;
			}
		})
		
		.on("slideStart", function(){
			//console.log("===slideStart===");
			// handle onSlideStart event
			if(_self.props.onSlideStart){
				_self.props.onSlideStart();
			}
		})
		
		.on("slide", function(){
			//console.log("===slide===");
			// handle onSlide event
			if(_self.props.onSlide){
				_self.props.onSlide();
			}
		})
		
		.on("slideStop", function(){
			//console.log("===slideStop===");
			// handle onSlideStart event
			if(_self.props.onSlideStop){
				_self.props.onSlideStop();
			}
			
			_self.setComponentValue();
		});
	}
	
};

/**
 * Slider component prop types
 */
Slider.propTypes = $.extend({}, UIInput.propTypes, {
	min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	orientation: PropTypes.oneOf(["vertical", "horizontal"]),
	handle: PropTypes.oneOf(["round", "square", "triangle", "custom"]),
	tooltip:  PropTypes.oneOf(["show", "hide"]),
	
	// not support onChange & onFocus & onBlur event
	onSlideStart: PropTypes.func,
	onSlider: PropTypes.func,
	onSlideStop: PropTypes.func
});

/**
 * Get Slider component default props
 */
Slider.defaultProps = $.extend({}, UIInput.defaultProps, {
	defaultValue: 0,
	handle: "round",
	min: 0,
	max: 100,
	step: 1,
	orientation: "horizontal",
	tooltip: "show"
});
