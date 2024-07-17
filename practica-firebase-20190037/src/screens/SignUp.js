import React, { useState, useEffect } from "react";
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
import { createUserWithEmailAndPassword } from "firebase/auth";

const windowHeight = Dimensions.get("window").height;

const SignUp = () => {
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const navigation = useNavigation();

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(authentication, correo, clave);
      const user = userCredential.user;
      console.log("User registered: ", user);
      navigation.navigate("Home");
    } catch (error) {
      if (error.code === 'auth/network-request-failed') {
        alert("Error de red. Por favor, verifica tu conexión a Internet.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

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
          <Image source={require('../../assets/logo.jpg')} style={styles.logo} />
          <Text style={styles.title}>Alpha Store</Text>
          <Card style={styles.profileCard}>
            <Card.Content>
              <Text style={styles.title}>Registrarse</Text>
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
                      mode="outlined"
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
                      mode="outlined"
                    />
                  </View>
                </View>
              </View>
              <Button
                style={styles.button}
                mode="contained"
                onPress={handleRegister}
              >
                Registrarse
              </Button>
              <TouchableOpacity
                onPress={() => navigation.navigate("LogIn")}
              >
                <Text style={styles.loginText}>
                  ¿Ya tienes cuenta? Inicia sesión aquí
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignUp;

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
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
    borderRadius: 100,
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
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
  button: {
    width: "100%",
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#38A34C",
  },
  loginText: {
    marginTop: 20,
    color: "black",
    textAlign: 'center',
  },
});