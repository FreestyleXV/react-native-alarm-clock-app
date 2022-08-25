import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Pressable, Dimensions, SafeAreaView, FlatList, Switch } from 'react-native'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";

import closeButton from '../assets/close.png'
import confirmButton from '../assets/confirm.png'
import nextImage from '../assets/next.png'
import Database from './Database';
import ReapeatOption from './ReapeatOption';
import TitleOption from './TitleOption';
import ScrollItem from './ScrollItem';

const AlarmOptionsScreen = (props) => {

    const [action, setAction] = useState(false)

    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [headerText, setHeaderText] = useState("")

    const [reapeat, setReapeat] = useState([0,0,0,0,0,0,0])
    const [openReapeatOption, setOpenReapeatOption] = useState(false)
    const toggleRepeatOptions = () => {
        setOpenReapeatOption(prev=>!prev)
    }
    const setRepeatOptions = (data) => {
        if(data == 0){
            setReapeat([0,0,0,0,0,0,0])
        }
        else if(data == 1){
            setReapeat([1,1,1,1,1,1,1])
        }
        else if(data == 2){
            setReapeat([1,1,1,1,1,0,0])
        }
        else{
            setReapeat(data)
        }
    }


    const [title, setTitle] = useState("")
    const [openTitleOption, setOpenTitleOption] = useState(false)
    const toggleTitleOption = () => {
        setOpenTitleOption(prev=>!prev)
    }
    const setTitleOption = (data) => {
        setTitle(data)
    }


    const [vibration, setVibration] = useState(true)
    const [once, setOnce] = useState(false)

    let hourFlatlistRef;
    let hoursArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23']
    let minuteFlatlistRef;
    let minutesArray = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59','00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52','53','54','55','56','57','58','59']

    useEffect(() => {
        if(props.route.params.alarm){
            let time = props.route.params.alarm.hour.split(":")
            setHours(parseInt(time[0]))
            setMinutes(parseInt(time[1]))
            setAction(true)
            setTitle(props.route.params.alarm.title)
            // console.log(props.route.params.alarm);
            if(props.route.params.alarm.vibration==0){
                setVibration(false)
            }
            let alarmRepeat = [0,0,0,0,0,0,0]
            if(props.route.params.alarm.mon==1){
                alarmRepeat[0]=1
            }
            if(props.route.params.alarm.tue==1){
                alarmRepeat[1]=1
            }
            if(props.route.params.alarm.wed==1){
                alarmRepeat[2]=1
            }
            if(props.route.params.alarm.thu==1){
                alarmRepeat[3]=1
            }
            if(props.route.params.alarm.fri==1){
                alarmRepeat[4]=1
            }
            if(props.route.params.alarm.sat==1){
                alarmRepeat[5]=1
            }
            if(props.route.params.alarm.sun==1){
                alarmRepeat[6]=1
            }
            setReapeat(alarmRepeat)
        }
        else{
            let time = new Date(Date.now())
            setHours(time.getHours())
            setMinutes(time.getMinutes())
            console.log(time.getHours(), time.getMinutes());
            setHeaderText('Alarm za 23 godziny 59 minut')
        }
    }, [])

    const confirmButtonHandler = async () => {
        if(action){
            let updateData ={};
            let hour = hours<10?`0${hours}`:hours
            let minute =minutes<10?`0${minutes}`:minutes
            updateData.hour=`${hour}:${minute}`
            updateData.active=1
            updateData.vibration=vibration?1:0
            updateData.repeat = reapeat
            updateData.id = props.route.params.alarm.id
            updateData.title = title
            await Database.update(updateData)
        }
        else{
            await Database.insert(`${hours<10?'0'+String(hours):hours}:${minutes<10?'0'+String(minutes):minutes}`, reapeat, vibration?1:0, title)
        }
        props.navigation.navigate("AlarmList")
    }

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


    const changeVibration = () => {
        setVibration(prev=>!prev)
    }

    const showDays = () => {
        if(reapeat.indexOf(0)==-1){
            return 'Codziennie'
        }
        else if(reapeat.indexOf(0)==5 && reapeat[6]==0){
            return 'Od poniedziałku do piątku'
        }
        else{
            let text = []
            if(reapeat[0]==1){
                text.push('pn')
            }
            if(reapeat[1]==1){
                text.push('wt')
            }
            if(reapeat[2]==1){
                text.push('śr')
            }
            if(reapeat[3]==1){
                text.push('czw')
            }
            if(reapeat[4]==1){
                text.push('pt')
            }
            if(reapeat[5]==1){
                text.push('sb')
            }
            if(reapeat[6]==1){
                text.push('nd')
            }
            if(text.length>0){
                return text.join(", ")
            }
            else{
                return "Raz"
            }
        }
    }


    return (
        <View style={styles.screen}>
            <View style={styles.header}>
                <Pressable
                    style={styles.headerButton}
                    onPress={()=>{props.navigation.navigate("AlarmList")}}
                >
                    <Image
                        style={[styles.headerButton, {marginLeft:10, tintColor:'white'}]}
                        source={closeButton}
                    ></Image>
                </Pressable>
                <View>
                    <Text style={[styles.headerText, styles.headerTopText]}>Dodaj alarm</Text>
                    <Text style={[styles.headerText, styles.headerBottomText]}>{headerText}</Text>
                </View>
                <Pressable
                    style={[styles.headerButton, {marginRight:10}]}
                    onPress={()=>{confirmButtonHandler()}}
                >
                    <Image
                        style={[styles.headerButton, {tintColor:'white'}]}
                        source={confirmButton}
                    ></Image>
                </Pressable>
            </View>
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
            <View style={styles.options}>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Dzwonek</Text>
                    <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:responsiveFontSize(1.5), color:'#808080'}}>
                                Domyślny Dzwonek
                            </Text>
                            <Image source={nextImage} style={{width:Dimensions.get('window').width/10,height:Dimensions.get('window').width/10, tintColor:'white'}}></Image>
                    </View>
                </View>
                <Pressable onPress={toggleRepeatOptions}  android_ripple={{color:'#808080'}}>
                    <View style={styles.option}>
                        <Text key={reapeat} style={styles.optionText}>Powtórz</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:responsiveFontSize(1.5), color:'#808080'}}>
                                {showDays()}
                            </Text>
                            <Image source={nextImage} style={{width:Dimensions.get('window').width/10,height:Dimensions.get('window').width/10, tintColor:'white'}}></Image>
                        </View>
                    </View>
                </Pressable>
                <Pressable onPress={changeVibration} android_ripple={{color:'#808080'}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Wibracje podczas alarmu</Text>
                        <View>
                            <Switch
                                trackColor={{ false: "red", true: "green" }}
                                thumbColor={'white'}
                                ios_backgroundColor="white"
                                onValueChange={changeVibration}
                                value={vibration}
                            />
                        </View>
                    </View>
                </Pressable>
                <View style={styles.option}>
                    <Text style={styles.optionText}>Alarm jednorazowy</Text>
                    <View><Switch/></View>
                </View>
                <Pressable onPress={toggleTitleOption}  android_ripple={{color:'#808080'}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Etykieta</Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Text style={{fontSize:responsiveFontSize(1.5), color:'#808080'}}>
                                {title}
                            </Text>
                            <Image source={nextImage} style={{width:Dimensions.get('window').width/10,height:Dimensions.get('window').width/10, tintColor:'white'}}></Image>
                        </View>
                    </View>
                </Pressable>
            </View>
            {openTitleOption?<TitleOption set={(data)=>{setTitleOption(data)}} close={toggleTitleOption} title={title}/>:null}
            {openReapeatOption?<ReapeatOption set={(data)=>{setRepeatOptions(data)}} close={toggleRepeatOptions} reapeat={reapeat}/>:null}
        </View>
    )
}

export default AlarmOptionsScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        backgroundColor:'purple'
    },
    header:{
        flex:1,
        backgroundColor:'black',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerButton:{
        width:Dimensions.get('screen').width/8,
        height:Dimensions.get('screen').width/8,
    },
    headerText:{
        color:'white',
        textAlign:'center',
        marginTop:5
    },
    headerTopText:{
        fontSize: responsiveFontSize(2.5)
    },
    headerBottomText:{
        fontSize: responsiveFontSize(1.5)
    },
    timePicker:{
        height:3*(Dimensions.get('window').width/4),
        width:Dimensions.get('window').width,
        backgroundColor:'rgb(20,40,20)',
        flexDirection:'row',
    },
    scrollView:{
        flex:1,
        backgroundColor:'black',
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
    options:{
        flex:5,
        backgroundColor:'black',
        flexDirection:'column'
    },
    option:{
        marginTop: 20,
        marginBottom: 15,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginHorizontal:10,
    },
    optionText:{
        color:'white',
        fontSize: responsiveFontSize(2.5),
        
    },
    
})
