import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import {use, useEffect, useState} from 'react'
import api from '../../api/axiosConfig'
import { router, useLocalSearchParams } from 'expo-router';


export default function NewProduct() {

  const [name, setName] = useState("");
  const [barCode, setBarCode] = useState("");
  const [price, setPrice] = useState(0);
  const [tipoProdutoId, setTipoProdutoId] = useState(0);
  const { productId, refreshKey } = useLocalSearchParams();
  const [id, setId] = useState(0);
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Passando aqui "+refreshKey); 
    console.log(productId);
    const produtct = api.get(`/produtos/${productId}`).then((response)=>{
      console.log(response.data);
      setName(response.data.produtct.name);
      setBarCode(response.data.produtct.barCode);
      setPrice(response.data.produtct.price);
      setTipoProdutoId(response.data.tipoProdutoId);
      setId(response.data.produtct.id);
      console.log("Dados do produto carregados:", response.data.produtct);
    }).catch((error)=>{
      console.log("nao achou rrota", error);
    });
    
  }, [params.refreshKey]); 

  

  const saveData = async ()=>{

    const body = {
      name: name,
      barCode: barCode,
      price: price,
      tipoProdutoId: '1'
    }
    console.log(body);

    api.put("/produtos/"+productId,body).then( (response)=>{
     

      router.replace({
      pathname: '/logado/products',
      params: {  refreshKey: Date.now() }, // Parâmetro enviado
    });


    }).catch((error)=>{
      console.log(error);
    });

  } 

  return (
    <View style={styles.container}>
      <Text>Editando {name}</Text>
      <Text>Descrição</Text>

     

     <TextInput placeholder='Descrição' onChangeText={setName}  value={name} 
     style={styles.text}/>
      
      <Text>Codigo de Barras</Text>

      <TextInput placeholder='Codigo de Barras' onChangeText={setBarCode}  value={barCode} 
     style={styles.text}/>

     

      <Text>Preço</Text>
      <TextInput placeholder='Preço' onChangeText={setPrice}  value={price.toString()} 
     style={styles.text}/>

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
  text: {
    borderWidth:1, borderColor: 'gray', height:40, width:'80%',
    margin:10
  },
});
