/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');

var {View,Text,Image,StyleSheet,TouchableOpacity}=React;

var MusicItem=React.createClass({
	handlePress:function(){
		this.props.navigator.push({
			name:'music',
			rowData:this.props.rowData
		});
	},
	render:function(){
		let music=this.props.rowData;
		return(
			<TouchableOpacity onPress={this.handlePress}
			activeOpacity={0.6}>
				<View style={styles.row}>
					<Image source={{uri:music.image}} style={styles.cellImage}/>
					<View style={{flex:1,marginLeft:10}}>
						<Text style={styles.title}>{music.title}</Text>
						<Text style={styles.singer}>{music.attrs.singer}</Text>
					</View>
				</View>
			</TouchableOpacity>
		);	

	}
});


var styles=StyleSheet.create({
	row:{
		alignItems:'center',
		backgroundColor:'#fff',
		flexDirection:'row',
		padding:5,
		marginBottom:5,
		borderBottomWidth:0.3,
		borderBottomColor:'#ddd',
	},
	cellImage:{
		width:60,
		height:60,
		borderRadius:30,
		marginRight:10,
	},
	title:{
		flex:1,
		fontSize:18,
		fontWeight:'500',
		marginBottom:3,
	},
	singer:{
		flex:1,
		fontSize:16,
	}
});

module.exports=MusicItem;