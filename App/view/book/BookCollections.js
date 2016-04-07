/**
 * h.t 2015
 * 
 */
'use strict';

var React = require('react-native');
var BookItem=require('./BookItem');
var Searchbar=require('../../components/searchbar');
var Loading=require('../../components/loading');
var api=require('../../components/api');

var {View,Text,Image,ListView,ScrollView,PullToRefreshViewAndroid} = React;

var REQUEST_URL=api.personal_collections+'?apikey='+api.api_key;

var BookCollectionList=React.createClass({
	getInitialState:function(){
		return {
			dataSource:new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
			loading:false,
			isRefreshing:false,
		};
	},
	componentDidMount:function(){
		this.fetchData();
	},
	fetchData:function(){
		fetch(REQUEST_URL)
			.then((response)=>response.json())
			.then((responseData)=>{
				this.setState({
					dataSource:this.state.dataSource.cloneWithRows(responseData.collections),
					loading:true,
				});
			})
			.done();
	},
	onRefresh:function(){
		this.setState({isRefreshing:true});
		setTimeout(()=>{
			this.fetchData();
			this.setState({
				isRefreshing:false,
			})
		},2000);
		
	},
	render:function(){
		return(
			<View style={{flex:1}}>
				<Searchbar navigator={this.props.navigator} title="个人推荐"/>
					{
						this.state.loading ?
							<PullToRefreshViewAndroid 
								refreshing={this.state.isRefreshing}
								onRefresh={this.onRefresh}
								colors={['#ff0000', '#00ff00', '#0000ff']}
								progressBackgroundColor={'#fff'}
								style={{flex:1}}>
								<ScrollView style={{flex:10}} removeClippedSubviews={true}>
									<ListView 
									dataSource={this.state.dataSource}
									renderRow={(rowData)=><BookItem navigator={this.props.navigator} rowData={rowData.book}/>}
									style={{flex:1,padding:10}}/>
								</ScrollView>
							</PullToRefreshViewAndroid>
						:
							<Loading />
					}
				
			</View>
		);
	}
});

module.exports=BookCollectionList;