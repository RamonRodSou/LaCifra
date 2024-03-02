import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewCifra from '../Components/NewCifra/NewCifra';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../Components/Home/Home';

const Tab = createBottomTabNavigator();

const HomePage = () => {
    return (
        <Home/>
    )
}

const RegisterNewCifra = () => {
    return (
         <NewCifra/>
    )
}

const Router = () => {
  return (
    <Tab.Navigator 
        initialRouteName="Feed"
      >
        <Tab.Screen 
            name="Home" 
            component={HomePage} 
            options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen 
            name="NewCifra" 
            component={RegisterNewCifra}
            options={{
            tabBarLabel: 'New',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="plus" color={color} size={size} />
            )
            }}
        />
    </Tab.Navigator>
  )
}

  
export default Router