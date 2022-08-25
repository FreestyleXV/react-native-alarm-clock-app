import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Animated, Dimensions, Pressable, FlatList } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import Database from './Database';

import ScrollItem from './ScrollItem';

const BigAlarm = (props) => {

    const [animationValue, setAnimationValue] = useState(new Animated.Value(0))

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    let hourFlatlistRef;
    let hoursArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    let minuteFlatlistRef;
    let minutesArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']

    useEffect(() => {
        console.log(props.bigAlarm)
        let hour = parseInt(props.bigAlarm.hour.split(':')[0])
        setHours(hour)
        let minute = parseInt(props.bigAlarm.hour.split(':')[1])
        setMinutes(minute)
        console.log(hour, minute)
        let toValue = 1
        Animated.spring(
            animationValue,
            {
                toValue: toValue,
                useNativeDriver: true
            }
        ).start()
    }, [])

    const onMinuteClick = (minute)=>{
        if(minute < 180 && minute > 0){
            minuteFlatlistRef.scrollToIndex({index:parseInt(minute)-1})
        }
    }
    const scrollMinutes = (evt)=> {
        let currentMinutes = parseInt(Math.round(evt.nativeEvent.contentOffset.y/(Dimensions.get('window').width/4)))+Math.floor((evt.nativeEvent.layoutMeasurement.height/2)/(Dimensions.get('window').width/4))
        
        while(currentMinutes>=60){
            currentMinutes = currentMinutes-60
        }
        if(currentMinutes != minutes){
            setMinutes(currentMinutes)
        }
    }
    const moveToCenterMinute = (evt) => {
        minuteFlatlistRef.scrollToIndex({index:minutes+59, animated:false})
    }
    const renderMinute = ({ item, index }) => {
        return (
            <ScrollItem onClick={()=>{onMinuteClick(index)}} current={minutes} number={item}/>
        );
    }
    

    const onHourClick = (hour)=>{
        if(hour < 72 && hour > 0){
            hourFlatlistRef.scrollToIndex({index:parseInt(hour)-1})
        }
    }
    const scrollHours = (evt)=> {
        let currentHours = parseInt(Math.round(evt.nativeEvent.contentOffset.y/(Dimensions.get('window').width/4)))+Math.floor((evt.nativeEvent.layoutMeasurement.height/2)/(Dimensions.get('window').width/4))
        
        while(currentHours>=24){
            currentHours = currentHours-24
        }
        if(currentHours != hours){
            setHours(currentHours)
        }
    }
    const moveToCenterHour = (evt) => {
        hourFlatlistRef.scrollToIndex({index:hours+23, animated:false})
    }
    const renderHour = ({ item, index }) => {
        return (
            <ScrollItem onClick={()=>{onHourClick(index)}} current={hours} number={item}/>
        );
    }

    const onClose = async()=>{
        let toValue = 0
        Animated.spring(
            animationValue,
            {
                toValue: toValue,
                friction:9,
                useNativeDriver: true
            }
        ).start(()=>{props.close()})
    }

    const update = async()=>{
        let hour = hours<10?`0${hours}`:hours
        let minute = minutes<10?`0${minutes}`:minutes
        let time = `${hour}:${minute}`
        await Database.updateHour(time, props.bigAlarm.id)
        onClose()
    }

    return (
        <View style={styles.container}>
            <Pressable style={styles.blackout} onPress={ onClose }>
                <View style={styles.blackout}></View>
            </Pressable>
            <Animated.View 
                style={{
                    position:'absolute',
                    top:props.top,
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').width,
                    transform: [{ scaleY:animationValue }],
                    backgroundColor:'#2e2e2e',
                    borderRadius: Dimensions.get('screen').width/12
                }}
            >
                <View style={styles.timePicker}>
                    <FlatList
                        key={'hours'}
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollHours}
                        data={hoursArray}
                        renderItem={renderHour}
                        ref={ref=>hourFlatlistRef=ref}
                        initialScrollIndex={23+hours}
                        onMomentumScrollEnd={moveToCenterHour}
                        snapToInterval={Dimensions.get('window').width/4}
                        getItemLayout={(data, index) => ({length: Dimensions.get('window').width/4, offset: Dimensions.get('window').width/4 * index, index})}
                        keyExtractor={(item, index) => String(index)}
                        decelerationRate={'fast'}
                    >
                    </FlatList>
                    <FlatList
                        key={'minutes'}
                        style={styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        onScroll={scrollMinutes}
                        data={minutesArray}
                        renderItem={renderMinute}
                        ref={ref=>minuteFlatlistRef=ref}
                        initialScrollIndex={59+minutes}
                        onMomentumScrollEnd={moveToCenterMinute}
                        snapToInterval={Dimensions.get('window').width/4}
                        getItemLayout={(data, index) => ({length: Dimensions.get('window').width/4, offset: Dimensions.get('window').width/4 * index, index})}
                        keyExtractor={(item, index) => String(index)}
                        decelerationRate={'fast'}
                    >
                    </FlatList>
                </View>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Pressable onPress={()=>{props.edit()}} style={[styles.button, {backgroundColor:'darkgray'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Opcje</Text></Pressable>
                    <Pressable onPress={()=>{update()}} style={[styles.button, {backgroundColor:'#1976D2'}]} android_ripple={{color:'#BBDEFB'}}><Text style={styles.buttonText}>Ok</Text></Pressable>
                </View>
            </Animated.View>
        </View>
    )
}

export default BigAlarm

const styles = StyleSheet.create({
    container:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        top: 0,
        left: 0
    },
    blackout:{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    timePicker:{
        height:3*(Dimensions.get('window').width/4),
        width:Dimensions.get('window').width,
        backgroundColor:'#2e2e2e',
        flexDirection:'row',
        borderRadius: Dimensions.get('screen').width/12
    },
    scrollView:{
        flex:1,
        backgroundColor:'#2e2e2e',
        borderRadius: Dimensions.get('screen').width/12
    },
    scrollItem:{
        height:Dimensions.get('window').width/4,
        width:Dimensions.get('window').width/2,
        alignItems:'center',
        justifyContent:'center'
    },
    scrollItemText:{
        textAlign:'center',
        color:'white',
        textAlignVertical:'center'
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
