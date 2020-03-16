import React, {Component} from 'react';
import {AsyncStorage, renderRow, ActivityIndicator, Dimensions, Image, ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Picker from 'react-native-picker';
import Icon from 'react-native-vector-icons/Feather'
import Icon3 from 'react-native-vector-icons/Ionicons'

import {
    Container, Button, Toast, List, ListItem,
    Text, Thumbnail, View, Body,
    Content, Footer, FooterTab,
    Badge, Right,
} from 'native-base';
import {StackNavigator} from 'react-navigation';

import Address from './address'
let testing = [];
class Cart extends React.Component {
    constructor(props) {
        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            list: [],
            newKeys: [],
            list2: [],
            mount: 1,
            itemlabel: [],
            isLoading: true,
            disable:true,
            background:'#BDC3C7',


            dataSource: dss.cloneWithRows([]),

        };
        console.log(this.state.list, 'asdfghjk');


    }

    listName() {
        if (this.state.list.product_Name !== null) {
            return (
                this.state.list.product_Name
            )
        }
    }

    componentDidMount() {
        this.listOrder();
    }

    // deleteItem(key) {
    //     console.log(key, 'dldjj');
    //     AsyncStorage.removeItem(key, (err) => {
    //         Toast.show({
    //             text: 'ali' + 'از سبد شما حذف شد',
    //             position: 'bottom',
    //             buttonText: 'خوبه',
    //             duration: 3000
    //         });
    //         console.log(err, 'dldjj');
    //     });
    // }
    saveMountSelected(mount, detail) {
        let rrr = JSON.parse(detail);
        console.log(mount,detail, 'salalalalala');
        // Toast.show({
        //     text: detail.product_name + ' به سبد خرید اضافه شد',
        //     position: 'bottom',
        //     buttonText: 'خوبه',
        //     duration: 3000
        // });
        // AppFooter.forceUpdate();
        //save new orders with mount in asyncstorage
        console.log(rrr, 'dbfklgjkgjkg');

        try {
            let newOrder = {
                porduct_id: rrr.porduct_id,
                product_name: rrr.product_name,
                product_mount: mount,
                unitPrice: rrr.unitPrice,
                image: rrr.image,
                max_order: rrr.max_order,
                orderUnit:rrr.orderUnit,
            };
            AsyncStorage.setItem('order'+rrr.porduct_id, JSON.stringify(newOrder));

            AsyncStorage.getItem('order'+rrr.porduct_id, (err, result) => {
                const fff = JSON.parse(result);
                console.log(fff, 'grgrgrgr');
                // console.log(detail.product_id,'sljcnasjnj');
                // console.log(fff.product_Name,'sljcnasjnj');
                this.listOrder();

            });
        } catch (error) {
            console.log(error, 'dbfklgjkgjkg');
            // Error saving data
        }
    }

    koon(go) {
        let goo = [];
        // AsyncStorage.removeItem('product');

        console.log(this.state.list.length, 'dldjjssss');
        AsyncStorage.removeItem(this.state.list[go].id, (err) => {
            this.setState({list: []})
        });
        console.log(this.state.list, 'dldjj');
        // this.listOrder()
        if (this.state.list.length === 1) {
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                dataSource: dss.cloneWithRows(goo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })
        } else {
            this.listOrder();
        }


    }

    edit(go) {
        const item = [];
        let max = 0;
        let half = 0;
        let i = 0;
        let detail = [];
        let idA = this.state.list[go].id;
        console.log(idA,'sasasasasas');
        let min = 0;
        let unit= '';


        AsyncStorage.getItem(idA, (err, result) => {

            detail = JSON.parse(result);
            console.log(detail,'salaaaaaaaaam');
            min = detail.min_order;
            max = detail.max_order * 2;
            unit = detail.orderUnit;
            if (detail.orderUnit === 'کیلو') {
                for (i; i < max; i++) {
                    half = half + 0.5;
                    item.push({
                        key: i,
                        label: half.toString() + '  کیلو',
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
                        label: min  +'   '+ unit,
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
            console.log(item, 'asasas');

            Picker.init({
                pickerData: item.map(function (tt) {
                    return (tt.label)
                })
                ,
                selectedValue: [0.5],
                pickerBg: [255, 255, 255, 255],
                pickerFontSize:19,
                pickerConfirmBtnText: 'خوبه',
                pickerCancelBtnText: 'فعلا نه',
                pickerConfirmBtnColor:[34, 167, 240,1.0],
                pickerCancelBtnColor:[108, 122, 137,1.0],
                pickerFontColor:[34, 49, 63,1.0],
                pickerTitleText: 'مقدار موردنیاز را انتخاب کنید',
                onPickerConfirm: items => {
                    console.log(parseFloat(items), 'lalalala');

                    this.saveMountSelected(parseFloat(items), result);
                },
                onPickerCancel: item => {
                    console.log(item);
                },
                onPickerSelect: item => {
                    console.log(item);
                }
            });
            Picker.show();


        });


    }

    // gooz(detail) {
    //     let item = [];
    //     const max = detail.max_order * 2;
    //     let half = 0;
    //     let i = 0;
    //     // if(detail.orderunit === 'کیلو'){
    //     for (i; i < max; i++) {
    //         half = half + 0.5;
    //         item.push({
    //             key: i,
    //             label: half.toString() + '  کیلو',
    //             value: half
    //         });
    //         // item.push(half.toString() + '  کیلو');
    //         console.log(item.map(function (itiy) {
    //             return(
    //                 itiy.value
    //             )
    //         }), 'gohgoh');
    //
    //     }
    //     // }
    //     Picker.init({
    //         pickerData: item.map(function (itit) {
    //             return(
    //                 itit.label
    //             );
    //         }),
    //         selectedValue: [this.state.mount],
    //         pickerBg: [255, 255, 255,255],
    //         pickerConfirmBtnText:'خوبه',
    //         pickerCancelBtnText:'فعلا نه',
    //         pickerTitleText:'مقدار موردنیاز را انتخاب کنید',
    //         onPickerConfirm: item => {
    //             console.log(item,'sellllected');
    //
    //             this.saveMountSelected(item,detail);
    //             this.setState({
    //                 mount: item,
    //                 showToast: false
    //
    //
    //             })
    //         },
    //         onPickerCancel: item => {
    //             console.log(item);
    //         },
    //         onPickerSelect: item => {
    //             console.log(item);
    //         }
    //     });
    //     Picker.show();
    // }
    //
    // gggohhhh() {
    //     return (
    //         <ListItem>
    //             <View>
    //
    //                 {this.state.list.map(function (item) {
    //                     return (
    //                         <View style={{width: 400, backgroundColor: 'yellow'}}>
    //                             <View style={{flex: 1, flexDirection: 'row'}}>
    //                                 <Button><Icon name="trash"/>
    //                                 </Button>
    //                                 <Button onPress={() => AsyncStorage.removeItem(item.id, (err) => {
    //                                     console.log(err, 'gkfgkflglfgklfg');
    //                                 })}>
    //                                     <Icon name="create"/>
    //                                 </Button>
    //                                 <Text>
    //                                     {item.name}
    //                                 </Text>
    //                             </View>
    //                         </View>
    //                     )
    //                 })}
    //
    //             </View>
    //         </ListItem>
    //     )
    // }

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
                        this.setState({disable:false});
                        aan.push({
                            name: listArray.product_name, id: key
                            , image: listArray.image, mount: listArray.product_mount,
                            unit: listArray.orderUnit, price: listArray.unitPrice
                        });
                        console.log(key, '2nhnhnnh');
                        console.log(aan, 'nhnhnnh');

                    }
                    // aan.push({name: listArray.product_name, id: key});

                    console.log(listArray, 'dlcndfklf');
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

    chos() {
        console.log('calledme', 'sldkvdlkgk');


    }

    whatToDo() {
        // AsyncStorage.getItem('userInfo',(err,store)=>{
        //     // console.log(JSON.parse(store)[0].name,'mahnazparivash8');
        //     // let pop=JSON.parse(store)[0].phonenumber;
        //     if(JSON.parse(store)[0].phonenumber !== null){
        //         Actions.orderHistory();
        //     }else {
        //         Actions.account();
        //     }
        //     // Actions.account();
        //
        //
        //
        // });
        try {
            AsyncStorage.getItem('userInfo', (err, store) => {

                if (store !== null) {
                    console.log(store, 'mahnazparivash17');

                    Actions.address();
                } else {
                    console.log(store, 'mahnazparivash18');
                    let where = 'cart';
                    AsyncStorage.setItem('WhereAmI', JSON.stringify(where));
                    Actions.account();
                    alert('ابتدا وارد حساب کاربری خود شوید');
                }

            });

        } catch (error) {
            // Error retrieving data
        }

    }

    render() {
        const {navigate} = this.props.navigation;
        if (this.state.isLoading) {
            return (
                <View style={{flex: 1, paddingTop: 20}}>
                    <ActivityIndicator />
                </View>
            );
        }
        let width = Dimensions.get('window').width; //full width
        let height = Dimensions.get('window').height; //full width

        if(this.state.disable){
            return (
                <Content style={{backgroundColor:'white'}}>
                    <View style={{height:height,alignItems:'center',justifyContent:'center'}}>
                        <Icon3 color="gray"
                               name="ios-cart" size={100}/>
                        <Text>سبد شما خالی است</Text>

                    </View>



                </Content>
            );

        }else {
            return (

                <Content>
                    <View style={{
                        flexDirection: 'row', alignItems: 'center'
                        , justifyContent: 'center', backgroundColor: 'white',
                        paddingTop: 10, paddingBottom: 10, marginTop: 10
                    }}>
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#F39C12'}}>
                            <Icon style={{margin: 10}} name="shopping-cart" color="#F39C12" size={30}
                            />
                        </Button>


                        <Icon style={{margin: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#81CFE0'}}>
                            <Icon style={{margin: 10}} name="compass" color="#81CFE0" size={30}
                            />
                        </Button>
                        <Icon style={{marginRight: 10, marginLeft: 10}} name="arrow-right" color="#F39C12" size={30}
                        />
                        <Button style={{borderWidth: 2, backgroundColor: '#00000000', borderColor: '#81CFE0'}}>
                            <Icon style={{margin: 10}} name="clock" color="#81CFE0" size={30}
                            />
                        </Button>

                    </View>
                    <ListView
                        style={{width: width, backgroundColor: '#00000000'}}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, rowID, sectionID) =>

                            <View style={{
                                borderRadius: 5, flexDirection: 'row', backgroundColor: 'white'
                                , justifyContent: 'center', alignItems: 'center', margin: 5
                            }}>
                                <Icon style={{marginRight: 10, marginLeft: 10}} name="trash" color="red" size={30}
                                      onPress={() => this.koon(sectionID)}/>
                                <Icon name="edit" color='#22A7F0' size={30} onPress={() => this.edit(sectionID)}/>
                                <Right>
                                    <View>

                                        <Text style={{margin: 10,textAlign:'center',fontFamily:'BYekan'}}>{rowData.name}</Text>
                                        <View style={{height: 1, backgroundColor: '#009688'}}>
                                        </View>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                            <Text
                                                style={{margin: 3, color: '#4183D7',fontFamily:'BYekan'}}> {rowData.price * rowData.mount}
                                                  تومان </Text>
                                            <Text style={{margin: 3, color: '#4183D7',fontFamily:'BYekan'}}>{rowData.unit}</Text>
                                            <Text style={{margin: 3, color: '#4183D7',fontFamily:'BYekan'}}>{rowData.mount}</Text>

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
                    <View style={{
                        backgroundColor: 'white', margin: 5, borderRadius: 7
                        , alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View>
                            <Button style={{margin: 10, borderRadius: 7, backgroundColor: '#22A7F0', hidden: true}}

                                    onPress={() => this.whatToDo()}>
                                <Text style={{fontFamily:'BYekan'}}>مرحله بعد(مکان تحویل)</Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            );
        }
    }
}
const SimpleApp = StackNavigator({
    Cart: {screen: Cart, navigationOptions: {header: null}},
    Address: {
        screen: Address, navigationOptions: {header: null},
    }
});

export default class App extends React.Component {
    render() {
        return (
            <Container>

                <SimpleApp />
            </Container>
        );
    }
}