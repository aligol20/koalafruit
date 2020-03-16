import React, {Component} from 'react';
import {Container, Content, Header, Item,Right, Input, Icon, Button, Text, List, ListItem, View} from 'native-base';
import {StyleSheet, AsyncStorage, ActivityIndicator,Dimensions,Image,renderRow,ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import foot from '../appFooter';
import { ProgressDialog } from 'react-native-simple-dialogs';

export default class Search extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            item: '',
            asb: [],
            isLoading: false,
            dataSource: dss.cloneWithRows([]),
            list: [],
        }
    }

    searchMe(value) {

        this.setState({isLoading:true});
        if (value === '') {
            this.setState({item: 'nothing'});

        } else {
            this.setState({item: value});

        }
        AsyncStorage.getItem('allProducts', (err, stores) => {
            let r = JSON.parse(stores);
            console.log(r, 'mahnazparivash15');

            let ghoo = r.filter(x => x.product_name.includes(this.state.item) && x.unitprice !== 'no');

            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                list: ghoo,
                isLoading: false,
                dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            });

            //console.log(ghoo,'mahnazparivash14');


        });
    }

    render() {
        function shest(uiui) {
            AsyncStorage.setItem('product', JSON.stringify(uiui));
            console.log(uiui, 'qwerty');
            return (
                Actions.details()
            )
        }

        let width = Dimensions.get('window').width; //full width

        return (
            <Content>

                <Item  style={{
                    backgroundColor: 'white',borderRadius:7,
                    marginLeft: 10, marginRight: 10, marginTop: 10,marginBottom:20,
                }}>
                    <Icon name="ios-search" style={{marginLeft: 5}}/>
                    <Input placeholder="محصول مورد نظرتان را بیابید"
                           onChangeText={(value => this.searchMe(value))}/>
                </Item>
                {this.state.isLoading && (
                    <ActivityIndicator
                        style={{ height: 80 }}
                        color="#6C7A89"
                        size="small"
                    />
                )}
                <ListView
                    style={{width: width, backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>

                    <View style={{
                        backgroundColor: '#00000000',
                        width: width
                    }}>


                                    <Button style={{backgroundColor: 'white', height: 120,
                                        marginBottom: 5,
                                        marginRight: 5,
                                        marginLeft:5}}
                                            onPress={() => shest(rowData)}>


                                        <View style={{flex: 1, flexDirection: 'row',marginLeft:20}}>
                                            <View style={{ flexDirection: 'column'}}>

                                                <Text style={{color:'green',fontFamily:'BYekan'}}>
                                                    {rowData.unitprice}
                                                </Text>

                                            </View>
                                            <Right>
                                                <Text style={{fontFamily:'BYekan'}}>
                                                    {rowData.product_name}

                                                </Text>
                                            </Right>
                                        </View>
                                        <Image
                                            source={{uri: rowData.image_link}}



                                            style={{
                                                margin:10,
                                                width:100,
                                                height:100,
                                                borderRadius:7,
                                                backgroundColor:'#00000000'}}/>
                                    </Button>




                        </View>
                    }/>
            </Content>
        );
    }
}

module.export = Search;