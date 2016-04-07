/**
 * h.t 2015
 * 
 */
'use strict';

var React = require('react-native');

var {View,Text,Image,StyleSheet,TouchableOpacity}=React;

var MovieItem=React.createClass({
	handlePress:function(){
		this.props.navigator.push({
			name:'movie',
			movieInfo:this.props.rowData
		});
	},
	render:function(){
		let movie=this.props.rowData;
		return(
			<TouchableOpacity onPress={this.handlePress}>	
				<View style={styles.row}>
					<Image source={{uri:movie.images.small}}
					style={styles.cellImage}/>
					<View style={{flex:1,marginLeft:10,}}>
						<Text style={styles.title} numberOfLines={2}>
							片名：{movie.title}
						</Text>
						<Text style={styles.subtitle} numberOfLines={2}>
							原名：{movie.original_title}
						</Text>
						<Text style={{color:'#999',fontSize:12,}} numberOfLines={1}>
							上映年份：{movie.year}
						</Text>
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
	},
	cellImage:{
		backgroundColor:'#ddd',
		height:85,
		marginRight:10,
		width:60,
	},
	title:{
		flex:1,
		fontSize:18,
		fontWeight:'500',
		marginBottom:3,
	},
	subtitle:{
		flex:1,
		fontSize:16,
		marginBottom:3,
	}

});

module.exports=MovieItem;