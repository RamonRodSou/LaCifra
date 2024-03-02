import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

const sections = ['Intro', 'Verso', 'Refrão', 'Ponte'];
const Tom = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
const TODOS_ACORDES = [
  ['1', '2', '3', '4', '5', '6', '7'],
  ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B°'],
  ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#°'],
  ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#°'],
  ['F', 'Gm', 'Am', 'B', 'C', 'Dm', 'E°'],
  ['G', 'Am', 'B', 'C', 'D', 'Em', 'F#°'],
  ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#°'],
  ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#°']
];

const NewCifra = () => {
  const [name, setName] = useState('');
  const [selectedTonality, setSelectedTonality] = useState('');
  const [selectedSection, setSelectedSection] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const initialAcordes = {
    Intro: [''],
    Verso: [''],
    Refrão: [''],
    Ponte: [''],
  }

  const [acordes, setAcordes] = useState(initialAcordes);

  const handleChangeAcorde = (section, index, text) => {

      if (/^[1-7./]*$/.test(text)) {
        setAcordes(prevAcordes => {
          return {
            ...prevAcordes,
            [section]: prevAcordes[section].map((item, i) => {
              if (i === index) return text;
              return item;
            })
          };
        });
      }
    };
  

  const handleAddField = (section) => {
    const newAcordes = { ...acordes };
    newAcordes[section].push('');
    setAcordes(newAcordes);
  };
  const handleRemoveField = (section) => {
    const newAcordes = { ...acordes };
    newAcordes[section].pop();
    setAcordes(newAcordes);
  };

  const selectTom = (item) => {
    setSelectedTonality(item);
    setModalVisible(false); 
  };

  const handleSubmit = () => {
    console.log(name, selectedTonality, acordes);
    setAcordes(initialAcordes);
  };
  return (
    <View style={styles.container}>
      <View style={styles.containerInputs}>
        <Text style={styles.text}>Nome da Música</Text>
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Digite o nome da música"
          value={name}
          onChangeText={(text) => setName(text)}
        />
      </View>
      <View style={styles.containerInputs}>
        <View style={styles.tonalityContainer}>
          <Text style={styles.text}>Tom</Text>
          <TouchableOpacity style={styles.chooseTom} onPress={() => setModalVisible(true)}>
            {!selectedTonality ? (
              <>
                <Text style={{ color: '#000', marginHorizontal: 6 }}>Clique para escolher...</Text>
                <Feather name="chevron-down" size={20} color="#2a2a2a" />
              </>
            ) : (
              <Text style={{ color: '#000', marginHorizontal: 6 }}>{selectedTonality}</Text>
            )}
          </TouchableOpacity>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalContainer}>

              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
              <View style={styles.optionContainer}>

                <FlatList
                  data={Tom}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.optionButton}
                      onPress={() => selectTom(item)} >
                      <Text style={styles.optionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item}
                />
              </View>

            </View>
          </Modal>
        </View>
      </View>
      <ScrollView>
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex}>
            <Text style={styles.sectionTitle}>{section}</Text>
            <View>
              <View style={styles.acordesContainer}>
                {acordes[section].map((acorde, index) => (
                  <TextInput
                    key={index}
                    value={acorde}
                    maxLength={4}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeAcorde(section, index, text)}
                    style={[styles.acordeInput, { textAlign: 'center', color:'#e15d31', fontSize: 18 }]}
                  />
                ))}
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddField(section)}
                >
                  <Text style={styles.buttonText}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemoveField(section)}
                  disabled={acordes[section].length === 1}
                >
                  <Text style={[styles.buttonText, { color: acordes[section].length === 1 ? '#999' : '#fff' }]}>Remover</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </ScrollView>

    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  containerInputs: {
    marginBottom: 20,
  },
  text: {
    color: '#3498db',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  chooseTom: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingVertical: 8,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'space-between',
  },
  modalContainer: {

    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex:1,
  },
  optionContainer:{
    alignItems: 'flex-start',
    width:100,
    marginBottom:100,
    marginLeft:20,
  },

  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#ee0000'

  },
  closeButtonText: {
    fontSize: 18,
    color: '#000',
  },
  optionButton: {

    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: .3,
    bordermColor: '#ffee00',
    width: '100%',
    backgroundColor: '#fff',
  },
  optionText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#3498db',
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  tonalityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  tonalityButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedTonalityButton: {
    backgroundColor: '#2980b9',
  },
  tonalityButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  acordesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  acordeInput: {
    height: 40,
    width: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,

  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#3498db',

  },
  
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default NewCifra;
