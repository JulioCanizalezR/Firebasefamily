import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import {
  TextInput,
  Button,
  PaperProvider,
  Card,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { authentication } from '../config/firebase'; // Ajusta el path según tu estructura de proyecto
import { signInWithEmailAndPassword } from "firebase/auth";

//Constante para manejar el alto de la pantalla
const windowHeight = Dimensions.get("window").height;

const LoginScreen = () => {
  //Constantes para el manejo de datos
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  //Constante de navegación entre pantallas
  const navigation = useNavigation();

  //Metodo para manejar el inicio de sesión de usuarios
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(authentication, correo, clave);
      const user = userCredential.user;
      console.log("User logged in: ", user);
      // Navegar a la pantalla principal o la que desees después del inicio de sesión
      navigation.navigate("Home"); // Ajusta "Home" a la pantalla a la que quieres navegar
    } catch (error) {
      console.error("Error logging in: ", error);
      setError("Error al iniciar sesión. Por favor, verifica tus credenciales.");
    }
  };

  // Limpiar campos al montar el componente
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setCorreo('');
      setClave('');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          {/* Agregar la imagen del logo encima del contenedor del formulario */}
          <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.title}>Alpha Store </Text>
          <Card style={styles.profileCard}>
            <Card.Content>
              <Text style={styles.title}>Inicio de sesión </Text>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Correo electrónico:</Text>
                  <View style={styles.rowContent}>
                    <AntDesign name="mail" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={correo}
                      onChangeText={setCorreo}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
              </View>
              <View style={styles.inputContainer}>
                <View style={styles.infoRow}>
                  <Text style={styles.label}>Clave del cliente:</Text>
                  <View style={styles.rowContent}>
                    <Entypo name="lock" size={24} />
                    <TextInput
                      style={styles.infoText}
                      value={clave}
                      onChangeText={setClave}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
              {error ? <Text style={styles.errorText}>{error}</Text> : null}
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleLogin}
              >
                Iniciar Sesión
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
              >
                <Text style={styles.loginText}>
                  ¿No tienes cuenta? Registrate aquí
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: windowHeight * 0.15,
    paddingTop: 50,
  },
  logo: {
    width: 150, // Ajusta el ancho según sea necesario
    height: 150, // Ajusta la altura según sea necesario
    resizeMode: 'contain', // Ajusta la forma en que la imagen se ajusta a su contenedor
    marginBottom: 20, // Espacio opcional después de la imagen
    borderRadius: 100,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
  },
  profileCard: {
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#B7DABE",
    paddingTop: 20,
    paddingBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "gray",
    marginBottom: 5,
  },
  infoRow: {
    padding: 12,
    margin: 2,
    borderRadius: 10,
    backgroundColor: "white",
    width: "100%",
    elevation: 2,
  },
  rowContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    backgroundColor: "transparent",
    height: 40,
    borderWidth: 0,
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    flex: 1,
  },
  fila: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#38A34C",
  },
  loginText: {
    marginTop: 20,
    color: "black",
  },
  avatarContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
});
