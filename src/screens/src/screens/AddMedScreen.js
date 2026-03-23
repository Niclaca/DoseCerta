import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMedScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [horario, setHorario] = useState('');

  // Função para salvar medicamento
  const salvarMedicamento = async () => {
    if (!nome || !horario) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }

    const novoMed = {
      id: Date.now().toString(),
      nome,
      horario,
      tomado: false
    };

    try {
      // Pegar os medicamentos atuais
      const dados = await AsyncStorage.getItem('medicamentos');
      const meds = dados ? JSON.parse(dados) : [];

      // Adicionar novo medicamento
      meds.push(novoMed);

      // Salvar de volta
      await AsyncStorage.setItem('medicamentos', JSON.stringify(meds));

      Alert.alert('Sucesso', 'Medicamento adicionado!');
      navigation.goBack(); // Volta para a HomeScreen
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível salvar o medicamento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Medicamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do medicamento"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Horário (ex: 08:00)"
        value={horario}
        onChangeText={setHorario}
      />

      <TouchableOpacity style={styles.botao} onPress={salvarMedicamento}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15
  },
  botao: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center'
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});