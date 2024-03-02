import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';

const TONALIDADES = ['1°', '2°m', '3°m', '4°', '5°', '6°°m', '7°'];
const TODOS_ACORDES = [
    ['C', 'C#m', 'Dm', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'Am', 'A#', 'B'],
    ['C#', 'Dm', 'D#m', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#m', 'B', 'C'],
    ['D', 'D#m', 'Em', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'Bm', 'C', 'C#'],
    ['D#', 'Em', 'Fm', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'Cm', 'C#', 'D'],
    ['E', 'Fm', 'F#m', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#m', 'D', 'D#'],
    ['F', 'F#m', 'Gm', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'Dm', 'D#', 'E'],
    ['F#', 'Gm', 'G#m', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#m', 'E', 'F'],
    ['G', 'G#m', 'Am', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'Em', 'F', 'F#'],
    ['G#', 'Am', 'A#m', 'B', 'C', 'C#', 'D', 'D#', 'E', 'Fm', 'F#', 'G'],
    ['A', 'A#m', 'Bm', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#m', 'G', 'G#'],
    ['A#', 'Bm', 'Cm', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'Gm', 'G#', 'A'],
    ['B', 'Cm', 'C#m', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#m', 'A', 'A#']
];

const Acordes = ({ onAcordeSelecionado }) => {
    const [graus, setGraus] = useState(TONALIDADES);
    const [acordes, setAcordes] = useState(mapearAcordes());

    function mapearAcordes() {
        const mapeamento = {};
        TONALIDADES.forEach((tonalidade, index) => {
            mapeamento[tonalidade] = TODOS_ACORDES[index];
        });
        return mapeamento;
    }

    const handleAcordePress = (acorde) => {
        onAcordeSelecionado(acorde);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                {graus.map((tonalidade, tonalidadeIndex) => (
                    <View key={tonalidadeIndex}>
                        <Text style={styles.tonalidade}>{tonalidade}</Text>
                        {acordes[tonalidade].map((acorde, acordeIndex) => (
                            <TouchableOpacity
                                key={acordeIndex}
                                onPress={() => handleAcordePress(acorde)}
                                style={styles.acordeButton}
                            >
                                <Text style={styles.acordeText}>{acorde}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    tonalidade: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    acordeButton: {
        height: 40,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 5,
    },
    acordeText: {
        fontSize: 16,
    },
});

export default Acordes;
