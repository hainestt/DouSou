/**
 * h.t 2015-11
 * 
 */
'use strict';

var React=require('react-native');
var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;



var BookDetial=React.createClass({
	render:function(){
		let book=this.props.bookInfo;
		return(
			<ScrollView contentContainerStyle={{padding:0}}>
				<View style={styles.row}>
					<Image source={{uri:book.images.medium}}
					style={styles.detailImage}/>
					<View style={styles.rightPane}>
						<Text style={styles.bookTitle} numberOfLines={3}>【{book.title}】</Text>
						<Text style={styles.nomalText} numberOfLines={2}>作者：{book.author}</Text>
						<Text style={styles.nomalText}>出版社: {book.publisher}</Text>
						<Text style={styles.nomalText}>页码：{book.pages}页</Text>
						<View style={styles.nomalRow}>
							<Text style={styles.rateText}>豆瓣评分：</Text>
							<Text style={styles.rating}>
								{book.rating.average}
							</Text>
						</View>
						<Text style={styles.nomalText}>参考价格: {book.price}</Text>
					</View>
				</View>
				<View style={{flex:1,padding:10}}>
					<Text style={styles.nomalText}>简介：{book.summary}</Text>
				</View>
			</ScrollView>
		);
	}
});

var styles=StyleSheet.create({
	row:{
		flex:1,
		flexDirection:'row',
		borderBottomWidth:0.3,
		borderBottomColor:'#CCCCCC',
		padding:10,
	},
	detailImage:{
		width:134,
		height:200,
		backgroundColor:'#eaeaea',
		marginRight:10,
	},
	rightPane:{
		justifyContent:'space-between',
		flex:1,
	},
	bookTitle:{
		flex:1,
		fontSize:18,
		fontWeight:'500',
		marginVertical:3,
	},
	nomalText:{
		fontSize:16,
		marginVertical:3,
	},
	nomalRow:{
		flex:1,
		flexDirection:'row',
	},
	rateText:{
		fontSize:16,
		marginVertical:3,
	},
	rating:{
		color:'#FF6666',
		fontSize:16,
		fontWeight:'500',
		marginVertical:3,
	},
});

module.exports=BookDetial;