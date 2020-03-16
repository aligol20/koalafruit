import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {Header, Left, Button, Icon, Text, Title, Body, Right} from 'native-base';

export default class AppHeader extends Component {
    render() {
        return (
            <Header>

                <Body>
                <View style={{flexDirection: 'row'}}>
                    <Image style={{height: 40, width: 40,margin:10}} source={require('../img/lime.png')}/>
                    <Image style={{height: 40, width: 40,margin:10}} source={require('../img/pumpkin.png')}/>
                    <Image style={{height: 40, width: 40,margin:10}} source={require('../img/pomegranate.png')}/>

                </View>
                </Body>

            </Header>

        );
    }
}
module.export = AppHeader;
