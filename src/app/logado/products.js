import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import api from '../../api/axiosConfig'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

export default function Products() {
 const [produtcts, setProducts] = useState([
  
 ]);

 const [refresh, setRefresh] = useState(false)

 useEffect(()=>{
  const getData = async ()=>{

    const dados = api.get("/produtos").then(
      (resp)=>{
        setProducts(resp.data.produtos)
        console.log(resp.data.produtos)
        setRefresh(false)
      }
    ).catch ((error)=>{
      console.log(error);
    } ) 
  }

  getData();

 },[refresh])

  return (
    <View style={styles.container}>
      <Text>Products</Text>
      <Button  title='listar' onPress={ ()=>{
        setRefresh(true)
      }}></Button>

      <Button  title='Novo' onPress={ ()=>{
        router.replace('/logado/newproduct');
      }}></Button>

      <StatusBar style="auto" />
      <ScrollView  style={styles.scroll}>
        {produtcts.map((produto, index) =>(
          <View key={produto.id} style={styles.itens}>
            <Text> Codigo:  {produto.barCode}</Text>
             <Text>Descrição: {produto.name}</Text>
             <Text>Preço: {produto.price}</Text>
        </View> ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itens:{
    padding:10,
    borderBottomColor:'#111',
    borderBottomWidth:2
  },
  scroll:{
    flexGrow:1,
    padding:0

  }

});
