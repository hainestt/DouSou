/**
 * h.t 2015-11
 * 
 */
'use strict';

var React=require('react-native');

var {Image,ScrollView,StyleSheet,Text,View,ToolbarAndroid,ToastAndroid} = React;

var Back=require('../../components/backbar');

var toolbarActions=[
	{title:'查看更多'},
];
var eu='👉';

var DetialMovie=React.createClass({
	onActionSelected:function(pop){
		ToastAndroid.show(toolbarActions[pop].title+' ',ToastAndroid.SHORT);
	},
	render:function(){
		let movie=this.props.movieInfo;
		let imgItems=[];
		for(let i=0;i<movie.casts.length;i++){
			if(movie.casts[i].avatars){
				imgItems.push(
					<View key={i} style={styles.castsItem}>
						<Image source={{uri:movie.casts[i].avatars.medium}} style={styles.castsImg}/>

						<View style={styles.castsName}>
							<Text style={styles.text}>{movie.casts[i].name}</Text>
						</View>
					</View>
				);
			}
		}
		let genresItems=[];
		for(let i=0;i<movie.genres.length;i++){
			if(movie.genres[i]){
				genresItems.push(
					<View key={i} style={styles.genresBox}>
						<View style={styles.cell}>
							<Text style={styles.genresText}>{movie.genres[i]}</Text>
						</View>
					</View>
				);
			}
		}
		
		return(
			<View style={{flex:1}}>
				<Back 
				actions={toolbarActions} 
				onActionSelected={this.onActionSelected} 
				navigator={this.props.navigator}
				title={movie.title}/>

				<ScrollView contentContainerStyle={{padding:0}}>
					<View style={styles.row}>
						<Image source={{uri:movie.images.medium}} style={styles.detailImage}/>
						<View style={styles.rightPane}>
							<Text style={styles.title} numberOfLines={3}>{eu}{movie.title}</Text>
							<Text style={styles.nomalText} numberOfLines={2}>导演：{movie.directors.length!==0? movie.directors[0].name :' ' }</Text>
							
							<View style={{flexDirection:'row'}}>
								<Text style={styles.nomalText}>类型：</Text>
									{genresItems}
							</View>
							<Text style={styles.nomalText}>上映时间：{movie.year}</Text>
							<View style={styles.nomalRow}>
								<Text style={styles.rateText}>豆瓣评分：</Text>
								<Text style={styles.rating}>
									{movie.rating.average}
								</Text>
							</View>
						</View>
					</View>
					<View style={{flex:1,padding:10}}>
						<Text style={[styles.nomalText,{marginTop:-8,marginBottom:10}]}>演员表：</Text>
						<ScrollView showsHorizontalScrollIndicator={false} key={'horizon'} horizontal={true}>
							{imgItems}
						</ScrollView>
					</View>
				</ScrollView>
			</View>
		);
	}
});
// <ToolbarAndroid 
// 					actions={toolbarActions}
// 					navIcon={require('../../../icon/ic_back_white.png')}
// 					onActionSelected={this.onActionSelected}
// 					onIconClicked={this.props.navigator.pop}
// 					style={styles.toolbar}
// 					titleColor="#fff"
// 					title={movie.title}/>

var styles=StyleSheet.create({
	toolbar:{
		backgroundColor:'#336633',
		height:56,
	},
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
	title:{
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
	//类型
	genresBox:{
		flexDirection:'row',
	},
	cell:{
		flex:1,
		marginHorizontal:4,
		borderRadius:2,
		backgroundColor:'rgba(0,0,0,0.2)',
	},
	cell2:{
		flex:1,
		marginHorizontal:4,
	},
	genresText:{
		fontSize:16,
		color:'#fff',
	},
	// 演员表
	castsItem:{
		flex:1,
		width:220,
		height:300,
		marginRight:20,
		position:'relative',
	},
	castsImg:{
		width:220,
		height:300,
	},
	castsName:{
		height:56,
		width:220,
		backgroundColor:'rgba(0,0,0,0.2)',
		alignItems:'center',
		justifyContent:'center',
		position:'absolute',
		marginTop:-55,
	},
	text:{
		color:'#fff',
		fontSize:20,
	}


});

module.exports=DetialMovie;