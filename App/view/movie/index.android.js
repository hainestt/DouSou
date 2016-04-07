/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var TopMovies=require('./TopMovies');
var DetailMoves=require('./DetailMoves');
var SearchScreen=require('./SearchScreen');

var {StyleSheet,Navigator,BackAndroid,ToastAndroid}=React;


var _navigator;
BackAndroid.addEventListener('hardwareBackPress',()=>{
	if(_navigator && _navigator.getCurrentRoutes().length>1){
		_navigator.pop();
		return true;
	}
	return false;
});

var INI_ROUTE_STACK=[
	{name:'top250'}
];

var RouteMapper=function(route,navigator){
	_navigator=navigator;

	switch(route.name){
		case 'top250':
			return <TopMovies navigator={navigator}/>;
		case 'movie':
			return <DetailMoves navigator={navigator} movieInfo={route.movieInfo}/>;
		case 'search':
			return <SearchScreen navigator={navigator}/>
	};

}

var Movie=React.createClass({
	render:function(){
		// var initialRoute={name:'top250'};
		var initialRoute=INI_ROUTE_STACK[0];
		return(
			<Navigator 
				initialRoute={initialRoute}
				initialRouteStack ={INI_ROUTE_STACK}
				configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
				renderScene={RouteMapper}
				style={styles.container}/>
		);
	}
});
//FloatFromBottomAndroid

var styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
});

module.exports=Movie;