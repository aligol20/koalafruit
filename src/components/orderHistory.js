import React, {Component} from 'react';
import {StyleSheet, AsyncStorage, ActivityIndicator, Alert, Dimensions,renderRow,ListView,} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';

import {
    Container, Button, Header,
    List, ListItem, Toast, Root, Right, Text, Left, Thumbnail, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
export default class OrderHistory extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            asb: [],
            isLoading: true,
            info: [],
            dataSource: dss.cloneWithRows([]),
            list: [],

        }

    }

    getData() {
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                console.log(JSON.parse(store)[0].phone, 'mahnazparivash8');
                let pop = JSON.parse(store)[0].phone;
                let aani = [{mobile: pop}];
                this.setState({info: JSON.parse(store)});

                if (pop !== null) {
                    console.log(JSON.stringify(aani), 'mahnazparivash10');

                    let test = fetch('http://koalafruit.ir/api/readPurchaseHistory.php', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(aani)
                    }).then((response) => this.arrangePurchaseHistory(JSON.parse(response._bodyInit)));

                } else {

                }


            });

        }
        catch (error) {
            console.log(error);
            Toast.show({
                text: 'Wrong password!',
                position: 'bottom',
                buttonText: 'Okay'
            })
        }

    }

    arrangePurchaseHistory(data) {
        console.log(data,'jajajaja');

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            list: data,
            isLoading: false,
            dataSource: dss.cloneWithRows(data.map(function (itit) {
                return (
                    itit
                )
            })),
        })

    }

    componentDidMount() {

        this.getData();

        Toast.toastInstance = null;

    }

    signOut() {
        Alert.alert(
            'خروج از حساب ...',
            'آیا مطمین هستید؟',
            [
                {text: 'آره', onPress: () => this.signHimOut()},
                {text: 'نه', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},

            ],
            {cancelable: false}
        );

    }

    signHimOut() {
        AsyncStorage.removeItem('userInfo');
        Actions.feed();
    }

    render() {
        let moz = [];


        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        console.log('mahnazmahnaz', moz);

        return (
            <Root>
                <Content >
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 10, marginTop: 10, marginBottom: 10, marginRight: 10, marginLeft: 10
                    }}>

                        <Right style={{width: width, marginRight: 40, marginTop: 15}}>


                            <View style={{flexDirection: 'row', alignItems: 'flex-end', flex: 1, marginBottom: 10}}>
                                <Text style={{fontFamily:'BYekan',fontSize: 19}}>{this.state.info[0].name}</Text>
                                <Text style={{fontFamily:'BYekan',fontSize: 19}}>{this.state.info[0].family}</Text>
                            </View>
                            <Text style={{fontSize: 19}}>{this.state.info[0].phone}</Text>

                        </Right>


                        <Button style={{
                            backgroundColor: 'white', marginBottom: 10, marginLeft: 10
                            , borderWidth: 2, borderRadius: 7, borderColor: '#EF4836'
                        }}
                                onPress={() => this.signOut()}>
                            <Icon2 style={{marginLeft: 5}} name='log-out' color="red" size={27}/>
                            <Text style={{fontFamily:'BYekan',color:'#EF4836'}}>خروج از حساب </Text>
                        </Button>
                    </View>

                    <ListView
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, rowID, sectionID) =>

                        <View style={{
                            backgroundColor: '#00000000',
                            width: width
                        }}>


                                        <View style={{
                                            marginBottom: 5,
                                            marginRight: 5,
                                            marginTop: 5,
                                            marginLeft: 5,
                                            borderRadius: 7,
                                            backgroundColor: 'white',
                                            flex: 1,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between'
                                        }}>
                                            <View style={{
                                                flexDirection: 'column', width: width / 3, justifyContent: 'center'
                                                , alignItems: 'center', marginLeft: 10
                                            }}>
                                                <Icon name='check' color="green"/>
                                                <Text
                                                    style={{fontFamily:'BYekan',fontSize: 13, color: '#1E824C'}}>{rowData.delivery_time}</Text>
                                            </View>
                                            <View style={{
                                                width: 2, backgroundColor: '#BDC3C7'
                                                , marginTop: 20, marginBottom: 20, marginRight: 10
                                                , marginLeft: 10, borderRadius: 1
                                                , justifyContent: 'center'
                                            }}>

                                            </View>

                                            <View style={{flexDirection: 'column'}}>
                                                <Text style={{fontFamily:'BYekan',
                                                    marginBottom: 10, marginTop: 10,
                                                    color: '#19B5FE'
                                                }}>
                                                    {rowData.order_unit} {rowData.order_mount}

                                                </Text>
                                                <Text style={{
                                                    marginBottom: 10,fontFamily:'BYekan', marginTop: 10, color: '#1F3A93',

                                                }}>
                                                    {rowData.order_price * rowData.order_mount}
                                                </Text>


                                            </View>
                                            <Right>
                                                <Text style={{fontFamily:'BYekan',
                                                    alignItems: 'center', marginRight: 10, color: '#34495E'
                                                }}>
                                                    {rowData.order_name}

                                                </Text>
                                            </Right>
                                        </View>








                            </View>
                        }/>


                </Content>
            </Root>
        );

    }
}

module.export = OrderHistory;