import React from 'react';
import {
  AppRegistry,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  KeyboardAvoidingView,
  
} from 'react-native';

import { Container, Header, Content, Form, Item, Input, Icon } from 'native-base';

import Db from '../shared/Db'

export default class RegistrationScreen extends React.Component {


  static navigationOptions = {
    title: 'Sing Up',
  };

constructor(props){
  super(props);

  Db.set('this/is/path', {mobile:'23234', name: 'barry allen'});

  this.state={
    username:'',
    password:''
  };
}

ComponentDidMount(){
  
  this.dataForm.on('child_added', (dataSnapshot) => {
    this.dataForm.push({
     id: dataSnapshot.key(),
     Username: dataSnapshot.val() } );
  });

}

sendDataForm (){
  if (this.state.username !== ''){
    this.dataForm.push({
      username: this.state.username
    });
    this.setState({
      username: ''
    });
}
}


  render() {
    return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
     
      <Form style={styles.form}>
            <Item>
              <Icon name="person"/>
              <Input placeholder="Full name" 
               keyboardType="email-address"
               returnKeyType="next"
               autoCapitalize="none"
               autoCorrect={false}
               onChangeText={(Text) => this.setState({username: text})}
               value={this.state.username}
              />
            </Item>

    <Item>
              <Icon name="lock" />
              <Input placeholder="Passwrod" 
               returnKeyType="next"
               autoCapitalize="none"
               autoCorrect={false}
               secureTextEntry
              />
            </Item>


        <Item>
              <Icon name="mail" color="white"/>
              <Input placeholder="Email" 
               keyboardType="email-address"
               returnKeyType="next"
               autoCapitalize="none"
               autoCorrect={false}
              />
            </Item>

         <Item>
              <Input placeholder="Phone" 
               keyboardType="email-address"
               returnKeyType="next"
               autoCapitalize="none"
               autoCorrect={false}
              />
            </Item>


     </Form>
         <TouchableOpacity  style={styles.buttonStyle1}>                    
         <Text style={styles.buttonText1}>Sing Up
         onPress={() => this.sendDataForm()}
         </Text>
          </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonStyle2}>
           <Text style={styles.intructText}>Forgot your password? </Text>
     </TouchableOpacity>
   
    
</KeyboardAvoidingView>
     
    );
  }
}

const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'rgb(189, 195, 199)'
  },

  form :{
padding: 20,
paddingLeft: 20,

},

    buttonStyle1: {
        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: 'rgb(39, 174, 96)',
        height: 45,
        width: 230,
        margin: 10,
        paddingHorizontal: 10,


    },
    buttonStyle2: {
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,

    },

    buttonText1: {
        alignItems: 'center',
        fontSize: 20,
        color: 'rgb(236, 240, 241)',
        margin: 10,
        fontWeight: 'bold'
    },

    intructText: {
        alignSelf: 'center',
        fontSize: 15,
        color: "white",
        marginTop: 20 ,
      
    }


});