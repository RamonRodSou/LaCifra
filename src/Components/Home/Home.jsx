import React from 'react'
import { StyleSheet, View } from 'react-native'
import Task from '../Task/Task';


const Home = () => {
  return (
    <View style={styles.container}>
        <Task/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: '#060c13',
    },
    button: {
      borderRadius:50
    },
  });
  

export default Home