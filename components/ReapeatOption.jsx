import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions, Pressable, Image, Switch } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import confirmButton from '../assets/confirm.png'

const ReapeatOption = (props) => {

    const [animationValue, setAnimationValue] = useState(new Animated.Value(0))

    const [weekAnimationValue, setweekAnimationValue] = useState(new Animated.Value(0))
    const [weekMenuOpened, setWeekMenuOpened] = useState(false)

    const [repeatSwitches, setRepeatSwitches] = useState([false,false,false,false,false,false,false])


    const changeDaySwitch = (id) => {
        let switches = [...repeatSwitches]
        switches[id] = !switches[id]
        setRepeatSwitches(switches)
    }
    const setWeekData = ()=>{
        let data = []
        for(let i = 0; i < 7; i++){
            if(repeatSwitches[i]){
                data.push(1)
            }
            else{
                data.push(0)
            }
        }
        setData(data)
        closeWeekMenu()
    }

    useEffect(() => {
        let switches = []
        for(let i = 0; i < 7; i++){
            if(props.reapeat[i]==1){
                switches.push(true)
            }
            else{
                switches.push(false)
            }
        }
        setRepeatSwitches(switches)
    }, [])

    const openWeekMenu = () => {
        Animated.spring(
            weekAnimationValue,
            {
                toValue: -Dimensions.get('window').height,
                useNativeDriver: true,
            }
        ).start()
    }
    const closeWeekMenu = () => {
        Animated.spring(
            weekAnimationValue,
            {
                toValue: 0,
                useNativeDriver: true,
            }
        ).start()
    }

    let repeat = 0

    if(props.reapeat.indexOf(0)==-1){
        repeat = 1
    }
    else if(props.reapeat.indexOf(0)==5 && props.reapeat[6]==0){
        repeat = 2
    }
    else if(props.reapeat.indexOf(1)!=-1){
        repeat = 3
    }
    
    useEffect(() => {
        Animated.spring(
            animationValue,
            {
                toValue: -Dimensions.get('screen').height,
                useNativeDriver: true,
            }
        ).start()
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
        closeOptions()
        props.set(data)
    }

    

    return (
        <Animated.View style={{position:'absolute', top:Dimensions.get('screen').height, left:0, width:'100%', height:'100%', transform:[{translateY:animationValue}]}}>
            <Pressable style={{ top:0, left:0, width:Dimensions.get('window').width, height:Dimensions.get('window').height}} onPress={closeOptions}>
                <View></View>
            </Pressable>
            <View style={styles.container}>
                <View style={{height:30, width:Dimensions.get('window').width}}></View>
                <Pressable android_ripple={{color: '#1976D2'}} onPress={()=>{setData(0)}}>
                    <View style={ repeat==0?styles.selectedOption:styles.option}>
                        <Text style={repeat==0?styles.selectedText:styles.text}>Tylko Raz</Text>
                        {repeat==0?<Image style={{tintColor:'#BBDEFB', width:Dimensions.get('window').width/10, height:Dimensions.get('window').width/10}} source={confirmButton}></Image>:null}
                    </View>
                </Pressable>
                <Pressable android_ripple={{color: '#1976D2'}} onPress={()=>{setData(1)}}>
                    <View style={repeat==1?styles.selectedOption:styles.option}>
                        <Text style={repeat==1?styles.selectedText:styles.text}>Codziennie</Text>
                        {repeat==1?<Image style={{tintColor:'#BBDEFB', width:Dimensions.get('window').width/10, height:Dimensions.get('window').width/10}} source={confirmButton}></Image>:null}
                    </View>
                </Pressable>
                <Pressable android_ripple={{color: '#1976D2'}} onPress={()=>{setData(2)}}>
                    <View style={repeat==2?styles.selectedOption:styles.option}>
                        <Text style={repeat==2?styles.selectedText:styles.text}>Od poniedziałku do piątku</Text>
                        {repeat==2?<Image style={{tintColor:'#BBDEFB', width:Dimensions.get('window').width/10, height:Dimensions.get('window').width/10}} source={confirmButton}></Image>:null}
                    </View>
                </Pressable>
                <Pressable android_ripple={{color: '#1976D2'}} onPress={()=>{openWeekMenu()}}>
                    <View style={repeat==3?styles.selectedOption:styles.option}>
                        <Text style={repeat==3?styles.selectedText:styles.text}>Własne</Text>
                        {repeat==3?<Image style={{tintColor:'#BBDEFB', width:Dimensions.get('window').width/10, height:Dimensions.get('window').width/10}} source={confirmButton}></Image>:null}
                    </View>
                </Pressable>
            </View>
            <Animated.View 
                style={{
                    position:'absolute',
                    top:Dimensions.get('screen').height,
                    width:Dimensions.get('screen').width,
                    height:Dimensions.get('screen').height,
                    transform:[{translateY:weekAnimationValue}],
                }}
            >
                <Pressable
                    style={{
                        position:'absolute',
                        top:0,
                        width:Dimensions.get('screen').width,
                        height:Dimensions.get('screen').height,
                    }}

                    onPress={closeWeekMenu}
                >
                </Pressable>
                <View
                    style={styles.weekContainer}
                >
                    <View style={{height:30, width:Dimensions.get('window').width}}></View>
                    <View>
                        <Text style={{fontSize:responsiveFontSize(3), textAlign:'center', color:'white'}}>Powtórz</Text>
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>poniedziałek</Text>
                        <Switch
                                thumbColor={'white'}
                                ios_backgroundColor="white"
                                onValueChange={()=>{changeDaySwitch(0)}}
                                value={repeatSwitches[0]}
                            />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>wtorek</Text>
                        <Switch
                                thumbColor={'white'}
                                ios_backgroundColor="white"
                                onValueChange={()=>{changeDaySwitch(1)}}
                                value={repeatSwitches[1]}
                            />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>środa</Text>
                        <Switch
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={()=>{changeDaySwitch(2)}}
                            value={repeatSwitches[2]}
                        />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>czwartek</Text>
                        <Switch
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={()=>{changeDaySwitch(3)}}
                            value={repeatSwitches[3]}
                        />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>piątek</Text>
                        <Switch
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={()=>{changeDaySwitch(4)}}
                            value={repeatSwitches[4]}
                        />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>sobota</Text>
                        <Switch
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={()=>{changeDaySwitch(5)}}
                            value={repeatSwitches[5]}
                        />
                    </View>
                    <View style={styles.weekDay}>
                        <Text style={styles.weekDayText}>niedziela</Text>
                        <Switch
                            thumbColor={'white'}
                            ios_backgroundColor="white"
                            onValueChange={()=>{changeDaySwitch(6)}}
                            value={repeatSwitches[6]}
                        />
                    </View>
                    <View style={{flexDirection:'row', marginTop:20}}>
                        <Pressable onPress={()=>{closeWeekMenu()}} style={[styles.button, {backgroundColor:'darkgray'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Anuluj</Text></Pressable>
                        <Pressable onPress={()=>{setWeekData()}} style={[styles.button, {backgroundColor:'#1976D2'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Ok</Text></Pressable>
                    </View>
                </View>
            </Animated.View>
        </Animated.View>
    )
}

export default ReapeatOption

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width,
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
        marginHorizontal:20,
    },
    selectedOption:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').width/5,
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20,
        backgroundColor:'#1976D2',
        flexDirection:'row'
    },
    text:{
        color:'white',
        fontSize:responsiveFontSize(3),
    },
    selectedText:{
        color:'#BBDEFB',
        fontSize:responsiveFontSize(3),
    },
    weekContainer:{
        backgroundColor:'#808080',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        position:'absolute',
        bottom:0,
        width:Dimensions.get('screen').width,
        height:(Dimensions.get('screen').width*3)/2,
    },
    weekDay:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20,
        height:Dimensions.get('window').width/8
    },
    weekDayText:{
        fontSize:responsiveFontSize(3),
        color:'white',
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
    }
})
