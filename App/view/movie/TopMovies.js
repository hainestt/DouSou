/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var MovieItem=require('./MovieItem');
var Searchbar=require('../../components/searchbar');
var Loading=require('../../components/loading');


var api=require('../../components/api');

var {View,Text,Image,StyleSheet,ListView ,ToastAndroid}=React;

var PAGE_SIZE=20;
var REQUEST_URL=api.movie_top250+'?apikey='+api.api_key+'&count='+PAGE_SIZE;


var resultsCache = {
  dataForQuery: {},
  totalForQuery: {},
};

var TopMoviesList=React.createClass({
	getInitialState:function(){
		return{
			loading:false,
			loadingTail:false,
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2,}),
			queryNumber:0,
		};
	},
	componentWillMount :function(){
		this.fetchData();
	},
	getUrlAndPage:function(url,page){
		var re=/^[0-9]*[1-9][0-9]*$/;
		if(url && re.test(page)){
			return url+'&start='+page*PAGE_SIZE;
		}else{
			return REQUEST_URL;
		}
	},
	fetchData:function(){
		resultsCache.dataForQuery=null;
		fetch(this.getUrlAndPage(REQUEST_URL,this.state.queryNumber))
			.then((response)=>response.json())
			.then((responseData)=>{

				resultsCache.totalForQuery=responseData.total;
				resultsCache.dataForQuery=responseData.subjects;

				this.setState({
					loading:true,
					dataSource:this.state.dataSource.cloneWithRows(responseData.subjects),
				})
			})
			.done();
	},
	hasMore:function(){
		if(!resultsCache.dataForQuery){
			return true;
		}
		return(
			resultsCache.totalForQuery!==resultsCache.dataForQuery.length
		);
	},
	onEndReached:function(){
		if(!this.hasMore() || this.state.loadingTail){
			return;
		}

		this.setState({
			loadingTail:true,
			queryNumber:this.state.queryNumber+1,
		});
		fetch(this.getUrlAndPage(REQUEST_URL,this.state.queryNumber))
			.then((response)=>response.json())
			.catch((error)=>{
				console.error(error);
				this.setState({
					loadingTail:false,
				});
			})
			.then((responseData)=>{
				var moviesForQuery=resultsCache.dataForQuery.slice();
				if(!responseData.subjects){
					resultsCache.totalForQuery=moviesForQuery.length;
				}else{
					for(let i=0;i<responseData.subjects.length;i++){

						moviesForQuery.push(responseData.subjects[i]);
					}
					resultsCache.dataForQuery=moviesForQuery;
				}
				this.setState({
					loadingTail:false,
					dataSource:this.state.dataSource.cloneWithRows(resultsCache.dataForQuery)
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
		// var currentRoute=this.props.navigator.getCurrentRoutes();
		// ToastAndroid.show(currentRoute.length+'',ToastAndroid.SHORT);

		return(
			<View style={{flex:1}}>
			<Searchbar navigator={this.props.navigator}  title="TOP250"/>
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
					renderRow={(rowData)=><MovieItem navigator={this.props.navigator} rowData={rowData}/>}
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



module.exports=TopMoviesList;