import React, {Component} from 'react';
import {
    ListView, AsyncStorage, TextInput, Dimensions, Image, ActivityIndicator, ScrollView, Alert
} from 'react-native';
import {
    Container, Button, List, ListItem,
    Text, Thumbnail, View, Body,
    Content, Footer, FooterTab,
    Badge, Radio, Right, Left, Root, Center, Item
} from 'native-base';
import Picker from 'react-native-picker';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import {Actions} from 'react-native-router-flux';
import {ProgressDialog} from 'react-native-simple-dialogs';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import moment from 'moment-jalaali';
import Toast from 'react-native-simple-toast';

export default class Final extends Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {

            dataSource: dss.cloneWithRows([]),
            addressM: [],
            localM: '',
            deliveryTimeM: '',
            orderDescM: 'a',
            orderPhoneM: '0',
            shokhm: [],
            times: [],
            timeApp: [],
            value: 0,
            text: '',
            myTime: false,
            todayEvening: false,
            tomorrowMorning: false,
            tomorrowEvening: false,
            isLoading: true,
            dialogVisible: false,
            deliveryCost: 0,
            normalDelivery: 0,
            vipDelivery: 0,
            totalCost: 0,
            indexRadio: -1,
            availableToSet: true,
            timeSelecting: [],
            myTimeTxt: 'زمان من',
            description: '',
            gooz:[],
            choos:[],

        };
        console.log(this.state.list, 'asdfghjk');


    }

    componentDidMount() {
        // this.listOrder();
        this.timesList();
        this.listOrder();

        Toast.toastInstance = null;


    }

    timesList() {
        AsyncStorage.getItem('deliveryCost', (err, store) => {
            let cost = JSON.parse(store);
            console.log(parseInt(cost[0].delivery_price), 'mahnazparivash33');
            this.setState({
                normalDelivery: parseInt(cost[0].delivery_price),
                vipDelivery: parseInt(cost[1].delivery_price)
            })

        });
        AsyncStorage.getItem('deliveryTimes', (err, store) => {
            let time = JSON.parse(store);
            console.log(time, 'mahnazparivash37');
            this.setState({
                times: time.map(function (jh) {
                    return jh.time_text
                }),
                timeApp: time,
            });
            this.availableTimes();
        });

    }

    availableTimes() {
        let day = new Date().getDay();
        switch (day) {
            case 4:
                this.setState({tomorrowMorning: true, tomorrowEvening: true});
                break;
            case 5:
                this.setState({tomorrowMorning: true, todayEvening: true});
                break;
        }
        console.log(this.state.timeApp, 'mahnazparivash38');

        console.log(new Date().getHours(), 'sdlkvmdkld');
        if (new Date().getHours() > this.state.timeApp[1].time_start - 4) {
            this.setState({todayEvening: true})
        }
        if (new Date().getHours() > this.state.timeApp[1].time_end) {
            this.setState({tomorrowMorning: true});
            this.setState({todayEvening: true});
            this.setState({myTime: false});

        }
        if (new Date().getHours() > 16) {
            this.setState({todayEvening: true});


        }
        // this.timeAdjusting('امروز');

    }

    setOrder() {
        this.setState({dialogVisible: true});
        let readyToSend = [];
        let lortin = [];
        let jhj = {};
        let koon;
        let addressM = '';
        let localM = '';
        let deliveryTimeM = '';
        let orderDescM = 'a';
        let orderPhoneM = '0';
        let gogogo = 0;
        let moz = [];
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {
                let rr = JSON.parse(store)[0].phone;
                console.log(rr, 'mahnazparivash27');
                this.setState({orderPhoneM: rr})

            });
            AsyncStorage.getItem('usrAddress', (err, store) => {
                let yyy = JSON.parse(store);

                this.setState({
                    addressM: yyy
                });
                console.log(this.state.addressM, 'mahnazparivash25');


            });
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        let value = store[i][1];
                        let key = store[i][0];
                        let testes = JSON.parse(value);


                        // if (key.includes('timeSelected')) {
                        //     this.setState({deliveryTimeM: testes + new Date()});
                        //     console.log(this.state.deliveryTimeM, 'somewhooooo2');
                        //
                        // }

                        if (key.includes('order')) {
                            console.log(this.state.addressM[0].local, 'somewhooooo2xx');

                            gogogo = gogogo + 1;
                            let gooz = {
                                key: key,
                                productName: testes.product_name,
                                productMount: testes.product_mount,
                                unitPrice: testes.unitPrice,
                                exAddress: this.state.addressM[0].address,
                                local: this.state.addressM[0].local,
                                deliveryTime: this.state.deliveryTimeM,
                                orderDesc: this.state.description,
                                ordererPhone: this.state.orderPhoneM,
                            };
                            moz.push(gooz);
                            console.log(moz, 'cccccccccc');
                            console.log(JSON.stringify(moz), '1q1q1q12');
                            this.setState({shokhm: moz});
                            this.sendToServer(moz)

                        }


                    })

                })

            });
            console.log(JSON.stringify(moz), '1q1q1q1');

            console.log(JSON.stringify(this.state.shokhm), 'cccccccc3');
        }
        catch (err) {
            console.log(err)
        }
        // for (let i = 0; i < readyToSend.length; i++) {
        //     readyToSend.push({
        //         exAddress: 'address', local: 'local', deliveryTime: 'time'
        //         , orderDesc: 'desc', orderPhone: 'phone'
        //     })
        // }


        //this.sendToServer();

    }

    sendToServer(order) {
        console.log(JSON.stringify(order), '1q1q1q13');

        let orders = this.state.shokhm;


        let dd = [{
            deliveryTime: '1', exAddress: '2', local: '3', orderDesc: '4', orderPhone: '5', productMount: '6'
            , productName: '7', unitPrice: '8'
        }];
        let body = {
            'loginId': 'helloreact',
            "password": 'd4da22ee9d210bab31d1c3ef8b3674a6'
        };
        console.log(JSON.stringify(dd), 'gfgfgfg');
        const url = 'http://koalafruit.com/api/oriori.php';

        try {
            let test = fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order)
            });

            console.log(test, 'choschos');
            AsyncStorage.getAllKeys((err, keys) => {
                // let r = JSON.parse(keys);
                let ghoo = keys.filter(x => x.includes('order'));
                AsyncStorage.multiRemove(ghoo, err => {
                    console.log(err, 'mahnazparivash26')
                });
                this.setState({dialogVisible: false});

                setTimeout(() => {

                    Alert.alert(
                        'پیغام',
                        'خرید شما با موفقیت ثبت شد',

                        [

                            {text: 'خب', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                    )

                }, 500);
                Actions.feed();
                // alert('salma', 'sss');


            });


        }

        catch (error) {
            Toast.show({
                text: 'خطا!',
                position: 'bottom',
                buttonText: 'خب'
            })
        }


        console.log(JSON.stringify(orders), 'choschos');

    }


    listOrder() {
        // console.log(this.state.list.product_name,'akhonddozd');
        let aan = [];

        let koon = [];
        console.log(this.state.list, 'dldjj3');

        AsyncStorage.getAllKeys((err, keys) => {

            AsyncStorage.multiGet(keys, (err, stores) => {
                //const ghgh=JSON.parse(stores);
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    let listArray = JSON.parse(value);
                    if (key.includes('order')) {
                        console.log(listArray, 'mahnazparivash30');

                        aan.push({
                            name: listArray.product_name,
                            price: listArray.unitPrice,
                            mount: listArray.product_mount,
                            cross: listArray.unitPrice * listArray.product_mount,
                            unit: listArray.orderUnit,
                            image: listArray.image,

                            id: key
                        });
                        console.log(key, '2nhnhnnh');
                        console.log(aan, 'nhnhnnh');

                    }
                    // aan.push({name: listArray.product_name, id: key});

                    console.log(listArray.product_name, 'dlcndfklf');
                    const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                    this.setState({
                        list: aan,
                        isLoading: false,
                        dataSource: dss.cloneWithRows(aan.map(function (itit) {
                            return (
                                itit
                            )
                        })),
                    })
                    // console.log(listArray, 'akhonda123');
                    // alert(value);


                });
            });

        });


        // this.chos();


        console.log(this.state.list, 'dldjj2');

    }

    calculateCosts(frf) {
        let buffer = this.state.list;
        let coco = this.state.deliveryCost;
        let sum = 0;
        let yty;

        // sum=sum+buffer[r].cross;
        for (let e = 0; e < buffer.length; e++) {
            // console.log(buffer[e].cross,'mahnazparivash35');
            sum += buffer[e].cross;

        }
        //  sum = buffer.cross.reduce((a, b) => a + b, 0);

        console.log(sum, 'mahnazparivash35');

        yty = sum + frf;
        this.setState({totalCost: yty})
    }

    // let koonNahayi=[];
    // let myTimeToday = [];
    // let myTimeTomorrow = [];
    // let item= 'فردا';
    // //tomorrow.getDate();
    // switch (item){
    // case  'امروز':
    //     let hourT= new Date().getHours();
    //     let count=parseInt(this.state.timeApp[1].time_end) - hourT;
    //     if(count >=1){
    //         for (let i=0;i< count;i++){
    //             hourT +=i;
    //             let start=hourT+2;
    //             let end = hourT+3;
    //             myTimeToday[i]= end +'until'+ start;
    //         }
    //         console.log(count,'ksksksks7');
    //         //this.setState({timeSelecting: myTimeToday});
    //         koonNahayi = myTimeToday;
    //     }else {
    //         this.setState({timeSelecting: []});
    //         koonNahayi = [];
    //     }
    //
    //     break;
    // case 'فردا':
    //     let hour=parseInt(this.state.timeApp[2].time_start);
    //     let period= parseInt(this.state.timeApp[2].time_end)-parseInt(this.state.timeApp[2].time_start);
    //     for(let i=0;i<period+2;i++){
    //         let start =hour+i;
    //         let end=hour+i+1;
    //         myTimeTomorrow[i]= start +'-'+ end;
    //
    //     }
    //     console.log(myTimeTomorrow,'ksksksks8');
    //
    //     this.setState({timeSelecting: myTimeTomorrow});
    //     koonNahayi=myTimeTomorrow;
    //     break;
    //
    // }
    mySelf() {
        let pickItem = [];
        if (new Date().getHours() > 18) {

            pickItem = [['فردا '], ['9-10', '10-11', '11-12', '12-13', '13-14', '14-15', '15-16', '16-17']]
        }
    }

    myTime() {
        let pickerData = [];
        let goozz = [];
        let choos = [];
        let period = parseInt(this.state.timeApp[2].time_end) - parseInt(this.state.timeApp[2].time_start);
        let hour = parseInt(this.state.timeApp[2].time_start);
        if (new Date().getHours() > this.state.timeApp[2].time_end) {
            for (let i = 0; i <= period; i++) {

                let start = hour + i;
                let end = hour + i + 1;
                goozz[i] = start + '-' + end;
            }
            console.log(goozz, 'mkmkk');

            pickerData = [
                {
                    ' فردا ': goozz
                }]
        } else {
            for (let i = 0; i <= period; i++) {
                let start = hour + i;
                let end = hour + i + 1;
                goozz[i] = start + ' - ' + end;
            }
            let hourT;

            if (new Date().getHours() > this.state.timeApp[2].time_start) {
                hourT = new Date().getHours();
            } else {
                hourT = this.state.timeApp[2].time_start;
            }
            let count = parseInt(this.state.timeApp[1].time_end) - hourT;
            if (count >= 1) {
                for (let i = 0; i <= count; i++) {
                    hourT++;
                    let start = hourT + 1;
                    let end = hourT + 2;
                    choos[i] = end + ' - ' + start;
                }
            }
            pickerData = [
                {
                    '  امروز  ': choos
                },
                {
                    ' فردا  ': goozz
                },
                ]
        }
        console.log(goozz, 'manman');
        Picker.init({
            pickerData: pickerData,
            selectedValue: [''],
            pickerBg: [236, 240, 241, 1.0],
            pickerConfirmBtnText: 'خوبه',
            pickerCancelBtnText: 'فعلا نه',
            pickerTitleText: 'زمان تحویل',
            pickerFontSize:19,
            pickerConfirmBtnColor:[34, 167, 240,1.0],
            pickerCancelBtnColor:[108, 122, 137,1.0],
            pickerFontColor:[34, 49, 63,1.0],

            onPickerConfirm: items => {
                console.log(items[0], 'mytime');
                if(items[0].includes('امروز')){
                   let m= moment(new Date().getTime()).format('jYYYY/jM/jD');
                    this.setState({deliveryTimeM: m +'* '+ items[1]});
                    console.log(m,'nanananan')
                }else {
                    let m= moment(new Date().getTime()+86400000).format('jYYYY/jM/jD');
                    this.setState({deliveryTimeM: m +'* '+ items[1]});

                }
                AsyncStorage.setItem('timeSelected', JSON.stringify(items));

                this.setState({availableToSet: false, myTimeTxt: items});
            },
            onPickerCancel: item => {
                console.log(item);
                this.setState({indexRadio: null});
                this.setState({availableToSet: true});

            },
            onPickerSelect: item => {
                console.log(item, 'ksksksks5');
                // this.myTime(item);
            }
        });
        Picker.show();
    }

    timeSelecting(value) {
        switch (value) {
            case 0:
                console.log(value, 'dldjj222');

                break;
            case 1:
                console.log(value, 'dldjj222');

                break;
            case 2:
                console.log(value, 'dldjj222');

                break;
            case 3:
                console.log(value, 'dldjj222');

                break;
            default:
                console.log(value, 'dldjj222');

        }


    }

    onSelect(index, value) {
        this.setState({
            text: `Selected index: ${index} , value: ${value}`
        });
        this.setState({value: value});
        console.log(index, 'kfkjdkvdk');
        Picker.hide();
        switch (index) {
            case 0:
                console.log(this.state.times[1], 'dldjj222');
                this.calculateCosts(this.state.vipDelivery);
                this.setState({deliveryCost: this.state.vipDelivery});


                this.myTime();


                break;
            case 1:
                console.log(this.state.times[0], 'dldjj222');
                this.calculateCosts(this.state.normalDelivery);
                let m1= moment(new Date().getTime()).format('jYYYY/jM/jD');
                this.setState({
                    deliveryCost: this.state.normalDelivery,
                    availableToSet: false,
                    deliveryTimeM: m1 +' ' + this.state.times[0]
                });

                break;
            case 2:
                console.log(this.state.times[1], 'dldjj222');
                this.calculateCosts(this.state.normalDelivery);
                let m2= moment(new Date().getTime()).format('jYYYY/jM/jD');
                this.setState({
                    deliveryCost: this.state.normalDelivery,
                    availableToSet: false,
                    deliveryTimeM: m2 +' ' +this.state.times[1]

                });

                break;
            case 3:
                console.log(this.state.times[1], 'dldjj222');
                AsyncStorage.setItem('timeSelected', JSON.stringify(this.state.times[1]));
                this.calculateCosts(this.state.normalDelivery);
                let m3= moment(new Date().getTime()+ 86400000).format('jYYYY/jM/jD');
                this.setState({
                    deliveryCost: this.state.normalDelivery,
                    availableToSet: false,
                    deliveryTimeM: m3 +' ' + this.state.times[1]
                });
                console.log(this.state.deliveryCost, 'mahnazparivash36');


                break;
            default:
                console.log(value, 'dldjj222');

        }
    }
    shoomi(){
        let width = Dimensions.get('window').width; //full width

        if(!this.state.availableToSet){
            return(
                <Button style={{
                    borderRadius: 7,
                    justifyContent: 'center',
                    backgroundColor: '#2ECC71',
                    width: 0.9 * width,
                    marginBottom: 20,
                    marginTop: 5
                }} disabled={this.state.availableToSet} onPress={() => this.setOrder()}>

                    <Text style={{fontFamily:'BYekan'}}> ثبت سفارش </Text>
                </Button>
            )
        }
        return(
        <Button style={{
            borderRadius: 7,
            justifyContent: 'center',
            backgroundColor: '#6C7A89',
            width: 0.9 * width,
            marginBottom: 20,
            marginTop: 5
        }} disabled={this.state.availableToSet} onPress={() => this.setOrder()}>

            <Text style={{fontFamily:'BYekan'}}> ثبت سفارش </Text>
        </Button>

        );


    }
    render() {
        let width = Dimensions.get('window').width; //full width

        let radio_props = [
            {label: this.state.times[1], value: 0},
            {label: this.state.times[0], value: 1},
            {label: this.state.times[1], value: 2},
            {label: this.state.times[2], value: 3},


        ];
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        // console.log(this.state.times[0].time_text,'dvjgdvkldklv');
        return (
            <Root>
                <Content>
                    <ProgressDialog
                        visible={this.state.dialogVisible}
                        title="ثبت سفارش ..."
                        message="لطفا صبر کنید"
                    />
                    <View style={{
                        flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center', backgroundColor: 'white',
                        paddingTop: 10, paddingBottom: 10, marginBottom: 5, marginTop: 10
                    }}>
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#2ECC71'}}>
                            <Icon style={{margin: 10}} name="shopping-cart" color="#2ECC71" size={30}
                            />
                        </Button>

                        <Icon style={{margin: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#2ECC71'}}>
                            <Icon style={{margin: 10}} name="compass" color="#2ECC71" size={30}
                            />
                        </Button>
                        <Icon style={{marginRight: 10, marginLeft: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#81CFE0'}}>
                            <Icon style={{margin: 10}} name="clock" color="#81CFE0" size={30}
                            />
                        </Button>

                    </View>
                    <ScrollView>

                        <ListView
                            style={{width: width, backgroundColor: '#00000000'}}
                            dataSource={this.state.dataSource}
                            renderRow={(rowData, rowID, sectionID) =>

                                <View style={{
                                    borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                                    , justifyContent: 'center', alignItems: 'center', margin: 5
                                }}>
                                    <Text style={{fontFamily:'BYekan',margin: 10, color: '#4183D7'}}>{rowData.price * rowData.mount}
                                        تومان</Text>

                                    <Right>
                                        <View>

                                            <Text style={{fontFamily:'BYekan',margin: 10}}>{rowData.name}</Text>
                                            <View style={{height: 1, backgroundColor: '#009688'}}>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}>
                                                <Text style={{fontFamily:'BYekan',margin: 3, color: '#4183D7'}}>{rowData.unit}</Text>
                                                <Text style={{fontFamily:'BYekan',margin: 3, color: '#4183D7'}}>{rowData.mount}</Text>

                                            </View>
                                        </View>
                                    </Right>
                                    <Image
                                        source={{uri: rowData.image}}


                                        style={{
                                            margin: 10,
                                            width: 80,
                                            height: 80,
                                            borderRadius: 7,
                                            backgroundColor: '#00000000'
                                        }}/>
                                </View>
                            }/>
                        <View style={{width: width}}>

                            <View style={{
                                flexDirection: 'row', alignItems: 'center'
                                , backgroundColor: 'white', margin: 5,
                                justifyContent: 'space-between',
                                borderRadius: 7,

                            }}>
                                <Text style={{fontFamily:'BYekan',marginLeft: 10, color: '#4183D7'}}>{this.state.deliveryCost} تومان</Text>
                                <Text style={{fontFamily:'BYekan',color: '#22313F'}}>هزینه ارسال</Text>
                                <Icon2 style={{margin: 10, marginRight: 20}} name="truck" color="#1BBC9B" size={40}
                                />
                            </View>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center'
                                , backgroundColor: 'white', margin: 5,
                                justifyContent: 'space-between',
                                borderRadius: 7,


                            }}>
                                <Text style={{fontFamily:'BYekan',marginLeft: 10, color: '#4183D7'}}>{this.state.totalCost} تومان</Text>
                                <Text style={{fontFamily:'BYekan',color: '#22313F'}}>جمع نهایی</Text>
                                <Icon2 style={{margin: 10, marginRight: 20}} name="calculator" color="#1BBC9B"
                                       size={40}/>


                            </View>
                        </View>
                        <View style={{
                            backgroundColor: 'white', flexDirection: 'row', margin: 5
                            , borderRadius: 7, justifyContent: 'space-between', alignItems: 'center'

                        }}>

                            <RadioGroup
                                size={24}
                                thickness={2}
                                color='#1bbc9b'
                                selectedIndex={this.state.indexRadio}
                                style={{flexDirection: 'column'}}
                                onSelect={(index, value) => this.onSelect(index, value)}
                            >
                                <RadioButton
                                    value='blue color'
                                    color='#1bbc9b'
                                    disabled={this.state.myTime}

                                >

                                    <Text style={{fontFamily:'BYekan',color: '#22313F'}}>{this.state.myTimeTxt}</Text>
                                </RadioButton>




                                <RadioButton
                                    value='green color'
                                    color='#1bbc9b'
                                    disabled={this.state.todayEvening}

                                >
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontFamily:'BYekan',color: '#22313F'}}>امروز {this.state.times[1]}</Text>

                                    </View>
                                </RadioButton>
                                <RadioButton
                                    value='red color'
                                    color='#1bbc9b'
                                    disabled={this.state.tomorrowMorning}

                                >
                                    <Text style={{fontFamily:'BYekan',color: '#22313F'}}> فردا {this.state.times[0]}</Text>
                                </RadioButton>
                                <RadioButton
                                    value='index1'
                                    color='#1bbc9b'
                                    disabled={this.state.tomorrowEvening}

                                >
                                    <Text style={{fontFamily:'BYekan',color: '#22313F'}}> فردا {this.state.times[1]}</Text>
                                </RadioButton>
                            </RadioGroup>
                            <View>
                                <Text style={{fontFamily:'BYekan',color: '#22313F'}}>زمان ارسال</Text>
                            </View>
                            <View>
                                <Icon style={{margin: 10, marginRight: 20}} name="clock" color="#1BBC9B" size={40}
                                />
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{width: width,backgroundColor:'white', borderRadius: 7, margin: 5,
                                padding: 10}}>
                                <Text style={{fontFamily:'BYekan',textAlign:'right',color:'#34495E',marginLeft:20,marginRight:20,marginBottom:10}}>در صورت تمایل،می توانید توضیحاتی را در مورد سفارش خود در کادر زیر بنویسید</Text>
                                <TextInput style={{fontFamily:'BYekan',color:'#34495E',placeholderTextColor:'red',backgroundColor:'white'
                                    , height: 100,borderRadius:7,borderWidth:2,borderColor:'#34495E',padding:5,

                                }}
                                           textAlign="right"
                                           multiline={true}
                                           numberOfLines={5}
                                           maxLength={150}
                                           maxHeight={300}
                                           blurOnSubmit={true}
                                           keyboardType={'default'}
                                           underlineColorAndroid='rgba(0,0,0,0)'
                                           onChangeText={(value => this.setState({description: value}))}
                                           placeholder='سیب ها سایز متوسط باشند...'
                                           />

                            </View>
                            <View >

                                {this.shoomi()}
                            </View>
                        </View>

                    </ScrollView>

                </Content>
            </Root>
        );
    }
}

module.export = Final;