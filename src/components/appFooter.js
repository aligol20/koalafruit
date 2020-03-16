import React, {Component} from 'react';
import {Text, AsyncStorage} from 'react-native';
import IconBadge from 'react-native-icon-badge';
import {Actions} from 'react-native-router-flux';
import Icon2 from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/Feather'
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon5 from 'react-native-vector-icons/FontAwesome'
import {Footer, FooterTab, Badge, Button, View, Icon} from 'native-base';
let badgNumber;

export default class AppFooter extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            koooni: 0,
            activeTabName: 'feed',
            nameUser: 'حساب ',
            isSignIn: '',
            fe: '#2ECC71',
            ca: '#6C7A89',
            se: '#6C7A89',
            cgy: '#6C7A89',
            ac: '#6C7A89',


        }
    }

    componentDidMount() {
        
        // this.justForFun();
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
    }

    tabAction(tab) {
        this.setState({activeTabName: tab});

        switch (tab) {
            case 'feed':
                this.setState({
                    fe: '#2ECC71',
                    ca: '#6C7A89',
                    se: '#6C7A89',
                    cgy: '#6C7A89',
                    ac: '#6C7A89',
                });
                console.log(Actions.state.index, 'manman');
                // this.justForFun();

                Actions.feed();
                break;
            case 'cart':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#2ECC71',
                    se: '#6C7A89',
                    cgy: '#6C7A89',
                    ac: '#6C7A89',
                });
                Actions.cart();
                break;
            case 'search':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#6C7A89',
                    se: '#2ECC71',
                    cgy: '#6C7A89',
                    ac: '#6C7A89',
                });
                Actions.search();
                break;
            case 'category':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#6C7A89',
                    se: '#6C7A89',
                    cgy: '#2ECC71',
                    ac: '#6C7A89',
                });
                Actions.category();
                break;
            case 'account':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#6C7A89',
                    se: '#6C7A89',
                    cgy: '#6C7A89',
                    ac: '#2ECC71',
                });
                Actions.account();
                break;
            case 'orderHistory':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#6C7A89',
                    se: '#6C7A89',
                    cgy: '#6C7A89',
                    ac: '#2ECC71',
                });
                Actions.orderHistory();
                break;
            case 'empty':
                this.setState({
                    fe: '#6C7A89',
                    ca: '#2ECC71',
                    se: '#6C7A89',
                    cgy: '#6C7A89',
                    ac: '#6C7A89',
                });
                console.log('salamalmasalma');
                Actions.empty();
                break;
        }

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
                console.log(store, 'mahnazparivash19');
                if (store !== null) {
                    console.log(store, 'mahnazparivash17');

                    Actions.orderHistory()
                } else {
                    console.log(store, 'mahnazparivash18');

                    Actions.account()


                }
            });

        } catch (error) {
            // Error retrieving data
        }

    }
    isCartEmpty() {

        try {
            AsyncStorage.getAllKeys((err, keys) => {

                AsyncStorage.multiGet(keys, (err, stores) => {
                    //const ghgh=JSON.parse(stores);
                    stores.map((result, i, store) => {
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        let listArray = JSON.parse(value);
                        if (key.includes('order')) {
                                console.log(store, 'aqaqaqaqaq');
                                this.tabAction('cart');
                            } else {
                                console.log(store, 'zxzxzxzxzxzx');
                                this.tabAction('empty');

                            }

                    });
                });

            });


        } catch (error) {
            // Error retrieving data
        }

    }



    render() {
        let gooz = [];
        AsyncStorage.getAllKeys((err, result) => {
            for (let i = 0; i < result.length; i++) {
                if (result[i].includes('order')) {
                    gooz.push(result[i])

                }
            }
            this.setState({koooni: gooz.length});
            badgNumber = this.state.koooni;


        });
        let pp=Actions.currentScene;
                switch (pp){
                    case 'feed':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => Actions.feed()}>
                                    <Icon5 color={'#2ECC71'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.category()}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.search()}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => Actions.cart()}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'cart':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'address':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'final':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#2ECC71'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'account':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#2ECC71'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'loginMain':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#2ECC71'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'register':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#2ECC71'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'orderHistory':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#2ECC71'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'details':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'category':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'products':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'search':
                        return (<Footer >
                            <FooterTab style={{backgroundColor: '#ffffff'}}>
                                <Button

                                    onPress={() => this.tabAction('feed')}>
                                    <Icon5 color={'#6C7A89'}
                                           name="home" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>خانه</Text>
                                </Button>
                                <Button

                                    onPress={() => this.whatToDo()}>
                                    <Icon4 color={'#6C7A89'}
                                           name="account" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>{this.state.nameUser}</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('category')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="layers" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>دسته بندی</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('search')}>
                                    <Icon3 color={'#2ECC71'}
                                           name="search" size={27}/>
                                    <Text style={{color: '#2ECC71',fontFamily:'BYekan'}}>جستجو</Text>
                                </Button>
                                <Button

                                    onPress={() => this.tabAction('cart')}>
                                    <Icon3 color={'#6C7A89'}
                                           name="shopping-cart" size={27}/>
                                    <Text style={{color: '#6C7A89',fontFamily:'BYekan'}}>سبد خرید</Text>
                                </Button>

                                <IconBadge

                                    BadgeElement={
                                        <Text style={{color: '#FFFFFF', fontSize: 11,fontFamily:'BYekan'}}>{badgNumber}</Text>
                                    }
                                    IconBadgeStyle={
                                        {

                                            backgroundColor: '#F39C12',
                                            marginRight: 20,
                                            marginBottom: 5,
                                            marginTop: 3,
                                        }
                                    }
                                    Hidden={this.state.koooni === 0}

                                />

                            </FooterTab>
                        </Footer>);
                        break;
                    case 'intro':
                        return (
                            <View >

                        </View>);
                        break;
                    case 'pp':
                        return (
                            <View >

                            </View>);
                        break;



                }
        }
    }

    module.export = AppFooter;
