import React, {Component} from 'react';
import {
    Container, Button, Header,
    Icon, List, ListItem, Text,Right, Thumbnail, View, Body, Content, Footer, FooterTab, Badge
} from 'native-base';
import {AsyncStorage,ActivityIndicator,Dimensions,renderRow,ListView} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';



export default class ProductList extends Component {
    constructor(props) {

        super(props);
        const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            isLoading: true,
            asb: [],
            rrr: '123',
            selectedCat: '',
            dataSource: dss.cloneWithRows([]),
            list: [],
        }

    }
    getProductList() {
        AsyncStorage.getItem('selectedCategory',(err,store) => {
            let y=JSON.parse(store);
            this.setState({selectedCat: y});
        });
        let uu=this.state.selectedCat;


        AsyncStorage.getItem('allProducts',(err,stores)=>{
            let r = JSON.parse(stores);
           let ghoo = r.filter(x => x.product_category === this.state.selectedCat & x.unitprice !=='no');
            const dss = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

            this.setState({
                list: ghoo,
                isLoading: false,
                dataSource: dss.cloneWithRows(ghoo.map(function (itit) {
                    return (
                        itit
                    )
                })),
            })

            console.log(ghoo,'jajajajaja');


        });
        // AsyncStorage.getItem('allProducts',(err,i ,store) => {
        //     let test=[];
        //     listArray = JSON.parse(store[i]);
        //     console.log(listArray,'koonbache');
        //
        //     // if(JSON.parse(store).product_category.includes('سبزی')){
        //     //     test.push(JSON.parse(store));
        //     //     console.log(JSON.parse(store),'yuyuuyuyuy');
        //     //
        //     // }
        //     this.setState({
        //         asb: listArray,
        //     });
        // });
        //get offer list from koala server


        console.log(this.state.dataSource,'rtrtrtrt');


        // console.log(this.state.names[i]);

        var test2 = [];



    }
    componentDidMount() {

        this.getProductList();

    }
    render() {
        function shest(uiui) {
            AsyncStorage.setItem('product',JSON.stringify(uiui));
            console.log(uiui.product_name,'qwerty');
            return(
                Actions.details({ title: uiui.product_name })

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

            <Content>
                <ListView
                    style={{width: width, backgroundColor: '#00000000'}}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData, rowID, sectionID) =>

                    <View style={{
                        backgroundColor: '#00000000',
                        width: width
                    }}>


                                    <Button style={{backgroundColor: 'white', height: 80,
                                        marginBottom: 2,
                                        marginRight: 5,
                                        marginLeft:5}}
                                            onPress={() => shest(rowData)}>


                                        <View style={{flex: 1, flexDirection: 'row',marginLeft:20}}>
                                            <View style={{ flexDirection: 'column'}}>
                                                <Text style={{color:'green',fontFamily:'BYekan'}}>
                                                    هر {rowData.orderunit}
                                                </Text>
                                                <Text style={{color:'green',fontFamily:'BYekan'}}>
                                                {rowData.unitprice}
                                            </Text>
                                                <Text style={{color:'green',fontFamily:'BYekan'}}>
                                                    تومان
                                                </Text>

                                            </View>
                                            <Right>
                                            <Text style={{fontFamily:'BYekan'}}>
                                                {rowData.product_name}

                                            </Text>
                                            </Right>
                                        </View>
                                        <View style={{overflow: 'hidden',margin:10,borderRadius:7}}>

                                        <Image
                                            source={{uri: rowData.small_image_link, cache: 'force-cache',}}
                                            indicator={Progress}


                                            style={{
                                                width:60,
                                                height:60,
                                                borderRadius:7,
                                                backgroundColor:'#00000000'}}/>
                                        </View>
                                    </Button>




                    </View>

                    }/>
            </Content>
        );

    }
}
module.export = ProductList;