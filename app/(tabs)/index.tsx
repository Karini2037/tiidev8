import { useEffect, useState } from 'react'; //importa o estado
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { db } from '@/src/firebaseConnection';
import { UsersList} from '@/src/users';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, setDoc } from 'firebase/firestore';


export default function App() {
  //const [nome, setNome] = useState("Carregando...")
  const [nome, setNome] = useState("")
  const [idade, setIdade] = useState("")
  const [cargo, setCargo] = useState("")
  const [users, setUsers] = useState([]); //colocar os valores nesta lista
  const [showForm, setShowForm] = useState(true)

  useEffect(() => {
    async function getDados() {
      // const docref = doc(db, "users", "UfZ26oFcSYl2kv5fakcq")
      // getDoc(docref)
      //   .then((snapshot) => {
      //     setNome(snapshot.data()?.nome)
      //   })
      //   .catch((err) => {
      //     console.log("error: ");
      //     console.log(err);
      //   })

      // onSnapshot(doc(db, "users", "1"), (doc) => {
      //   setNome(doc.data()?.nome)
      // })


      const usersRef = collection(db, "users"); //criando referencias.
      onSnapshot(usersRef, (snapshot) => {
        
        let lista: any = []; //pecorre todas a lista por meio de uma variável
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            idade: doc.data().idade,
            cargo: doc.data().cargo,
          })
        })
        setUsers(lista);
      })

      }
      //getDocs(usersRef)
       // .then((snapshot) => {
       // .catch((err)=>{
        //  console.log
       //})

    
    getDados();
  }, []) //importante para que a execução seja feita uma vez.
  
  async function handleRegister() {
    await addDoc(collection(db, "users"), {
      nome: nome,
      idade: idade,
      cargo: cargo,
    })
      .then(() => {
        console.log("CADASTRADO COM SUCESSO")
        setNome("") //depois de cadastrar irá limpar os campos.
        setIdade("")
        setCargo("")
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function handleToggle() { //função do esconder ou mostrar o formulário (fazer por ultimo ) 
    setShowForm(!showForm); //faz uma negação se tiver falso, fica verdadeiro, e vice-versa
  }

  // async function handleRegister() {
  //   await addDoc(collection(db,"users"), {
  //     nome:"Maria",
  //     idade: "15",
  //     cargo: "Estudante"
  //   })
  // }
  return (
    <View style={styles.container}>
      {showForm && ( //condicional enquanto o form for verdade, ele mostra o formulário, caso contrario esconde. (colocar essa condição por ultimo) 
        <View>
          <Text style={styles.label}>Nome:</Text>
          <TextInput //input
            style={styles.input}
            placeholder="Digite seu nome..."
            value={nome}
            onChangeText={(text) => setNome(text)}
          />

          <Text style={styles.label}>Idade:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua idade..."
            value={idade}
            onChangeText={(text) => setIdade(text)}
          />

          <Text style={styles.label}>Cargo:</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o seu cargo..."
            value={cargo}
            onChangeText={(text) => setCargo(text)}
          />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </TouchableOpacity>
        </View>
      )}
  //colocar fora da condicional
      <TouchableOpacity onPress={handleToggle} style={{ marginTop: 8 }}>
        <Text style={{ textAlign: "center", color: "#000" }}>
          {showForm ? "Esconder formulário" : "Mostrar formulário"} //função para fazer funcionar ou esconder o formulário (showForm) a condicional ele mostra o botão conforme o estado do botão.
        </Text>
      </TouchableOpacity>
      //Inserindo a lista do BD.
      <Text style = {{marginTop: 14, marginLeft: 8, fontSize: 20, color: "#000"}}>
        USUÁRIOS:
      </Text>
      <FlatList style={styles.list}
      data={users}
      keyExtractor={(item) => String(item.id) }
      renderItem={({ item }) => <UsersList data={item}/>}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  button: {
    backgroundColor: "#000",
    marginLeft: 8,
    marginRight: 8,
  },
  buttonText: {
    padding: 8,
    color: "#FFF",
    textAlign: 'center'
  },
  label: {
    color: "#000",
    fontSize: 18,
    marginBottom: 4,
    marginLeft: 8,
  },
  input: {
    borderWidth: 1,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
  },

  list: {
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
})