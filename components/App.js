import React from 'react';
import {
  AppRegistry,
} from 'react-native';

import HomeScreen from './HomeScreen'
import ChatScreen from './ChatScreen'

import { StackNavigator } from 'react-navigation';

const mapNavigationStateParamsToProps = (SomeComponent) => {
    return class extends React.Component {
        static navigationOptions = SomeComponent.navigationOptions; // better use hoist-non-react-statics
        render() {
            const {navigation: {state: {params}}} = this.props
            return <SomeComponent {...params} {...this.props} />
        }
    }
}

const SimpleApp = StackNavigator({
  Home: { screen: mapNavigationStateParamsToProps(HomeScreen) },
  Chat: { screen: mapNavigationStateParamsToProps(ChatScreen) },
});

export default SimpleApp

// AppRegistry.registerComponent('SimpleApp', () => SimpleApp);