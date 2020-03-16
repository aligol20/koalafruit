/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Container, Body, Center,Content, Right, Root, Icon, Button, Text} from 'native-base';
import {StyleSheet, View, Dimensions, AsyncStorage, ActivityIndicator,ScrollView} from 'react-native';
import Picker from 'react-native-picker';
import Toast from 'react-native-simple-toast';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Carousel from 'react-native-banner-carousel';


let PickerItem = Picker.Item;
let choose = 0;
const BannerWidth = Dimensions.get('window').width;

export default class DetailsScreen extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mount: 1,
            name: '',
            qwe: [],
            frf: [],
            isLoading: true,
            imageList:[],
            imageUrl:'',
            imageLoaded:false,
        };
        AsyncStorage.getItem('product', (err, result) => {
            goo = JSON.parse(result);

            let aani = [{id: goo.product_id}];
            this.setState({frf: goo,
                isLoading: false,imageUrl:aani});


        });

    }
    doThis(){

        let width = Dimensions.get('window').width; //full width

        let goo = [];
        let koo= [];
        AsyncStorage.getItem('product', (err, result) => {
            goo = JSON.parse(result);

            let aani = [{id: goo.product_id}];
            this.setState({frf: goo,
                isLoading: false,imageUrl:aani});

            console.log(aani,'dldkfkdff');


        });


    }
    getImages(){
        let yyy= this.state.imageUrl;
        console.log(yyy,'lkdkldkd');

    }
    static navigationOptions = {
        title: '',
    };
    boos(koon) {

        return (

            <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{marginBottom: 10, marginTop: 10, color: 'green'}}>
                        هر {koon.orderunit} {koon.unitprice}
                    </Text>
                    <Text style={{
                        marginBottom: 10, marginTop: 10, color: 'red',
                        textDecorationLine: 'line-through',
                        textDecorationStyle: 'solid',
                    }}>
                        {koon.offerprice}
                    </Text>


                </View>


                <Right>
                    <Text style={{
                        alignItems: 'center', marginRight: 10
                    }}>
                        {koon.product_name}

                    </Text>
                </Right>
            </View>
        )

    }
    darekoon(chos) {
        console.log(chos, 'now');
        console.log(this.state.mount, 'before');
        this.setState({mount: chos}, function () {
            console.log(this.state.mount, 'after');
            choose = chos;

        });
        console.log(this.state.mount, 'after2');

        console.log(choose, 'asa');

    }
    yar() {
        console.log(this.state.mount, 'check');
        return (
            this.state.mount
        );
    }
    gooz(detail) {
        console.log(detail, 'dkdkfjkdf');
        const item = [];
        const max = detail.max_order * 2;
        let min = detail.minorder;
        let half = 0;
        let i = 0;
        if (detail.orderunit === 'کیلو') {
            for (i; i < max; i++) {
                half = half + 0.5;
                item.push({
                    key: i,
                    label: half.toString() +'   '+ '  کیلو',
                    value: half
                });
                // item.push(half.toString() + '  کیلو');
                console.log(item.map(function (itiy) {
                    return (
                        itiy.value
                    )
                }), 'gohgoh');
            }
        } else {
            for (min; min < max; min++) {

                item.push({
                    key: min ,
                    label: min  +'   '+ detail.orderunit,
                    value: min
                });
                // item.push(half.toString() + '  کیلو');
                console.log(item.map(function (itiy) {
                    return (
                        itiy.value
                    )
                }), 'gohgoh');
            }
        }
        Picker.init({
            pickerData: item.map(function (itit) {

                return (
                    itit.label
                );
            }),
            pickerBg: [236, 240, 241, 1.0],
            pickerConfirmBtnText: 'خوبه',
            pickerFontSize:19,
            pickerConfirmBtnColor:[34, 167, 240,1.0],
            pickerCancelBtnColor:[108, 122, 137,1.0],
            pickerFontColor:[58, 83, 155,1.0],
            pickerCancelBtnText: 'فعلا نه',
            pickerTitleText: 'مقدار را انتخاب کنید',
            pickerToolBarBg:[245, 245, 245,1.0],
            onPickerConfirm: item => {
                console.log(item, 'sellllected');
                this.setState({
                    mount: item,
                    showToast: false


                });

                this.saveMountSelected(parseFloat(item), detail)


            },
            onPickerCancel: item => {
                console.log(item);
            },
            onPickerSelect: item => {
                console.log(item);
            }
        });
        Picker.show();
    }
    saveMountSelected(mount, detail) {

        // AppFooter.forceUpdate();
        //save new orders with mount in asyncstorage
        try {
            let newOrder = {
                porduct_id: detail.product_id,
                product_name: detail.product_name,
                product_mount: mount,
                unitPrice: detail.unitprice,
                orderUnit: detail.orderunit,
                image: detail.image_link,
                max_order: detail.max_order,
                min_order: detail.minorder,
            };
            AsyncStorage.setItem('order' + detail.product_id, JSON.stringify(newOrder));

            AsyncStorage.getItem(detail.product_id, (err, result) => {
                const fff = JSON.parse(result);
                // console.log(detail.product_id,'sljcnasjnj');
                // console.log(fff.product_Name,'sljcnasjnj');

            });

            Toast.show('به سبد شما اضافه شد');

        } catch (error) {

            // Error saving data
        }


    }
    renderPage() {
        fetch('http://koalafruit.ir/api/image_list.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state.imageUrl)
        }).then((response) => this.setState({imageList: JSON.parse(response._bodyInit),imageLoaded:true}));

        if(this.state.imageLoaded){
                return this.state.imageList.map((data) => {
                    return (
                        <View key={data.image_link} style={{height: BannerWidth}}>
                            <Image
                                indicator={Progress}

                                style={{width: BannerWidth, height: BannerWidth}}

                                source={{uri: data.image_link, cache: 'force-cache',}}/>
                        </View>
                    );
                })


            }else {
                return (
                    <View style={{flex: 1, paddingTop: 20,height:BannerWidth}}>
                        <ActivityIndicator />
                    </View>
                );

            }







    };
    offerVisible(){
        if (this.state.frf.offer === '0'){
            return(
                <View style={{flexDirection: 'column'}}>

                <Text style={{marginBottom: 10, marginTop: 10, color: 'green'}}>
                هر {this.state.frf.orderunit} {this.state.frf.offerprice} تومان
            </Text>
                <Text style={{
                    marginBottom: 10, marginTop: 10, color: 'red',
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                }}>
                    هر {this.state.frf.orderunit}{this.state.frf.unitprice}تومان
                </Text>
                </View>
            )
        }
        return(
            <View style={{flexDirection: 'column'}}>

                <Text style={{marginBottom: 10, marginTop: 10, color: 'green'}}>
                    هر {this.state.frf.orderunit} {this.state.frf.unitprice} تومان
                </Text>
            </View>
        )

    }
    render() {

        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (
            <Content>
                    <ScrollView style={{backgroundColor:'white'}}>
                        <Carousel

                            index={0}
                            pageSize={BannerWidth}
                        >
                            {this.renderPage()}

                        </Carousel>



                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, alignItems: 'center'}}>

                            {this.offerVisible()}





                        <Right>
                            <Text style={{
                                alignItems: 'center', marginRight: 10,fontFamily:'BYekan'
                            }}>
                                {this.state.frf.product_name}

                            </Text>
                        </Right>
                    </View>
                    <Button block success
                            style={{margin: 10}}
                            onPress={() => this.gooz(this.state.frf)}>
                        <Text style={{fontFamily:'BYekan'}}> افزودن به سبد خرید </Text>
                        <Icon name='cart'/>

                    </Button>
                    <Text style={{fontFamily:'BYekan',textAlign:'right',marginLeft:20,marginRight:20,paddingBottom:10}}>{this.state.frf.properties}</Text>
                    </ScrollView>
            </Content>
        );
    }
}
module.export = DetailsScreen;
