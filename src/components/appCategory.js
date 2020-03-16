import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, ListItem, Text, Thumbnail, View, Body, Content,Right, Footer, FooterTab, Badge
} from 'native-base';
import {AsyncStorage,ActivityIndicator,Dimensions,renderRow,ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';



export default class Category extends Component {
    constructor(props) {

        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            isLoading: true,
            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRows([]),
            list: [],

        }

    }
    getCategory() {
        let listArray=[];
        AsyncStorage.getItem('categoryList',(err, store) => {

            listArray = JSON.parse(store);
            console.log(listArray,'ghghghghgh');

            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                list: listArray,
                isLoading: false,
                dataSource: dss.cloneWithRows(listArray.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })
        });
        //get offer list from koala server


        console.log(this.state.dataSource,'rtrtrtrt');


        // console.log(this.state.names[i]);

        var test2 = [];



    }
    componentDidMount() {
        this.getCategory();

    }
    render() {
        function shest(uiui) {
            AsyncStorage.setItem('selectedCategory',JSON.stringify(uiui.cat_name));
            console.log(uiui.cat_name,'qwerty');
            return(
                Actions.products({ title: uiui.cat_name })
            )


        }
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        const {navigate} = this.props.navigation;
        let width = Dimensions.get('window').width; //full width

        return (

            <Content  >

                <ListView
                    style={{width: width, backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>

                        <Button style={{
                            borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                            , justifyContent: 'center', alignItems: 'center', margin: 2,height:80
                        }} onPress={() => shest(rowData)}>
                            <View style={{overflow: 'hidden',margin:10,borderRadius:7}}>
                                <Image
                                    component={Image}
                                    source={{ uri: rowData.cat_url,   cache: 'force-cache',
                                    }}
                                    indicator={Progress}
                                    style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 7,
                                        backgroundColor: '#00000000'
                                    }}/>

                            </View>
                            <Right>
                                <View>

                                    <Text style={{margin: 10,fontFamily:'BYekan'}}>{rowData.cat_name}</Text>


                                </View>
                            </Right>

                        </Button>
                    }/>


            </Content>
        );

    }

}

module.export = Category;