import React from 'React';
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  Dimensions,
  AsyncStorage
}
from "react-native";
import { Container, Header, Content, Form, Item, Input, Icon, Button } from 'native-base';
import request from '../CustomerComponents/request'
import { GiftedForm, GiftedFormManager } from 'react-native-gifted-form'


export default class loginScreen extends React.Component{

 static navigationOptions = {
    title:'Login',
  };

  constructor(props, context) {
    super(props, context);

  }

  handleValueChange(values) {
   // console.log('handleValueChange', values)
    this.setState({ form: values })
  }


render() {
  const {navigate} = this.props.navigation;
    return (     
<GiftedForm
        formName='login' // GiftedForm instances that use the same name will also share the same states
        openModal={(route) => {
          navigator.push(route); // The ModalWidget will be opened using this method. Tested with ExNavigator
        }}

        onValueChange={this.handleValueChange.bind(this)}

        clearOnClose={false} // delete the values of the form when unmounted
        defaults={{
          /*
          username: 'Farid',
          'gender{M}': true,
          password: 'abcdefg',
          country: 'FR',
          birthday: new Date(((new Date()).getFullYear() - 18)+''),
          */
        }}
        validators={{
          userName: {
            title: 'Username',
            validate: [{
              validator: 'isLength',
              arguments: [3, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            },{
              validator: 'matches',
              arguments: /^[a-zA-Z0-9]*$/,
              message: '{TITLE} can contains only alphanumeric characters'
            }]
          },
          password: {
            title: 'Password',
            validate: [{
              validator: 'isLength',
              arguments: [6, 16],
              message: '{TITLE} must be between {ARGS[0]} and {ARGS[1]} characters'
            }]
          } 
        }}
      >
        <GiftedForm.SeparatorWidget />

        <GiftedForm.TextInputWidget
          name='userName'
          title='UserName'
          image={require('../icons/color/contact_card.png')}
          placeholder='mbbarry91'
          clearButtonMode='while-editing'
          // onTextInputFocus={(currentText = '') => {
          //   if (!currentText) {
          //     let fullName = GiftedFormManager.getValue('signupForm', 'fullName');
          //     if (fullName) {
          //       return fullName.replace(/[^a-zA-Z0-9-_]/g, '');
          //     }
          //   }
          //   return currentText;
          // }}
        />

        <GiftedForm.TextInputWidget
          name='password' // mandatory
          title='Password'
          placeholder='******'
          clearButtonMode='while-editing'
          secureTextEntry={true}
          image={require('../icons/color/lock.png')}
        />         

        <GiftedForm.SwitchWidget
          name='isDriver'
          title='Login as Driver'
        />

        <GiftedForm.ErrorsWidget/>

        <GiftedForm.SubmitWidget
          title='login'
          widgetStyles={{
            submitButton: {
              backgroundColor: 'green',
            }
          }}

          onSubmit={(isValid, values, validationResults, postSubmit = null, modalNavigator = null ) => {
            if (isValid === true) {

             request.post("http://172.20.10.2:3000/api/login")
                   .send(values)
                   .finish((error, res)=>{
                    if(error){
                      postSubmit(['server is offline, please try again']);
                    }
                    else{
                        if(res.body.loggedIn && res.body.error == null){

                          AsyncStorage.setItem('user', JSON.stringify(res.body.data), (error)=> {
                                  if(error){
                                    //console.log('data failed', error);
                                  }
                                  else{
                                    //console.log('data saved');
                                  }
                                });
                          if(res.body.data.isDriver){
                              //console.log('driver page is di..', res.body.data.isDriver);
                              navigate('DriverHome');
                             }
                          else{
                            //console.log('customer page is di...', res.body.data.isDriver);
                            navigate('CustomerHome');
                            }
                            postSubmit();
                          }
                          else{
                               //console.log(res);
                              postSubmit(res.body.error);
                            }

                      }

                  });               
              
            }
          }}
        />  
      </GiftedForm>
    );
  }

}

    