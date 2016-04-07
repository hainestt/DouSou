/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var MusicList=require('./MusicList');
var DetailMusic=require('./DetailMusic');
var SearchScreen=require('./SearchScreen');

var {StyleSheet,Navigator,BackAndroid,ToastAndroid}=React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress',()=>{
	if(_navigator && _navigator.getCurrentRoutes().length > 1){
		_navigator.pop();
		return true;
	}
	return false;
});

var RouteMapper=function(route,navigator){
	_navigator=navigator;
	switch(route.name){
		case 'favourite':
			return <MusicList navigator={navigator}/>;
		case 'music':
			return <DetailMusic navigator={navigator} rowData={route.rowData} />;
		case 'search':
			return <SearchScreen navigator={navigator}/>;
	};
}



var Music=React.createClass({
	render:function(){
		var initialRoute={name:'favourite'};
		return(
			<Navigator 
			initialRoute={initialRoute}
			configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
			renderScene={RouteMapper}
			style={styles.container}/>
		);
	}
});

var styles=StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
});

module.exports=Music;