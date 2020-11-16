import React from 'react';
import {ScrollView,Image,Button,Text,View,StyleSheet} from 'react-native';
//importo l'headerButton
import {HeaderButton} from 'react-navigation-header-buttons';
//importo Ionicons
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import {Platform} from 'react-native';


const CustomHeaderButton = props => {
 


    /**
     * NELLA RETURN DEFINISCO DENTRO HEADERBUTTON:
     * props così ricevo tutti gli oggetti stile e poi gli passo le descrizioni delle icone
     */
    return (
        <HeaderButton
          {...props}
          IconComponent={Ionicons}
          iconSize={23}
          color={Platform.OS === 'android' ? 'white' : Colors.quinto}
        />
      );
    };
    
    export default CustomHeaderButton;
    