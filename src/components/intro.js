import React from 'react';
import { StyleSheet,View,Text,Image,AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Actions} from 'react-native-router-flux';
import {Container,Button} from 'native-base';
import Icon5 from 'react-native-vector-icons/Feather'
import Pulse from 'react-native-pulse';

const styles = StyleSheet.create({
    image: {
        height:240,
        width:240,
        borderRadius:120,

    },
    koala: {
        height:160,
        width:160,

    },
    mainContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
        fontSize:19,
        color:'#22313F',
        fontFamily:'BYekan',
        marginTop:30,

    },
    textWhite: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        paddingHorizontal: 16,
        fontSize:19,
        color:'#F2F1EF',
        fontFamily:'BYekan',
        marginTop:30,

    },
    title: {
        color: '#22313F',
        backgroundColor: 'transparent',
        textAlign: 'center',
        fontFamily:'DastNevis',
        marginBottom: 30,
        paddingTop:10,
        paddingBottom:10,
        fontSize:29,
    },
    titleWhite: {
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center',
        marginBottom: 30,
        paddingTop:10,
        paddingBottom:10,
        fontFamily:'DastNevis',
        fontSize:29,
    }
});

const slides = [
    {
        key: 'somethun',
        title: 'سلام کوالا!',
        text: 'کوالا فروت استارتاپی با هدف افزایش بازدهی زندگی شهری',
        image: require('../imageSource/koalaborder.png'),
        imageStyle: styles.koala,
        fontFamily:'irsans',
        fontSize:30,
        textStyle:styles.textWhite,
        titleStyle:styles.titleWhite,
        backgroundColor: '#00B16A',
    },
    {
        key: 'somethun1',
        title: 'وقت طلاست!',
        text: 'خریدهای خود را به ما بسپارید و از کنار هم بودن لذت ببرید',
        image: require('../imageSource/time.png'),
        imageStyle: styles.image,
        textStyle:styles.text,
        titleStyle:styles.title,
        backgroundColor: '#89d5e3',
    },
    {
        key: 'somethun2',
        title: 'لذت تازگی...',
        text: 'لذت چشیدن محصولات تازه را هر روز تجربه کنید',
        image: require('../imageSource/lemon.png'),
        imageStyle: styles.image,
        textStyle:styles.text,
        titleStyle:styles.title,
        backgroundColor: '#f6c437',
    },
    {
        key: 'somethun3',
        title: 'تجربه راحتی...',
        text: 'به راحتی با چند کلیک ساده خریدهای تازه خوری خود را به ما بسپارید',
        image: require('../imageSource/sofa.png'),
        imageStyle: styles.image,
        textStyle:styles.textWhite,
        titleStyle:styles.titleWhite,
        backgroundColor: '#da4146',
    }
];


export default class Intro extends React.Component {
    _onDone = () => {
        let poo=[];
        poo.push({isSeen:true});
        AsyncStorage.setItem('introSeen',JSON.stringify(poo));
        Actions.feed();
        // User finished the introduction. Show "real" app
    };
    _renderNextButton = () => {
        return (
                <Icon5
                    name="arrow-right"
                    color="rgba(255, 255, 255, .9)"
                    size={32}
                    style={{ backgroundColor: 'transparent',marginRight:7 }}
                />
        );
    };
    _renderDoneButton = () => {
        return (
                <Icon5
                    name="check"
                    color="rgba(255, 255, 255, .9)"
                    size={32}
                    style={{ backgroundColor: 'transparent',marginRight:7 }}
                    />
        );
    };
    _renderItem = props => (
        <Container
            style={{backgroundColor:props.backgroundColor,alignItems:'center',justifyContent:'center'}}
        >

            <View style={{alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <Text style={props.titleStyle}>{props.title}</Text>

                <Image style={props.imageStyle}  source={props.image}/>
                <Text style={props.textStyle}>{props.text}</Text>
            </View>
        </Container>
    );
    render() {
        return (
            <AppIntroSlider
                slides={slides}
                renderItem={this._renderItem}
                renderNextButton={this._renderNextButton}
                onDone={this._onDone}
                renderDoneButton={this._renderDoneButton}



            />
        );
    }
}
module.exports = Intro;