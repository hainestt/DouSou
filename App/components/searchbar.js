/**
 * h.t 2015
 * Searchbar
 */
'use strict';

var React = require('react-native');

var {ToolbarAndroid}=React;

var toolbarActions=[
	{title:'搜索',icon:require('image!ic_white_search'),show:'always'},
];

var Searchbar=React.createClass({
	handleActionSelected:function(){
		this.props.navigator.push({
			name:'search',
		});
	},
	render:function(){
		return(
			<ToolbarAndroid 
				actions={toolbarActions}
				logo={require('image!ic_star')}
				onActionSelected={this.handleActionSelected}
				style={{height:56,backgroundColor:'#336633'}}
				titleColor="#fff"
				title={this.props.title} />
		);
	}
});

module.exports=Searchbar;