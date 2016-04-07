/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var MusicItem=require('./MusicItem');
var Searchbar=require('../../components/searchbar');
var Loading=require('../../components/loading');
var api=require('../../components/api');

var {View,StyleSheet,ListView, ToastAndroid}=React;

var PAGE_SIZE=20;
var REQUEST_URL=api.music_search+'?apikey='+api.api_key+'&count='+PAGE_SIZE;

var resultCache={
	dataForQuery:{},
	totalForQuery:{},
	nextPageNumberForQuery:{}
};

var MusicList=React.createClass({
	getInitialState:function(){
		return{
			loading:false,
			loadingTail:false,
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
		};
	},
	componentDidMount:function(){
		this.fetchData();
	},
	getPage:function(page){
		return REQUEST_URL+'&q='+encodeURIComponent('刘德华')+'&start='+page*PAGE_SIZE;
	},
	fetchData:function(){
		resultCache.dataForQuery=null;
		fetch(this.getPage(0))
			.then((response)=>response.json())
			.then((responseData)=>{
				resultCache.totalForQuery=responseData.total;
				resultCache.dataForQuery=responseData.musics;
				resultCache.nextPageNumberForQuery=1;

				this.setState({
					loading:true,
					dataSource:this.state.dataSource.cloneWithRows(responseData.musics),
				});
			})
			.done();
	},
	hasMore:function(){
		if(!resultCache.dataForQuery){
			return true;
		}
		return(
			resultCache.totalForQuery!==resultCache.dataForQuery.length
		);
	},
	onEndReached:function(){
		if(!this.hasMore() || this.state.loadingTail){
			return ;
		}
		this.setState({
			loadingTail:true,
		});
		var page=resultCache.nextPageNumberForQuery;
		fetch(this.getPage(page))
			.then((response)=>response.json())
			.catch((error)=>{
				console.error(error);
				this.setState({
					loadingTail:false,
				});
			})
			.then((responseData)=>{
				var musicForQuery=resultCache.dataForQuery.slice();
				if(!responseData.musics){
					resultCache.totalForQuery=musicForQuery.length;
				}else{
					for(let i=0;i<responseData.musics.length;i++){
						musicForQuery.push(responseData.musics[i]);
					}
					resultCache.dataForQuery=musicForQuery;
					resultCache.nextPageNumberForQuery+=1;
				}
				this.setState({
					loadingTail:false,
					dataSource:this.state.dataSource.cloneWithRows(resultCache.dataForQuery),
				});

			})
			.done();
	},
	renderFooter:function(){
		if(!this.hasMore() || !this.state.loadingTail){
			return <View style={{marginVertical:20,}}/>
		}
		return(
			<Loading horizontal={true}/>
		);
	},
	render:function(){
		return(
			<View style={{flex:1}}>
				<Searchbar navigator={this.props.navigator} title="经典刘德华"/>
				{
					this.state.loading ?
						<ListView 
						automaticallyAdjustContentInsets={false}
						keyboardDismissMode="on-drag"
				        keyboardShouldPersistTaps={true}
				        showsVerticalScrollIndicator={false}
				        removeClippedSubviews ={true}
						dataSource={this.state.dataSource}
						onEndReached={this.onEndReached}
						renderFooter={this.renderFooter}
						renderRow={(rowData)=><MusicItem navigator={this.props.navigator} rowData={rowData}/>}
						style={styles.listView}/>
					:
					 	<Loading />
				}
			</View>
		);
	}
});

var styles=StyleSheet.create({
	listView:{
		flex:1,
		padding:0,
		backgroundColor:'#fff',
	},
});


module.exports=MusicList;