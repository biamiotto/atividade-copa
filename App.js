import { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, Button, Alert } from 'react-native';

export default function App() {
    const [selecoes, setSelecoes] = useState([]);

    useEffect(() => {
        fetch('https://github.com/biamiotto/atividade-copa.git')
            .then((response) => response.json())
            .then((data) => {
                setSelecoes(data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>🏆 Dashboard Copa 2026</Text>

            <FlatList
                data={selecoes}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.bandeira }} style={styles.bandeira} />

                        <Text style={styles.grupo}>Grupo {item.grupo}</Text>

                        <Text style={styles.nome}>{item.selecao}</Text>

                        <Button
                            title="Apostar"
                            onPress={() =>
                                Alert.alert('Aposta realizada!', `Você apostou no ${item.selecao}!`)
                            }
                        />
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f8ff',
        paddingTop: 50,
        paddingHorizontal: 10,
    },

    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#003366',
    },

    card: {
        flex: 1,
        backgroundColor: '#ffffff',
        margin: 8,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    bandeira: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
        marginBottom: 10,
    },

    grupo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },

    nome: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
});
