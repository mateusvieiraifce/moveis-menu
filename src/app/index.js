import { Link,router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, Button } from 'react-native';
import logo from '../../assets/logo.png'; // Adjust the path as necessary
import { useState } from 'react';
import api from '../api/axiosConfig'
import { saveData } from '../api/StorageService';

export default function App() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword]= useState('');

  const handleLogin = async ()  =>{

    const body = {
      user:username,
      password:password
    
    }

    try {
    const req = await api.post('/login',body);
      if(req.status === 200){
         saveData("authToken",req.data.token);
         console.log(req.data.token);
         router.replace('/logado'); 
      }
    
    }catch(error){
     
     
      if (error.response && error.response.status==404){
        alert("Usuario inválido")
      }
      if (error.response && error.response.status==401){
        alert("Senha  invalido")
      }

    }

  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text>SYSPDV</Text>
      <TextInput
        style={{  marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Usuário"  onChangeText={ (text)=>{ setUsername(text) } } ></TextInput>

        <TextInput
        style={{  height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}
        placeholder="Senha" secureTextEntry onChangeText={ (text)=>{ setPassword(text) } } ></TextInput>

        <Button
        title="Entrar" onPress={handleLogin}></Button>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
