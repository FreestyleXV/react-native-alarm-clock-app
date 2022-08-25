import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Switch, Animated, Pressable, Image, TextInput } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import confirmButton from '../assets/confirm.png'


const TitleOption = (props) => {
    const [animationValue, setAnimationValue] = useState(new Animated.Value(0))

    const [title, setTitle] = useState(props.title)

    let textInput;
    
    useEffect(() => {
        Animated.spring(
            animationValue,
            {
                toValue: -Dimensions.get('screen').height,
                useNativeDriver: true,
            }
        ).start(textInput.focus())
    }, [])

    const closeOptions = () => {
        Animated.spring(
            animationValue,
            {
                toValue: 0,
                useNativeDriver: true,
            }
        ).start(props.close)
    }

    const setData = (data) => {
        textInput.blur()
        closeOptions()
        props.set(data)
    }

    

    return (
        <Animated.View style={{position:'absolute', top:Dimensions.get('screen').height, left:0, width:'100%', height:'100%', transform:[{translateY:animationValue}]}}>
            <Pressable style={{ top:0, left:0, width:Dimensions.get('window').width, height:Dimensions.get('window').height}} onPress={()=>{if(textInput.isFocused()){textInput.blur()}else{closeOptions()}}}>
                <View></View>
            </Pressable>
            <View style={styles.container}>
                <View style={{height:30, width:Dimensions.get('window').width}}></View>
                <View style={styles.option}>
                    <Text style={[styles.text, {textAlign:'center'}]}>Podaj etykietę alarmu</Text>
                </View>
                <TextInput
                    placeholder='Wprowadź etykietę'
                    placeholderTextColor={"#d1d1d1"}
                    defaultValue={title}
                    onChangeText={text=>setTitle(text)}
                    selectTextOnFocus={true}
                    ref={ref=>textInput=ref}
                    style={styles.input}
                    selectionColor={'#1976D2'}
                ></TextInput>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Pressable onPress={()=>{closeOptions()}} style={[styles.button, {backgroundColor:'darkgray'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Anuluj</Text></Pressable>
                    <Pressable onPress={()=>{setData(title)}} style={[styles.button, {backgroundColor:'#1976D2'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Ok</Text></Pressable>
                </View>
            </View>
        </Animated.View>
    )
}

export default TitleOption

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:2*(Dimensions.get('window').width/3),
        bottom:0,
        // zIndex:10,
        backgroundColor:'#808080',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
    },
    option:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width/5,
        justifyContent:'center',
    },
    text:{
        color:'white',
        fontSize:responsiveFontSize(3),
    },
    button:{
        marginHorizontal:20,
        width:(Dimensions.get('window').width/2)-40,
        paddingVertical:10,
        borderRadius:responsiveFontSize(3),
    },
    buttonText:{
        color:'white',
        fontSize:responsiveFontSize(3),
        textAlign:'center'
    },
    input:{
        borderWidth:3,
        borderRadius:Dimensions.get('window').width/20,
        paddingVertical:10,
        borderColor:'#1976D2',
        fontSize:responsiveFontSize(3),
        backgroundColor:'#787878',
        width:Dimensions.get('window').width-50,
        paddingLeft:20,
        marginHorizontal:25,
        color:'white',
        textDecorationLine:'none'
    }
})
