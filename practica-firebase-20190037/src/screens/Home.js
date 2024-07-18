import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { database, authentication } from '../config/firebase'; // Importa la configuración de la base de datos de Firebase
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'; // Importa funciones de Firestore para consultas en tiempo real
import CardProductos from '../components/CardProductos'; // Importa el componente de tarjeta de producto

const Home = ({ navigation }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const q = query(collection(database, 'productos'), orderBy('creado', 'desc'));
        
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ id: doc.id, ...doc.data() });
            });
            setProductos(docs);
        });

        return () => unsubscribe();
    }, []);

    const goToAdd = () => { 
        navigation.navigate('Add');
    }

    const handleLogout = async () => {
        try {
            await authentication.signOut();
            navigation.navigate('LogIn'); // Ajusta el nombre de la pantalla de inicio de sesión
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const renderItem = ({ item }) => (
        <CardProductos
            id={item.id}
            nombre={item.nombre}
            precio={item.precio}
            vendido={item.vendido}
            imagen={item.imagen}
        />
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Productos Disponibles</Text>

            {
                productos.length !== 0 ?
                <FlatList
                    data={productos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.list}
                />
                : 
                <Text style={styles.subtitle}>No hay productos disponibles</Text>
            }

            <TouchableOpacity
                style={styles.button}
                onPress={goToAdd}>
                <Text style={styles.buttonText}>Agregar Producto</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={handleLogout}>
                <Text style={styles.buttonText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#F0F0F0', // Color de fondo más claro
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#ff9800',
    },
    button: {
        backgroundColor: '#38A34C', // Color de botón verde
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        marginHorizontal: 50,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    list: {
        flexGrow: 1,
    },
});
