import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import AppHeader from '../appHeader'
import Sidebar from '../drawer/sideBar'
const {width, height}= Dimensions.get('window'); 



// functional component & pure
const DriverStandby = (props) => (
<Drawer  
ref={(ref) => { this.drawer = ref;}}
content={<Sidebar name={props.name} />}
onClose={()=> this.closeDrawer()} 
>

<View style = {styles.container}>
  <AppHeader  openDrawer={this.openDrawer.bind(this)}/>
 <View style = {styles.FtInfoContainer}>
        <Text style = {styles.text }>{props.infoText} </Text>
        <Text style={styles.text2}>Stay online to receive incoming trip request</Text>
 </View>
    <View style={styles.btnContainer}>
      <Button  style={styles.buttonStyle1}  onPress={props.onlineBtn}
      >
      <Text style={styles.buttonText1}>online</Text>
      </Button>

      <Button  style={styles.buttonStyle2}  onPress={props.offlineBtn}>
      <Text style={styles.buttonText2}>offline</Text>
      </Button>

    </View>
 </View>
</Drawer>
)


//function to close and open drawer
closeDrawer = () =>{
    this.drawer._root.close()
  };

  openDrawer = () => {
    this.drawer._root.open()
  };


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)'
    },

 FtInfoContainer:{
      top:150,
      alignItems:'center',
      justifyContent:'center',
      position:'absolute',
      height:height*0.4,
      width:width*0.7,
      paddingLeft:10,
      marginLeft:60,
      borderColor: '#fff',
      borderWidth:2,
      borderRadius:500,
      shadowColor: '#000',
      shadowOpacity:0.8,
      shadowRadius:2,
      shadowOffset:{
      height:1,
      width:0
      },
       backgroundColor:'#2c3e50'
  },
  text:{
    fontSize:26,
    color:'white'
  },
  text2:{
    marginTop:10,
     fontSize:13,
    color:'white'
  },
  btnContainer:{
    flexDirection:'row',
    top:440,
    marginLeft:120,
  },
 buttonStyle1: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(39, 174, 96)',
        height: height*0.056,
        width: width*0.19,
        marginLeft: 5,
},
 buttonStyle2: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'rgb(236, 240, 241)',
        height: height*0.056,
        width: width*0.19,
        marginLeft: 5,
},
buttonText1: {
        alignItems: 'center',
        fontSize: 17,
        color: 'rgb(236, 240, 241)',
        margin: 10,
        fontWeight: 'bold'
    },

buttonText2: {
        alignItems: 'center',
        fontSize: 17,
        color: 'rgb(0,0,0)',
        margin: 10,
        fontWeight: 'bold'
    },


});

module.exports = DriverStandby;