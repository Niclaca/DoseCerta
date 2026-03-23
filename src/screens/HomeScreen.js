import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [medicamentos, setMedicamentos] = useState([]);

  // Carregar medicamentos do AsyncStorage
  useEffect(() => {
    const carregarMedicamentos = async () => {
      try {
        const dados = await AsyncStorage.getItem('medicamentos');
        if (dados) {
          setMedicamentos(JSON.parse(dados)); // Carrega medicamentos
        }
      } catch (error) {
        console.error('Erro ao carregar medicamentos', error);
      }
    };

    carregarMedicamentos(); // Chama a função para carregar os medicamentos
  }, []);

  // Salvar medicamentos no AsyncStorage
  const salvarMedicamentos = async (novosMedicamentos) => {
    try {
      await AsyncStorage.setItem('medicamentos', JSON.stringify(novosMedicamentos));
    } catch (error) {
      console.error('Erro ao salvar medicamentos', error);
    }
  };

  // Marcar medicamento como tomado
  function marcarComoTomado(id) {
    const novaLista = medicamentos.map(item =>
      item.id === id ? { ...item, tomado: true } : item
    );
    setMedicamentos(novaLista); // Atualiza o estado com a nova lista
    salvarMedicamentos(novaLista); // Salva a lista atualizada no AsyncStorage
  }

  // Renderizar cada item
  function renderItem({ item }) {
    return (
      <View style={[styles.card, item.tomado && styles.cardTomado]}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.horario}>Horário: {item.horario}</Text>

        {!item.tomado && (
          <TouchableOpacity
            style={styles.botao}
            onPress={() => marcarComoTomado(item.id)}
          >
            <Text style={styles.botaoTexto}>Marcar como tomado</Text>
          </TouchableOpacity>
        )}

        {item.tomado && (
          <Text style={styles.tomado}>✔ Já tomado</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Medicamentos</Text>

      <FlatList
        data={medicamentos}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('Adicionar')}
      >
        <Text style={styles.botaoAdicionarTexto}>+ Adicionar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  card: { backgroundColor: '#f2f2f2', padding: 15, borderRadius: 10, marginBottom: 10 },
  cardTomado: { backgroundColor: '#d4edda' },
  nome: { fontSize: 18, fontWeight: 'bold' },
  horario: { marginTop: 5 },
  botao: { marginTop: 10, backgroundColor: '#007bff', padding: 10, borderRadius: 8 },
  botaoTexto: { color: '#fff', textAlign: 'center' },
  tomado: { marginTop: 10, color: 'green', fontWeight: 'bold' },
  botaoAdicionar: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  botaoAdicionarTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});