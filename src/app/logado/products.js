import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import api from '../../api/axiosConfig'
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';


export default function Products() {
  const {  refreshKey } = useLocalSearchParams();

 const [produtcts, setProducts] = useState([
  
 ]);

 const [refresh, setRefresh] = useState(false)

  const handleItemPress =  (itemId) => {

     router.replace({
      pathname: '/logado/editproduct',
      params: { productId: itemId, refreshKey: Date.now() }, // Parâmetro enviado
    });
    console.log('Item pressionado:', itemId);
    // Navegação ou ação desejada
  };
  

  const handleLongPress = (itemId) => {
    Alert.alert(
      "Confirmar ação", // Título do Alert
      "Tem certeza que deseja excluir este item?", // Mensagem
      [
        {
          text: "Cancelar", // Botão de cancelar
          style: "cancel", // Estilo do botão (opcional)
        },
        {
          text: "Excluir", // Botão de confirmação
          onPress: () => deletaProduto(itemId), // Ação ao confirmar
          style: "destructive", // Estilo para ações destrutivas (iOS)
        },
      ],
      { cancelable: true } // Permite fechar o Alert clicando fora (Android)
    );
  };


  const deletaProduto = (id) => {
    api.delete(`/produtos/delete/${id}`).then((response)=>{
      console.log(response);
      setRefresh(true);
    }).catch((error)=>{
      console.log(error);
    });
  }

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

 },[refresh,refreshKey])

  return (
    <View style={styles.container}>
      <Text>Products</Text>
     
     
      <StatusBar style="auto" />
      <ScrollView  style={styles.scroll}>
        {produtcts.map((produto, index) =>(
          <TouchableOpacity key={produto.id} style={styles.itens}
          onPress={() => handleItemPress(produto.id)}
          onLongPress={() => handleLongPress(produto.id)}
          >
            <Text> Codigo:  {produto.barCode}</Text>
             <Text>Descrição: {produto.name}</Text>
             <Text>Preço: {produto.price}</Text>

        </TouchableOpacity> ))}
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
