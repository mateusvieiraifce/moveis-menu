import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import api from '../../api/axiosConfig';
import { router, useLocalSearchParams } from 'expo-router';

export default function EditTypeProduct() {
  const params = useLocalSearchParams();
  const { typeProductId, refreshKey } = params;

  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (!typeProductId) return;

    console.log('Carregando tipo de produto, refreshKey:', refreshKey);
    console.log('ID recebido:', typeProductId);

    api.get(`/tipoproduto/${typeProductId}`)
      .then((response) => {
        console.log('Dados recebidos:', response.data);
        setDescricao(response.data.tipoProduto.descricao);
      })
      .catch((error) => {
        console.log('Erro ao buscar tipo de produto:', error);
      });
  }, [params.refreshKey, typeProductId]);

  const saveData = async () => {
    const body = { descricao };
    console.log('Enviando dados:', body);

    try {
      await api.put(`/tipoproduto/${typeProductId}`, body);
      router.replace({
        pathname: '/logado/typeproduct',
        params: { refreshKey: Date.now() },
      });
    } catch (error) {
      console.log('Erro ao atualizar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Editando Tipo de Produto</Text>

      <Text>Descrição</Text>
      <TextInput
        placeholder="Descrição"
        onChangeText={setDescricao}
        value={descricao}
        style={styles.text}
      />

      <Button title="Salvar" onPress={saveData} />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20,
  },
  text: {
    borderWidth: 1,
    borderColor: 'gray',
    height: 40,
    width: '80%',
    margin: 10,
    paddingHorizontal: 8,
  },
});
