/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var Loading=require('../../components/loading');
var api=require('../../components/api');

var {Image,View,Text,StyleSheet,ScrollView,ToolbarAndroid,ToastAndroid,IntentAndroid}=React;


var eu='👉';
var toolbarActions=[
	{title:'查看更多'},
];

var DetailMusic=React.createClass({
	getInitialState:function(){
		return{
			data:null,
		};
	},
	componentDidMount:function(){
		var id=this.props.rowData.id;
		var REQUEST_URL=api.music_search_id+'/'+id;
		fetch(REQUEST_URL)
			.then((response)=>response.json())
			.then((responseData)=>{
				this.setState({
					data:responseData,
				});
			})
			.catch((error)=>{
				ToastAndroid.show(''+error,ToastAndroid.LONG);
			})
			.done();
	},
	onActionSelected:function(pop){
		var url=this.state.data.mobile_link;
		if(toolbarActions[pop].title==='查看更多'){
			IntentAndroid.canOpenURL(url,(supported)=>{
				if(supported){
					IntentAndroid.openURL(url);
				}else{
					ToastAndroid.show(toolbarActions[pop].title,ToastAndroid.SHORT);
				}
			})
		}
	},
	render:function(){
		let music=this.state.data;
		return(
			<View style={{flex:1}}>
				<ToolbarAndroid 
					actions={toolbarActions}
					navIcon={require('image!ic_white_back')}
					onActionSelected={this.onActionSelected}
					onIconClicked={this.props.navigator.pop}
					style={styles.toolbar}
					titleColor="#fff"
					title={this.props.rowData.title}/>
					{
						music ?
							<ScrollView contentContainerStyle={{padding:0}}>
								<View style={styles.row}>
									<Image source={{uri:music.image}} style={styles.detailImage}/>
									<View style={styles.rightPane}>
										<Text style={styles.title} numberOfLines={3}>{eu}{music.attrs.title}</Text>
										<Text style={styles.nomalText} numberOfLines={2}>演唱：{music.attrs.singer}</Text>
										<Text style={styles.nomalText}>日期：{music.attrs.pubdate}</Text>
										<View style={styles.nomalRow}>
											<Text style={styles.rateText}>豆瓣评分：</Text>
											<Text style={styles.rating}>
												{music.rating.average}
											</Text>
										</View>
									</View>
								</View>
								<View style={{flex:1,padding:10}}>
									<Text style={styles.nomalText}>简介：{music.summary}</Text>
								</View>
							</ScrollView>
						:
							<Loading/>
					}
				
			</View>
		);
	}
});

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
});


module.exports=DetailMusic;