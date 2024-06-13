import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , TextInput, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Реєстрація</Text>
      <TextInput style={styles.inp} placeholder='Ім`я' />
      <TextInput style={styles.inp} placeholder='Прізвище' />
      <TextInput style={styles.inp} placeholder='Пароль'/>
      <TextInput style={styles.inp} placeholder='Повторіть пароль'/>
      <TextInput style={styles.inp} placeholder='Номер телефону'/>
      <Button variant="contained">Зареєструватись</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    gap: 20 ,
    justifyContent: 'center',
  },
  inp:{
    width:"60%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"6%",


  },
  butt:{
    width:"50%",
    borderRadius:10,
    borderBlockColor:"black",
    height:"6%",
  }
});
