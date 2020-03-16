import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, Thumbnail, ListItem, Title, Right, Left, Text, Toast, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {
    Linking, AsyncStorage, ActivityIndicator, ScrollView, NativeModules,
    StatusBar,Image, Alert, renderRow, ListView, Platform, Dimensions
} from 'react-native';
import AppBanner from '../components/appBanner';
import {Actions} from 'react-native-router-flux';
import Communications from 'react-native-communications';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'

import Icon6 from 'react-native-vector-icons/MaterialCommunityIcons'

import Icon5 from 'react-native-vector-icons/Entypo';
import Image2 from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Pulse from 'react-native-pulse';
import RNFS from 'react-native-fs';
import {CustomCachedImage} from "react-native-img-cache";
import {StackNavigator} from 'react-navigation';
import DetailsScreen from '../components/detailsBody';
// react-native-progress exports views that show progress.
import {createImageProgress} from 'react-native-image-progress';
export default class AppBodyData extends React.Component {


    constructor(props) {

        super(props);

        this.getData();

        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            imageLoading: true,
            isLoading: true,
            asb: [],
            rrr: '123',
            dataSource: dss.cloneWithRows([]),
            list: [],
            first: 1,
            reload: true,
            dialog: [],
            loaded: false,
            isUpdateReady:false,
            upDateLink:'',
        }

    }

    getData() {


        try {
            AsyncStorage.getItem('checkUpdates',(err,store)=>{
                const up = JSON.parse(store);
                console.log('sasasasasaw',up);

                if(Platform.OS==='android') {

                    this.setState({upDateLink: up[0].update_link});
                    if (up[0].update_isReady === '113') {
                        console.log('xsqws2',up[0].update_isReady);

                        this.setState({isUpdateReady: true})
                    }
                }
                if(Platform.OS==='ios'){

                    console.log('xsqws',up[1].update_isReady);

                    this.setState({upDateLink: up[1].update_link});
                    if (up[0].update_isReady === '113') {
                        this.setState({isUpdateReady: true})
                    }
                }

            });
            AsyncStorage.getItem('offerList', (err, stores) => {

                let listArray = JSON.parse(stores);
                // console.log(store, 'ghghghghgh');
                // console.log(err,'ghghghghgh');

                const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                console.log(listArray, 'mahnaz777');

                this.setState({
                    list: listArray,
                    isLoading: false,
                    dataSource: dss.cloneWithRows(listArray.map(function (tt) {
                        return tt
                    })),
                });
            });
        } catch (err) {
            console.log(err, 'hyhyhyhyhy')
        }
        //get offer list from koala server


        // console.log(this.state.dataSource,'rtrtrtrt');


        // console.log(this.state.names[i]);


    }


    buttonPress() {
        navigation.navigate('Details');

        console.log('hamashoon dozdan');
    }

    koon(ggoh) {
        return (
            ggoh.map(function (item) {
                let offers = item.offerprice;
                let prices = item.unitprice;
                let names = item.product_name;

                return {
                    offer: offers,
                    price: prices,
                    name: names
                };
            }))

    }

    gogo() {
        //AsyncStorage.setItem('product',fox);
        // return(
        //     Actions.details
        // )
        console.log('salaaaaaam');

    }

    test(moz, navi) {
        return (

            <View style={{backgroundColor: 'green'}}>

                {moz.map(function (item) {
                    function Test(uiui) {
                        AsyncStorage.setItem('product', JSON.stringify(uiui));
                        console.log(uiui, 'qwerty');
                        return (
                            Actions.details
                        )

                    }

                    // console.log(item,'jgjgjgjggj');
                    return (

                        <Button style={{width: 400, backgroundColor: 'yellow'}}
                                onPress={Test(1)}>


                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{backgroundColor: 'red', flexDirection: 'column'}}>
                                    <Text>
                                        {item.offerprice}
                                    </Text>
                                    <Text>
                                        {item.unitprice}
                                    </Text>

                                </View>
                                <Text>
                                    {item.product_name}

                                </Text>
                            </View>
                        </Button>

                    )


                })}


            </View>

        )
    }

    introduce() {
        Alert.alert(
            'Alert Title',
            'My Alert Msg',
            [
                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
        )
    }
    shoombol(){
        return(
            <Image source={require('../imageSource/koalaborder.png')}
                   />

        )
    }
    upGradeButton(){
                if(this.state.isUpdateReady){


        return(
            <View style={{alignItems:'center',justifyContent:'center'}}>
                <Pulse color='#E9D460' numPulses={5} diameter={200} speed={20} duration={2000} />

                <Icon6.Button style={{marginTop: 5}}
                       name='update'
                       backgroundColor="rgba(255,255,255,0)"
                       color="#ffffff" size={27}
                       onPress={() => introduce()}/>
            </View>
        )
                }
                return(
                    <View>

                    </View>
                )
    }
    updateMe() {
        Alert.alert(
            'کوالای جدید آماده است',
            'آن را نصب کنید  و از کوالای بهتر لذت ببرید',
            [

                {text: 'بعدا', onPress: () => console.log('OK lklklkllkll Pressed')},
                {text: 'باشه', onPress: () => this.upgrade()},

            ],
            {cancelable: true}
        )
    }
    upgrade() {
        // let filePath = RNFS.ExternalDirectoryPath + '/mykoala.apk';

        // NativeModules.InstallApk.install(filePath);

        Linking.canOpenURL(this.state.upDateLink).then(supported => {
            if (supported) {
                Linking.openURL(this.state.upDateLink);
                console.log("know how to open URI:fffdfdddfdf " + this.state.upDateLink);

            } else {
                console.log("Don't know how to open URI: " + this.state.upDateLink);
            }
        });

    }
    render() {


        function shest(uiui) {
            AsyncStorage.setItem('product', JSON.stringify(uiui));
            return (
            Actions.details()

        )


        }

        function goTelegram() {
            console.log('hihibyebye');
            Linking.canOpenURL('https://t.me/koalafruit').then(supported => {
                if (supported) {
                    Linking.openURL('https://t.me/koalafruit');
                    console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/koalafruit');

                } else {
                    console.log("Don't know how to open URI: " + 'https://t.me/koalafruit');
                }
            });

        }

        function callKoala() {
            console.log('hihibyebye');
            Linking.canOpenURL('https://t.me/visitou').then(supported => {
                if (supported) {
                    Linking.openURL('https://t.me/visitou');
                    console.log("Don't know how to open URI:fffdfdddfdf " + 'https://t.me/visitou');

                } else {
                    console.log("Don't know how to open URI: " + 'https://t.me/visitou');
                }
            });
        }

        function introduce() {
            Alert.alert(
                'در خدمتیم!',
                'جهت سفارش های خاص خود و یا ارتباط با ادمین کانال کوالافروت میتوانید با شماره زیر تماس حاصل فرمایید.۰۹۳۸۶۳۶۷۳۶۱',
                [

                    {text: 'خب', onPress: () => console.log('OK lklklkllkll Pressed')},
                    {text: 'کانال ما در تلگرام', onPress: () => goTelegram()},
                    {text: 'تماس با ما', onPress: () => callKoala()}

                ],
                {cancelable: true}
            )
        }



        if (this.state.isLoading) {

            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        console.log(width, 'frfrfrfrfrfr');

        return (
            <Container>

                <Header style={{backgroundColor: '#1bbc9b'}}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'center'}}>
                            <Icon4 style={{marginTop: 5}}
                                   name='lightbulb-on-outline'
                                   color="white" size={27}
                                   onPress={() => introduce()}/>

                        </View>

                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{
                                fontSize: 50, marginTop: 5, color: 'white', fontFamily: 'EternalCall',
                            }}>koala</Text>

                        </View>
                        {this.upGradeButton()}
                    </View>
                </Header>
                <Content style={{backgroundColor: '#00000000'}}>
                    <StatusBar
                        backgroundColor="#009688"
                        barStyle="default"
                    />
                    <ScrollView style={{backgroundColor: '#00000000'}}>
                        <View style={{backgroundColor: 'white', height: 2, width: width}}/>

                        <View style={{backgroundColor: 'red', marginTop: 0}}>
                            <AppBanner />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            padding: 7,
                            margin: 5,
                            marginBottom: 2,
                            marginTop: 3,
                            borderRadius: 7,
                            backgroundColor: 'white',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={{
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontFamily: 'DastNevis',
                                color: '#F22613',
                                fontSize: 27
                            }}> ویژه...</Text>
                            <Text style={{
                                paddingTop: 5,
                                paddingBottom: 5,
                                fontFamily: 'DastNevis',
                                color: '#22313F',
                                fontSize: 27
                            }}> پیشنهاد </Text>
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
                                        marginBottom: 2,
                                        marginRight: 5,
                                        marginLeft: 5,
                                        marginTop: 1,
                                        borderRadius: 7,
                                    }}>
                                        <Button style={{backgroundColor: 'white', height: 80}}
                                                onPress={() => shest(rowData)}>


                                            <View style={{flex: 1, flexDirection: 'row', marginLeft: 10}}>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text style={{
                                                        marginBottom: 10,
                                                        marginTop: 10,
                                                        color: 'green',
                                                        fontFamily: 'BYekan'
                                                    }}>
                                                        هر {rowData.orderunit} {rowData.offerprice} تومان

                                                    </Text>
                                                    <Text style={{
                                                        marginBottom: 10, marginTop: 10, color: 'red',
                                                        textDecorationLine: 'line-through',
                                                        textDecorationStyle: 'solid'
                                                        , fontFamily: 'BYekan'

                                                    }}>
                                                        هر {rowData.orderunit} {rowData.unitprice} تومان
                                                    </Text>


                                                </View>
                                                <Right>
                                                    <Text style={{
                                                        alignItems: 'center', marginRight: 7
                                                        , fontFamily: 'BYekan'
                                                    }}>
                                                        {rowData.product_name}

                                                    </Text>
                                                </Right>
                                            </View>
                                            <View style={{overflow: 'hidden', margin: 10, borderRadius: 7}}>
                                                <Image2
                                                    key={rowID}
                                                    source={{uri: rowData.small_image_link, cache: 'force-cache',}}
                                                    indicator={Progress}

                                                    style={{
                                                        width: 60,
                                                        height: 60
                                                    }}/>

                                            </View>


                                        </Button>

                                    </View>


                                </View>

                            }/>


                    </ScrollView>
                </Content>
            </Container>
        );

    }

}


module.export = AppBodyData;