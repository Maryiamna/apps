import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image } from 'react-native'; //safeareaview evita da tela ficar atrás da câmera
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react'; //monitorar o app


export default function App() {

  const [foto, setFoto] = useState(null);

  function openAlbum(){
    const options = {
      mediaType:'photo',
      quality: 1,
      SelectionLimit: 1
    }

    launchImageLibrary(options, (response) => {

      if(response.didCancel){
        console.log('IMAGE PICKER CANCELADO')
        return;
      } else if(response.error){
        console.log('GEROU ERRO', response.errorMessage)
        return;
      }

      console.log(response.assets)
      setFoto(response.assets[0].uri)
    })
  }

  async function openCamera(){
    const options = {
      mediaType: 'photo',
      quality: 1,
      saveTofotos: true,
    }

    const response = await launchCamera(options)
  }

  return (
     <SafeAreaView style={estilos.container}>
      <View style={estilos.botoes}>
        <TouchableOpacity style={estilos.botaoAlbum}>
          <Text style={estilos.texto}> Abrir Álbum</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.botaoCam}>
          <Text style={estilos.texto}> Abrir Câmera</Text>
        </TouchableOpacity>
      </View>

      {foto !== null && (
      <Image style={estilos.foto} source={{uri:foto}}></Image>
      )}
     </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems:'center'
  },
  botoes: {
    marginTop:144,
    flexDirection:'row',
    gap:20
  },
  botaoAlbum: {
    backgroundColor:'#7bb4e3',
    padding:4,
    paddingHorizontal:15,
    borderRadius:4
  },
  botaoCam: {
    backgroundColor:'#ff7000',
    padding:4,
    paddingHorizontal:15,
    borderRadius:4
  },
  texto: {
    color: '#fff',
    fontWeight:'bold'
  },
  foto: {
    width:'90%',
    height:300,
    borderWidth:1,
    borderColor:'#bbd2ec',
    marginTop:15
  }
});
