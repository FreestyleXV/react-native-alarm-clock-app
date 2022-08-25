import React, {useEffect, useState} from 'react'
import { View, Text, StatusBar, ToastAndroid, Pressable, StyleSheet, Vibration, DatePickerIOSComponent } from 'react-native'
import Database from './Database'
import { Audio } from 'expo-av';
import defaultRingtone from '../assets/ringtones/default.mp3'
// import * as MediaLibrary from "expo-media-library";

const TitleScreen = (props) => {

    let interval;

    const [toDisable, setToDisable] = useState(null)
    const [disableTimeout, setdisableTimeout] = useState(null)

    const loadSound = async()=>{
        const { sound } = await Audio.Sound.createAsync(
            defaultRingtone
        );
        return sound
    }

    const disable = (id)=>{
        setToDisable(id)
        clearTimeout(disableTimeout)
        setdisableTimeout(setTimeout(()=>{Database.disable(toDisable)},60000))
    }

    useEffect(() => {
        clearInterval(interval)
        Database.create()
        const sound = loadSound()
        setTimeout
        const intervalFunc = async () => {
            Vibration.cancel();
            
            let dbAlarms = await Database.get()
            dbAlarms = await JSON.parse(dbAlarms)
            dbAlarms = dbAlarms.rows._array
            // console.log(dbAlarms);
            let ring = false
            let today = new Date(Date.now())
            dbAlarms.forEach(alarm => {
                if(alarm.active==1){
                    if(alarm.mon == 0 && alarm.tue == 0 && alarm.wed == 0 && alarm.thu == 0 && alarm.fri == 0 && alarm.sat == 0 && alarm.sun == 0){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                                disable(alarm.id)
                            }
                        }
                    }
                    else if(today.getDay()==0 && alarm.sun==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==1 && alarm.mon==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==2 && alarm.tue==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==3 && alarm.wed==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==4 && alarm.thu==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==5 && alarm.fri==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                    else if(today.getDay()==6 && alarm.sat==1){
                        if(today.getHours() == parseInt(alarm.hour.split(":")[0])){
                            if(today.getMinutes() == parseInt(alarm.hour.split(":")[1])){
                                ring=true
                                if(alarm.vibration==1){
                                    Vibration.vibrate(1000)
                                }
                            }
                        }
                    }
                }
            })
            if(ring){
                await (await sound).playAsync()
            }
            else{
                await (await sound).stopAsync()
            }
        }
        interval = setInterval(intervalFunc, 2000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    const onPress = () => {
        props.navigation.navigate("AlarmList")
    }

    return (
        <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={onPress}
        android_ripple={{color: '#808080'}}>
        <View style={{flex:1, flexDirection:"column"}}>
            <View style={{flex:1, justifyContent:"flex-end"}}>
                <Text style={{fontWeight:"bold", fontSize:72, textAlign:"center", color:'white'}} adjustsFontSizeToFit>
                    Sqlite app
                </Text>
            </View>
            <View style={{flex:1, justifyContent:"space-around"}}>
                <View style={{flex:2, justifyContent:"flex-start"}}>
                    <Text style={styles.buttonText} adjustsFontSizeToFit>
                        Ustaw sobie budzik Xiaomi
                    </Text>
                </View>
                <View style={{flex:1, justifyContent:"center"}}>
                    <Text style={styles.buttonText} adjustsFontSizeToFit>
                        Touch Anywhere to Start
                    </Text>
                </View>
            </View>
        </View>
      </Pressable>
    </View>
    )
}

export default TitleScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      height: '100%',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      backgroundColor: 'black',
    },
    buttonText: {
      fontSize: 24,
      color: 'white',
      textAlign:'center',
    },
  });

