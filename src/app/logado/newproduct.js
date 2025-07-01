import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {useState} from 'react'
import api from '../../api/axiosConfig'
import { router } from 'expo-router';


export default function NewProduct() {

  const [name, setName] = useState("");
  const [barCode, setBarCode] = useState("");
  const [price, setPrice] = useState(0);
  const [tipoProdutoId, setTipoProdutoId] = useState(0);

  const saveData = async ()=>{

    const body = {
      name: name,
      barCode: barCode,
      price: price,
      tipoProdutoId: '1'
    }
    console.log(body);

    api.post("/produtos",body).then( (response)=>{
    // console.log(response);
     router.replace("/logado/products")
    }).catch((error)=>{
      console.log(error);
    });

  } 

  return (
    <View style={styles.container}>
      <Text>Novo Produto</Text>
      <Text>Descrição</Text>
      <TextInput placeholder='Descrição' onChangeText={ (e)=>{setName(e)} } 
      style={{  marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}> </TextInput>

      <Text>Codigo de Barras</Text>
      <TextInput placeholder='Codigo de Barras' onChangeText={ (e)=>{setBarCode(e)}} 
      style={{  marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}> </TextInput>

      <Text>Preço</Text>
      <TextInput placeholder='Preço' onChangeText={(text)=>{
        setPrice(text)
      }} 
      style={{  marginTop: 20, height: 40, borderColor: 'gray', borderWidth: 1, width: '80%', marginBottom: 20, paddingHorizontal: 10 }}> </TextInput>
      <Button title='Salvar' onPress={()=>{saveData()}}> </Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});
