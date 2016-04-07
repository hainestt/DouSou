/**
 * h.t 2015-11
 * 
 */
'use strict';

var React=require('react-native');
var BookCollections=require('./BookCollections');
var BookDetial=require('./BookDetial');
var SearchScreen=require('./SearchScreen');

var {View,Imgae,Text,StyleSheet,Navigator,ToolbarAndroid,BackAndroid,ToastAndroid}=React;

var _navigator;
BackAndroid.addEventListener('hardwareBackPress',()=>{
	if(_navigator && _navigator.getCurrentRoutes().length >1 ){
		_navigator.pop();
		return true;
	}
	return false;
});
var toolbarActions=[
	{title:'查看'},
	{title:'更多'},
];

var handleBookDetail=function(pop){
	ToastAndroid.show(toolbarActions[pop].title+' ',ToastAndroid.SHORT);
}

var RouteMapper=function(route,navigator){
	_navigator=navigator;
	if(route.name==='index'){
		return(
			<BookCollections navigator={navigator}/>	
		);
	}else if(route.name==='book'){
		return (
			<View style={{flex:1}}>
				<ToolbarAndroid 
					actions={toolbarActions}
					navIcon={require('image!ic_white_back')}
					onActionSelected={handleBookDetail}
					onIconClicked={navigator.pop}
					style={styles.toolbar}
					titleColor="#fff"
					title={route.bookInfo.title}/>

				<BookDetial navigator={navigator} bookInfo={route.bookInfo}/>
				
			</View>
		);
	}else if(route.name==='search'){
		return (
			<SearchScreen navigator={navigator} />
		);
	}
}

var Book=React.createClass({
	render:function(){
		var initialRoute={name:'index'};
		return(
			<Navigator 
			style={styles.container}
			initialRoute={initialRoute}
			configureScene={()=>Navigator.SceneConfigs.FadeAndroid}
			renderScene={RouteMapper} />
		);
	}
});



var styles=StyleSheet.create({
	toolbar:{
		backgroundColor:'#336633',
		height:56,
	},
	container:{
		flex:1,
		backgroundColor:'#ffffff',
	}
});

module.exports=Book;