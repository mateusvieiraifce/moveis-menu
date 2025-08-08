import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import api from '../../api/axiosConfig';
import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

export default function TypeProducts() {
  const [typeProducts, setTypeProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { refreshKey } = useLocalSearchParams();

  useEffect(() => {
    const fetchTypeProducts = async () => {
      try {
        const resp = await api.get('/tipoproduto');
        setTypeProducts(resp.data.tipos || []);
        setRefresh(false);
      } catch (error) {
        console.log('Erro ao buscar tipo de produto:', error);
      }
    };

    fetchTypeProducts();
  }, [refresh, refreshKey]);

  const handleLongPress = (id) => {
    Alert.alert(
      'Confirmar ação',
      'Tem certeza que deseja excluir este tipo de produto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          onPress: () => deleteTypeProduct(id), 
          style: 'destructive' 
        },
      ],
      { cancelable: true }
    );
  };

  const deleteTypeProduct = async (id) => {
    try {
      await api.delete(`/tipoproduto/delete/${id}`);
      setRefresh(true); // força atualização local da lista
    } catch (error) {
      console.log('Erro ao excluir tipo de produto:', error);
    }
  };

  const handleItemPress = (id) => {
    router.replace({
      pathname: '/logado/edittypeproduct',
      params: { typeProductId: id, refreshKey: Date.now().toString() },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tipos de Produto</Text>

      <Button title="Listar" onPress={() => setRefresh(true)} />
      <Button title="Novo" onPress={() => router.push('/logado/newtypeproduct')} />

      <StatusBar style="auto" />
      <ScrollView style={styles.scroll}>
        {typeProducts.map((tipo) => (
          <TouchableOpacity
            key={tipo.id}
            style={styles.itens}
            onPress={() => handleItemPress(tipo.id)}
            onLongPress={() => handleLongPress(tipo.id)}
          >
            <Text>Descrição: {tipo.descricao}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  itens: {
    padding: 10,
    borderBottomColor: '#111',
    borderBottomWidth: 2,
  },
  scroll: {
    flexGrow: 1,
    padding: 0,
  },
});
