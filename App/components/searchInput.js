/**
 * h.t 2015
 * SearchInput
 */
'use strict';

var React = require('react-native');

var {View,Image,StyleSheet,TextInput,TouchableHighlight}=React;

var SearchInput=React.createClass({
	render:function(){
		return(
			<View style={styles.row}>
				<TouchableHighlight underlayColor='rgba(51,102,51,0.9)' style={styles.touchContainer} onPress={this.props.onPress}>
					<Image source={require('image!ic_white_back')} style={styles.touchImg}/>
				</TouchableHighlight>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} defaultValue={this.props.defaultValue} onChangeText={(text)=>this.props.onChangeText(text)}/>
				</View>
			</View>
		);
	}
});

var styles=StyleSheet.create({
	row:{
		flexDirection:'row',
		height:56,
	},
	touchContainer:{
		backgroundColor:'#336633',
		width:56,
		height:56,
	},
	touchImg:{
		width:18,
		height:18,
		marginTop:18,
		alignSelf:'center',
	},
	inputContainer:{
		flex:1,
		backgroundColor:'#336633',
	},
	input:{
		height:56,
		color:'#fff'
	},
});

module.exports=SearchInput;