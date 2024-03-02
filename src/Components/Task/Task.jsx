import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import TaskItens from './TaskItens';

const Task = () => {
  const [cifras, setCifras] = useState([
    { id: 1, MusicName: 'A Alegria do Senhor', MusicTom: 'D' },
    { id: 2, MusicName: 'Avivanos', MusicTom: 'C' },
    { id: 3, MusicName: 'Enche-me', MusicTom: 'B' },
    
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          data={cifras}
          renderItem={({ item }) => (
            <TaskItens MusicName={item.MusicName} MusicTom={item.MusicTom} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
});

export default Task;
