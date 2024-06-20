import { useState } from 'react';
import {
  StyleSheet, Text, View, StatusBar, TextInput, Platform, Pressable, ScrollView,
  ActivityIndicator, Alert, Keyboard
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

const statusBarHeight = StatusBar.currentHeight;
const KEY_GPT = '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';

export default function App() {

  const [genero, setGenero] = useState("");
  const [idade, setIdade] = useState("");
  const [qtd, setQtd] = useState(3);
  const [loading, setLoading] = useState(false);
  const [travel, setTravel] = useState("")

  // Função para lidar com a mudança na entrada de idade
  const handleIdadeChange = (text) => {
    // Permite apenas números e remove caracteres não numéricos
    const newIdade = text.replace(/[^0-9]/g, ''); 
    setIdade(newIdade);
  };

  async function handleGenerate() {
    if (genero === "") {
      Alert.alert("Atenção", "Preencha o gênero de mangá!")
      return;
    }

    setTravel("")
    setLoading(true);
    Keyboard.dismiss();

    const prompt = `Crie uma lista com exatos ${qtd.toFixed(0)} mangás japoneses com gênero de ${genero} com a classificação indicativa exata de ${idade} anos, coloque a quantidade de volumes que cada mangá possui, e um resumo sobre o enredo da obra.`

    fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${KEY_GPT}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.20,
        max_tokens: 500,
        top_p: 1,
      })
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data.choices[0].message.content);
        setTravel(data.choices[0].message.content)
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      })

  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent={true} backgroundColor="#F1F1F1" />
      <Text style={styles.heading}>Recomendo Mangá</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Gênero</Text>
        <TextInput
          placeholder="Ex: ação"
          placeholderTextColor='#909090'
          style={styles.input}
          value={genero}
          onChangeText={(text) => setGenero(text)}
        />

        <Text style={styles.label}>Faixa etária</Text>
        <TextInput 
          placeholder='Ex: 16'
          placeholderTextColor="#909090"
          style={styles.input}
          value={idade}
          onChangeText={handleIdadeChange} // Adiciona a função para lidar com a mudança
          keyboardType="numeric" // Define o teclado numérico
        />

        <Text style={styles.label}>Quantidade de opções: <Text style={styles.qtd}> {qtd.toFixed(0)} </Text> mangás</Text>
        <Slider
          minimumValue={1}
          maximumValue={10}
          minimumTrackTintColor="#009688"
          maximumTrackTintColor="#000000"
          value={qtd}
          onValueChange={(value) => setQtd(value)}
        />
      </View>

      <Pressable style={styles.button} onPress={handleGenerate}>
        <Text style={styles.buttonText}>Gerar recomendação</Text>
        <MaterialIcons name="menu-book" size={24} color="#FFF" />
      </Pressable>

      <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
        {loading && (
          <View style={styles.content}>
            <Text style={styles.title}>Carregando opções...</Text>
            <ActivityIndicator color="#000" size="large" />
          </View>
        )}

        {travel && (
          <View style={styles.content}>
            <Text style={styles.title}>Recomendação 👇</Text>
            <Text style={{ lineHeight: 24, }}>{travel}</Text>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    paddingTop: 20,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 54
  },
  form: {
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#94a3b8',
    padding: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  qtd: {
    backgroundColor: '#F1f1f1'
  },
  button: {
    backgroundColor: '#FF5656',
    width: '90%',
    borderRadius: 8,
    flexDirection: 'row',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold'
  },
  content: {
    backgroundColor: '#FFF',
    padding: 16,
    width: '100%',
    marginTop: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 14
  },
  containerScroll: {
    width: '90%',
    marginTop: 8,
  }
});