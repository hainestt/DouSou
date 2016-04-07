/**
 * h.t 2015-11
 * 
 */
'use strict';

var React = require('react-native');

var {View,Text,Image,StyleSheet,TouchableOpacity,}=React;

var BookItem=React.createClass({
	handlePress:function(){
		this.props.navigator.push({
			name:'book',
			bookInfo:this.props.rowData
		});
	},
	render:function(){
		let bookPos=this.props.rowData;
		return(
			<TouchableOpacity onPress={this.handlePress}>
				<View style={styles.row}>
					<Image source={{uri:bookPos.images.small}}
					style={styles.cellImage}/>
					<View style={{flex:1,marginLeft:10,}}>
						<Text style={styles.bookTitle} numberOfLines={2}>
							书名：{bookPos.title}
						</Text>
						<Text style={styles.bookAuthor} numberOfLines={2}>
							作者：{bookPos.author}
						</Text>
						<Text style={{color:'#999',fontSize:12,}} numberOfLines={1}>
							出版日期:{bookPos.pubdate}
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
	bookTitle:{
		flex:1,
		fontSize:18,
		fontWeight:'500',
		marginBottom:3,
	},
	bookAuthor:{
		flex:1,
		fontSize:16,
		marginBottom:3,
	}

});


module.exports=BookItem;