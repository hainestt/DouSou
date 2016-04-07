/**
 * h.t 2015
 * 
 */
'use strict';

var React = require('react-native');
var BookItem=require('./BookItem');
var SearchInput=require('../../components/searchInput');
var Loading=require('../../components/loading');
var api=require('../../components/api');


var {View,Text,Image,ListView,TextInput,ScrollView,StyleSheet,TouchableHighlight}=React;

var PAGE_SIZE=255;
var baseSearchURL=api.book_search+'?apikey='+api.api_key+'&count='+PAGE_SIZE;

var BookList=React.createClass({
	getInitialState:function(){
		return{
			loading:false,
			dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
			filter:'JavaScript',
		};	
	},
	componentDidMount:function(){
		this.searchBooks(this.state.filter);
	},
	getURL:function(str){
		if(str){
			this.setState({filter:str});
			return(
				baseSearchURL+'&q='+this.state.filter
			);
		}else{
			this.setState({filter:'JavaScript'});
			return(
				baseSearchURL+'&q='+this.state.filter
			);
		}
	},
	getDataSource:function(str :Array<any>): ListView.DataSource{
		return this.state.dataSource.cloneWithRows(str);
	},
	searchBooks:function(str){
		this.setState({loading:true});

		fetch(this.getURL(str))
			.then((response)=>response.json())
			.catch((error)=>{
				this.setState({
					dataSource:this.getDataSource([]),
					loading:false,
				});
			})
			.then((responseDate)=>{
				if(this.state.filter!==str){
					return;
				}
				this.setState({
					loading:false,
					dataSource:this.getDataSource(responseDate.books),
				});
			})
			.done();
	},
	handleChangeText:function(str){
		this.searchBooks(str);
	},
	handlePress:function(){
		this.props.navigator.pop();
	},
	render:function(){
		return(
			<View style={{flex:1}}>
				<SearchInput onPress={this.handlePress} 
				onChangeText={this.handleChangeText} 
				defaultValue="Javascript"/>
				{
					this.state.loading ?

					<Loading />
					:

					<ListView 
						showsVerticalScrollIndicator={false}
						dataSource={this.state.dataSource}
						renderRow={(rowData)=><BookItem navigator={this.props.navigator} rowData={rowData}/>}
						style={{flex:1,padding:10,}}>
					</ListView>

				}
				
			</View>

		);
		
	}
});



module.exports=BookList;
