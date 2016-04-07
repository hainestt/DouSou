/**
 * h.t 2015-12
 * 
 */
'use strict';

var React=require('react-native');
var MovieItem=require('./MovieItem');
var SearchInput=require('../../components/searchInput');
var Loading=require('../../components/loading');


var api=require('../../components/api');

var {View,Text,Image,StyleSheet,ListView,ToastAndroid}= React;

var PAGE_SIZE=20;
var REQUEST_URL=api.movie_search+'?apikey='+api.api_key+'&count='+PAGE_SIZE;


var resultCache={
	dataForQuery:{},
	nextPageNumberForQuery:{},
	totalForQuery:{},
};

var LOADING={};

var SearchScreen=React.createClass({
	getInitialState:function(){
		return{
			loading:false,
			loadingTail:false,
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
			keyWord:'',
		};
	},
	getURlAndPage:function(str,page){
		return REQUEST_URL+'&q='+encodeURIComponent(str)+'&start='+page*PAGE_SIZE;
	},
	searchMovie:function(str){
		this.setState({keyWord:str,});

		LOADING[str]=true;
		resultCache.dataForQuery[str]=null;
		this.setState({
			loading:true,
			loadingTail:false,
		});

		fetch(this.getURlAndPage(str,0))
		.then((response)=>response.json())
		.catch((error)=>{
			LOADING[str]=false;
			resultCache.dataForQuery[str]=undefined;
			this.setState({
				dataSource:this.state.dataSource.cloneWithRows([]),
				loading:false,
			});
		})
		.then((responseData)=>{
			LOADING[str]=false;
			resultCache.totalForQuery[str]=responseData.total;
			resultCache.dataForQuery[str]=responseData.subjects;
			resultCache.nextPageNumberForQuery[str]=1;

			if(this.state.keyWord!==str){
				return;
			}
			this.setState({
				loading:false,
				dataSource:this.state.dataSource.cloneWithRows(responseData.subjects),
			});
		})
		.done();
		
	},
	hasMore:function(){
		var str=this.state.keyWord;
		if(!resultCache.dataForQuery[str]){
			return true;
		}
		return (
			resultCache.totalForQuery[str]!==resultCache.dataForQuery[str].length
		);
	},
	onEndReached:function(){
		var str=this.state.keyWord;
		if(!this.hasMore() || this.state.loadingTail){
			return;
		}
		if(LOADING[str]){
			return;
		}
		LOADING[str]=true;
		this.setState({
			loadingTail:true,
		});

		var page=resultCache.nextPageNumberForQuery[str];

		fetch(this.getURlAndPage(str,page))
			.then((response)=>response.json())
			.catch((error)=>{
				console.error(error);
				LOADING[str]=false;
				this.setState({
					loadingTail:false,
				});
			})
			.then((responseData)=>{
				var moviesForQuery=resultCache.dataForQuery[str].slice();
// ToastAndroid.show(moviesForQuery+'',ToastAndroid.LONG);//
				
				LOADING[str]=false;
				if(!responseData.subjects){
					resultCache.totalForQuery[str]=moviesForQuery.length;
				}else{
					for(let i=0;i<responseData.subjects.length;i++){
						moviesForQuery.push(responseData.subjects[i]);
					}
					resultCache.dataForQuery[str]=moviesForQuery;
					resultCache.nextPageNumberForQuery[str]+=1;
				}
				if (this.state.keyWord !== str) {
		          	return;
		        }
				this.setState({
					loadingTail:false,
					dataSource:this.state.dataSource.cloneWithRows(resultCache.dataForQuery[str]),
				})
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
	handlePress:function(){
		this.props.navigator.pop();
	},
	handleChangeText:function(str){
		this.searchMovie(str);
	},
	render:function(){
		var content=this.state.dataSource.getRowCount()===0 ?
				<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
					<Image source={require('image!ic_funny')} style={{width:150,height:150}}/>
				</View>
			:
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
		return(
			<View style={{flex:1}}>
				<SearchInput onPress={this.handlePress} 
				onChangeText={this.handleChangeText} 
				defaultValue=" "/>
				
					{content}
				
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

module.exports=SearchScreen;