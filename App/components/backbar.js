/**
 * h.t 2015
 * Searchbar
 */
'use strict';

var React = require('react-native');

var {StyleSheet,ToolbarAndroid}=React;

var Backbar=React.createClass({
	render:function(){
		return(
			<ToolbarAndroid 
				actions={this.props.actions}
				navIcon={require('image!ic_white_back')}
				onActionSelected={this.props.onActionSelected}
				onIconClicked={this.props.navigator.pop}
				style={styles.toolbar}
				titleColor="#fff"
				title={this.props.title}/>
		);
	}
});

var styles=StyleSheet.create({
	toolbar:{
		backgroundColor:'#336633',
		height:56,
	},
});

module.exports=Backbar;