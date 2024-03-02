import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'


const TaskItens = (props) => {
  return (
    
    <TouchableOpacity>
        <View style={styles.container}>
            <Text style={styles.title}>{props.MusicName}</Text>
            <Text style={styles.title}>Tom: {props.MusicTom}</Text>
        </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      padding:10,
      backgroundColor:'#0a151f',
      justifyContent:'space-between',
      borderTopColor:'#4f6378',
      borderWidth:1
    },
    title: {
      color:'#ced2d6',
      fontSize:17
    },

  });

export default TaskItens