/**
 * h.t 2015-11
 * 
 */
'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/FontAwesome');

var {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    ToastAndroid,
    Dimensions,
    ViewPagerAndroid,
    Image,
} = React;

var PAGES=3;
var COM_PAGES=[
    require('./view/book'),
    require('./view/music'),
    require('./view/movie'),
];
var ICON_MENU=[
    <Icon name="book" size={22}/>,
    <Icon  name="music" size={22}/>,
    <Icon  name="film" size={22}/>,
];
var BTN_WIDTH=Dimensions.get('window').width/PAGES;


var NavButton=React.createClass({
    handlePress:function(){
        if(!this.props.enabled && this.props.onPress){
            this.props.onPress();
        }
    },
    handelIconSel:function(index,flag){
        return (
            <Text style={[styles.button_icon,flag ? styles.active : {}]}>
                {ICON_MENU[index]}
            </Text>
        );
    },
    render:function(){
        return(
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View style={styles.button}>
                    {this.handelIconSel(this.props.NavId,this.props.enabled)}
                    <Text style={[styles.button_text,this.props.enabled ? styles.active : {}]}>
                        {this.props.text}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
});


/*入口函数*/ 
var Main=React.createClass({
    getInitialState:function(){
        return{
            page:0,
            selectedState:{
                a:true,
                b:false,
                c:false,
            }
        };
    },
    handleEnabled:function(page){
        switch(page){
            case 0:
                this.setState({selectedState:{a:true,b:false,c:false}});
                break;
            case 1:
                this.setState({selectedState:{a:false,b:true,c:false}});
                break;
            case 2:
                this.setState({selectedState:{a:false,b:false,c:true}});
                break;
        }
    },
    onPageSelected:function(e){
        this.setState({
            page:e.nativeEvent.position
        });
        this.handleEnabled(e.nativeEvent.position);
        // ToastAndroid.show(e.nativeEvent.position+' ',ToastAndroid.SHORT);
    },
    go:function(page){
        this.viewPage && this.viewPage.setPageWithoutAnimation(page);
        this.setState({page});
        this.handleEnabled(page);
    },
    render:function(){
        var pages=[];
        for(var i=0;i<PAGES;i++){
            var Components=COM_PAGES[i];
            pages.push(
                <View key={i} collapsable={false} >
                    <Components />
                </View>
            );
        }
        var {selectedState}=this.state;
        return(
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <ViewPagerAndroid 
                style={{flex:1}}
                initialPage={0}
                keyboardDismissMode="on-drag"
                onPageSelected={this.onPageSelected}
                ref={viewPage => {this.viewPage = viewPage}}
                >
                    {pages}
                </ViewPagerAndroid>
                <View style={styles.buttons}>
                    <NavButton NavId={0} text="阅读" enabled={selectedState.a} onPress={() => this.go(0)}/>
              
                    <NavButton NavId={1} text="音乐" enabled={selectedState.b} onPress={()=>this.go(1)}/>

                    <NavButton NavId={2} text="电影" enabled={selectedState.c} onPress={() => this.go(2)}/>
                </View>
            </View> 
        );
    }
});

var styles=StyleSheet.create({
    buttons:{
        flexDirection:'row',
        height:42,
        marginTop:10,
        alignItems:'center',
        justifyContent:'space-between',
    },
    button:{
        flex:1,
        width:BTN_WIDTH,
        borderTopColor:'#CCCCCC',
        borderTopWidth:0.3,
        paddingTop:8,
        paddingBottom:10,
        justifyContent:'center',
        alignItems:'center',
    },
    button_icon:{
        width:25,
        height:25,
        fontSize:23,
        color:'gray',
    },
    button_text:{
        color:'gray',
    },
    active:{
        color:'#336633',
    },
  
});



module.exports=Main;

