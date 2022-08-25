import React from 'react'
import { StyleSheet, Text, View, Dimensions, Pressable } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

const ScrollItem = (props) => {
    let color = '#545454'
    let fontSize = responsiveFontSize(2.5)
    if(props.number==props.current){
            fontSize = responsiveFontSize(6)
            color = '#dedede'
    }
    else if(parseInt(props.number)==props.current-1 || parseInt(props.number)==props.current+1 || (props.current==59 && parseInt(props.number)=='00') || (props.current==0 && parseInt(props.number)=='59')  || (props.current==23 && parseInt(props.number)=='00') || (props.current==0 && parseInt(props.number)=='23')){
            fontSize = responsiveFontSize(4)
            color = '#808080'
    }
    return (
            <Pressable onPress={props.onClick}>
                <View style={styles.scrollItem}>
                    <Text key={props.index} style={[styles.scrollItemText, {fontSize:fontSize, color:color}]}>{props.number}</Text>
                </View>
            </Pressable>
    );
}

export default ScrollItem

const styles = StyleSheet.create({
    scrollItem:{
        height:Dimensions.get('window').width/4,
        width:Dimensions.get('window').width/2,
        alignItems:'center',
        justifyContent:'center'
    },
    scrollItemText:{
        textAlign:'center',
    },
})
