/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {StyleSheet, AsyncStorage,NetInfo,Alert, StatusBar,ActivityIndicator,Image,Text, View} from 'react-native';
import React, {Component} from 'react';
import {Container, Button} from 'native-base';
import AppFooter from './src/components/appFooter.js';
import AppBodyData from './src/components/appBodyData';
import Cart from './src/components/cart';
import {Router, Scene} from 'react-native-router-flux';
import Search from './src/components/pages/search';
import Address from './src/components/address';
import Final from './src/components/final';
import DetailsScreen from './src/components/detailsBody';
import Category from './src/components/appCategory';
import Account from './src/components/appaccount';
import ProductList from './src/components/productList';
import LoginMain from './src/components/loginMain';
import Register from './src/components/register';
import OrderHistory from './src/components/orderHistory'
import Intro from './src/components/intro';
import {Actions} from 'react-native-router-flux';
import Pp from './src/components/pp';
import SplashScreen from 'react-native-splash-screen'
import RNExitApp from 'react-native-exit-app-no-history';
import Toast from 'react-native-simple-toast';

let catTi = 0;
const gooz = 7;


export default class App extends Component<{}> {

    constructor(props) {

        super(props);
        this.state = {
            userTitle: '',
            catTi: '',
            intro: true,
            name: 'intro',
            component: Intro,
            koon: 5,
            offer: false,
            shir: 1,
            khar:true,
            connection:false,
        };
        this.fetchJsons();

        // if(this.state.connection){
        //     this.fetchJsons()
        // }else {
        //  RNExitApp.exitApp();
        //
        // }


    }

    componentWillMount() {
        AsyncStorage.getItem('introSeen', (err, store) => {
            console.log(store, 'ridim...2');
            if (store !== null) {
                this.setState({shir:3})
            } else {
                this.setState({shir:7});
            }


        });


    }
    fetchJsons() {
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
        function handleFirstConnectivityChange(isConnected) {

            console.log('Then,shoombool is ' + (isConnected ? 'online' : 'offline'));
            // this.setState({connection:true});
            if (isConnected){
                try {

                    // Promise.all() lets us coalesce multiple promises into a single super-promise

                    fetch('http://koalafruit.com/api/readProducts_offer.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('offerList', JSON.stringify(responseJson));

                            console.log(responseJson,'offerList')

                        });
                    fetch('http://koalafruit.com/api/readProducts.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('allProducts', JSON.stringify(responseJson));

                            console.log(responseJson,'allProducts')

                        });
                    fetch('http://koalafruit.com/api/readCategory.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('categoryList', JSON.stringify(responseJson));

                            console.log(responseJson,'categoryList')

                        });
                    fetch('http://koalafruit.com/api/readLocals.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('localsList', JSON.stringify(responseJson));

                            console.log(responseJson,'localsList')

                        });
                    fetch('http://koalafruit.com/api/read_delivery_time.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryTimes', JSON.stringify(responseJson));

                            console.log(responseJson,'deliveryTimes')

                        });
                    fetch('http://koalafruit.com/api/read_delivery_text.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryText', JSON.stringify(responseJson));

                            console.log(responseJson,'deliveryText')

                        });
                    fetch('http://koalafruit.com/api/get_dialogs.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('dialogs', JSON.stringify(responseJson));
                            console.log(responseJson,'dialogs')
                            const ghoo = responseJson.filter(x => x.dialog_type.includes("firstdialog"));


                        });
                    fetch('http://koalafruit.com/api/checkupdate.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('checkUpdates', JSON.stringify(responseJson));

                            console.log(responseJson,'checkUpdates')

                        });
                    fetch('http://koalafruit.com/api/read_delivery_costs.php')
                        .then((response) => response.json())
                        .then((responseJson) => {
                            AsyncStorage.setItem('deliveryCost', JSON.stringify(responseJson));
                            SplashScreen.hide();


                        });





                    //
                    // AsyncStorage.setItem('offerList', JSON.stringify(data[0]));
                    // AsyncStorage.setItem('allProducts', JSON.stringify(data[1]));
                    // AsyncStorage.setItem('categoryList', JSON.stringify(data[2]));
                    // AsyncStorage.setItem('localsList', JSON.stringify(data[3]));
                    // AsyncStorage.setItem('deliveryTimes', JSON.stringify(data[4]));
                    // AsyncStorage.setItem('deliveryText', JSON.stringify(data[5]));
                    // AsyncStorage.setItem('dialogs', JSON.stringify(data[6]));
                    // AsyncStorage.setItem('checkUpdates', JSON.stringify(data[7]));
                    // AsyncStorage.setItem('deliveryCost', JSON.stringify(data[8]));


                    // for (var i of data) {
                    //     console.log(`RESPONSE ITEM \n`);
                    //     for (var obj of i) {
                    //         console.log(obj);
                    //         console.log(i,'kooni');
                    //         console.log(obj,'kooni');
                    //         //logger utility method, logs output to screen
                    //         //console.log(obj);
                    //     }
                    // }

                    // await this.setState({loaded:data[0]});

                } catch (error) {
                    console.log(error, 'akhond dozd');
                }
            }else {
                RNExitApp.exitApp();



            }


            NetInfo.isConnected.removeEventListener(
                'connectionChange',
                handleFirstConnectivityChange
            );
        }
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            handleFirstConnectivityChange
        );

        console.log('ridim...');

        // if(this.state.connection){

        // }else {
        //     Alert.alert(
        //         'پیغام',
        //         'اتصال اینترنت خود را بررسی کنید',
        //
        //         [
        //
        //             {text: 'خب', onPress: () => console.log('OK Pressed')},
        //         ],
        //         { cancelable: false }
        //     );
        //     // RNExitApp.exitApp();
        //
        //
        // }

        console.log('ridim...234');

    }



    onBackFunction() {
        console.log("mahnazparivash20");
        Actions.cart();
    }

    onBackPress = () => {
        if (Actions.currentScene === 'feed') {
            return false
        }
        Actions.pop();
        return true
    };


    render() {


        let rrr='';


        console.log( Actions.currentScene,'ridim...478');

        // console.log( frd,'ridim...437');


        if (this.state.shir === 7) {
            return (
                <Container>

                    <Router backAndroidHandler={this.onBackPress}>

                        <Scene key="root">
                            <Scene key="intro" component={Intro} title="خانه" hideNavBar={true}/>
                            <Scene key="feed" component={AppBodyData} title="خانه" hideNavBar={true}/>
                            <Scene key="cart" component={Cart} title="سبد خرید"/>
                            <Scene key="search" component={Search} title="جستجو"/>
                            <Scene key="address" component={Address} title="ثبت آدرس"
                                   onBack={() => this.onBackFunction()}/>
                            <Scene key="final" component={Final} title="تایید نهایی"/>
                            <Scene key="details" component={DetailsScreen} title="salam"/>
                            <Scene key="category" component={Category} title="دسته بندی "/>
                            <Scene key="account" component={Account} title="حساب"/>
                            <Scene key="loginMain" component={LoginMain} title="ورود" hideNavBar={true}/>
                            <Scene key="register" component={Register} title="ثبت نام"/>
                            <Scene key="products" component={ProductList} title='محصول'/>
                            <Scene key="orderHistory" component={OrderHistory} title='حساب کاربری'/>


                        </Scene>
                    </Router>
                    <AppFooter/>
                </Container>
            );
        }
        if (this.state.shir === 3) {
            return (
                <Container>

                    <Router backAndroidHandler={this.onBackPress}>

                        <Scene key="root">
                            <Scene key="feed" component={AppBodyData} title="خانه"  hideNavBar={true} />
                            <Scene key="cart" component={Cart} title="سبد خرید"/>
                            <Scene key="search" component={Search} title="جستجو"/>
                            <Scene key="address" component={Address} title="ثبت آدرس"
                                   onBack={() => this.onBackFunction()}/>
                            <Scene key="final" component={Final} title="تایید نهایی"/>
                            <Scene key="details" component={DetailsScreen} title="دسته بندی "/>
                            <Scene key="category" component={Category} title="دسته بندی "/>
                            <Scene key="account" component={Account} title="حساب"/>
                            <Scene key="loginMain" component={LoginMain} title="ورود" hideNavBar={true}/>
                            <Scene key="register" component={Register} title="ثبت نام"/>
                            <Scene key="products" component={ProductList} title='محصول'/>
                            <Scene key="orderHistory" component={OrderHistory} title='حساب کاربری'/>


                        </Scene>
                    </Router>
                    <AppFooter/>
                </Container>
            );
        }
        else {
            return (
                <Container style={{backgroundColor:'white'}}>

                </Container>
            );
        }


    }


}
