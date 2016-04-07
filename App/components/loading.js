/**
 * h.t 2015-11
 * Loading...
 */
'use strict';

var React=require('react-native');
var {View,Text,ProgressBarAndroid,StyleSheet,Dimensions}=React;

var centerSize=Dimensions.get('window').width/2;


var Loading=React.createClass({
	render:function(){
		if(this.props.horizontal){
			return (
				<View style={styles.loadingHorizon}>
					<View style={styles.loadingHorizonView}>
						<ProgressBarAndroid styleAttr="Small"/>
					</View>
					<Text style={styles.text}> 正在加载...</Text>
				</View>
			);
		}
		return(
			<View style={styles.loadingNomal}>
				<ProgressBarAndroid styleAttr="Inverse"  color="#009999" />
				<Text style={styles.text}>正在加载...</Text>
			</View>
		);
	}
});

var styles=StyleSheet.create({
	loadingHorizon:{
		alignItems:'center',
		marginLeft:centerSize-50,
		flex:1,
		flexDirection:'row',
	},
	loadingHorizonView:{
		alignSelf:'center',
		justifyContent:'center'
	},
	loadingNomal:{
		flex:1,
		alignItems:'center',
		justifyContent:'center',
	},
	text:{
		fontSize:16,
	}
});

module.exports=Loading;