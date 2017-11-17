import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  View,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import StarRating from 'react-native-star-rating';
import { Container, Drawer, Header, Content, Form, Item, Input,Icon, Button } from 'native-base';
import MapView from "react-native-maps";
import Permissions from 'react-native-permissions'
import request from '../CustomerComponents/request'
import socket from '../server/config'
import DriverStandby from './views/DriverStandby'
import DriverConfirmRequest from './views/DriverConfirmRequest'
import DriverEnroute from './views/DriverEnroute'
import Payment from './views/Payment'
import RateComplaint from './views/RateComplaint'

const {width, height}= Dimensions.get('window'); 
const SCREEN_HEIGHT = height;
const SCREEEN_WIDTH = width;
const ASPECT_RATIO = width/height;
const LATTITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO;
var watchID = null;
 
export default class DriverHome extends React.Component {
  
  static navigationOptions = {
    title:'',
    header: null
  };


 constructor(props){
 console.log('constructor');
  super(props);
 
this.state={
      d_Name:'Ousman',
      d_Phone:'01123840000',
      region:{
      latitude:3.253502,
      longitude:101.653326,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0422,
    },
      markerPosition:{
      latitude:3.253502,
      longitude:101.653326,
    },
   tripdetails:{},
   distance:{},
   duration:{},
   starCount: 0,
   feedbackText:'',
   infoText:"You'are online",
   showmap:false, 
   showDconfirm:false,
   Tripcompleted:false
  }
}

componentDidMount(){   
//  Permissions.check('location', 'whenInUse')
     //  .then(response => {
      //   this.setState({ locationPermission: response })
     //  });
   

    // Permissions.request('location', 'whenInUse')
     //  .then(response => {
     //    this.setState({ locationPermission: response })
     //  });
     
     // Alert.alert(
    //  'Your location is turned off?',
    //  'Please turn your location on',
    //  [
      //  {text: 'No', onPress: () => console.log('permission denied'), style: 'cancel'},
      //  this.state.photoPermission == 'undetermined'?
        //  {text: 'OK', onPress: this._requestPermission.bind(this)}
        //  : {text: 'Open Settings', onPress: Permissions.openSettings}
     // ]
   // )

    navigator.geolocation.getCurrentPosition((position) => {
      
      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var initialRegion={
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
       };
      
      this.setState({region: initialRegion, markerPosition: initialRegion});
    },
     (error) => alert(JSON.stringify(error)),
   {enableHighAccurracy: false, timeout: 20000, maximuAge: 1000}
    );

    this.watchID  = navigator.geolocation.watchPosition((position) => {

      var lat = position.coords.latitude;
      var long = position.coords.longitude;

      var lastRegion={
       latitude: lat,
       longitude: long,
       latitudeDelta: LATTITUDE_DELTA,
       longitudeDelta: LONGITUDE_DELTA
      };
      this.setState({initialRegion: lastRegion, markerPosition: lastRegion});
  });

}    


componentWillUnmount(){
  navigator.geolocation.clearWatch(this.watchId);
}

componentWillMount(){
  socket.on('triprequest', (data)=>{
   if(data !==null){
    this.setState({
     showDconfirm:true,
     tripdetails: data.data
     });  
        this.getDuration();   
        console.log('tripssssss', this.state.tripdetails);
  }
    });
}

componentDidUpdate(){
 // console.log('componentDidUpdate');
//   if(this.mapRef !==null){
//   this.mapRef.fitToSuppliedMarkers(
//         this.state.markerids,
//         false, // not animateds
//       );
// }

}


getDuration(){
 return request.get("https://maps.googleapis.com/maps/api/distancematrix/json")  
     .query({
        //origin: this.state.origin.latitude + "," + this.state.origin.longitude,
        //destination: this.state.destination.latitude + "," + this.state.destination.longitude,
        origins: this.state.region.latitude + "," + this.state.region.longitude,
        destinations: this.state.tripdetails.CustomerCords.latitude + ","+ this.state.tripdetails.CustomerCords.longitude,
        travelMode:"bicycling",
        key:"AIzaSyAMMYiE-JJBJGtUNxzSXtcQPCcLp-cDgKE"
      })
      .finish((error, data)=>{
        try {
          var distanceMatrix = data.body.rows[0].elements[0];
          this.setState({
            distance: distanceMatrix.distance.text,
            duration : distanceMatrix.duration.text
          });
          console.log('results', data);
          console.log('the distance in m', this.state.distance);
          console.log('the duration in minutes', this.state.duration);
          console.log('the object returned',data);
        } catch (e) {
          console.error(e);
          return null;
        }
      });    
}


//function to accept triprequest
respondtoRequest(){
this.setState({
showDconfirm:false,
showmap:true
});
if(this.state.tripdetails.userName !== null){
socket.emit('response', {
    "driverName": this.state.d_Name,
    "driverPhone": this.state.d_Phone,
    "status": 'confirm',
    "location": this.state.region, 
    "CustomerName":this.state.tripdetails.userName
    });
}
console.log(this.state.showDconfirm, this.state.showmap);
}


onPressOnline(){
  this.setState({
    infoText:"You'are online",
    driverStatus:"online"
  });
  console.log("set online");
}


onPressOffline(){
  this.setState({
    infoText:"You'are offline",
    driverStatus:"offline"
  });
  console.log("set offline");
}

//function to handle the ratings
 onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }



render() {

if(this.state.showDconfirm == true){
  return( 
   <DriverConfirmRequest  pickName={this.state.tripdetails.pickUpAddress} dropoffName={this.state.tripdetails.dropOffAddress}
    onPressConfirm={()=> this.respondtoRequest()} /> 
);}

else if(this.state.showDconfirm == false && this.state.showmap == true){
  return (
    <DriverEnroute  d_coords={this.state.region}  d_markP={this.state.markerPosition}  c_coords={this.state.tripdetails.CustomerCords}
    duration={this.state.duration} distance={this.state.distance}
    />
    );}

else if(this.state.Tripcompleted){
  return(
  <RateComplaint starCount={this.state.starCount}  onStarRatingPress={this.onStarRatingPress.bind(this)}  onChangeText={(text) => this.setState({feedbackText: text})}/>
  );}

else
return( 
<DriverStandby infoText={this.state.infoText}  onlineBtn={()=>this.onPressOnline()} offlineBtn={()=>this.onPressOffline()} /> 
);

}
}

 socket.on("connect", ()=>{
      console.log('driver connected to server');
    });

module.exports = DriverHome;