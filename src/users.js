import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import { db } from './firebaseConnection'
import { deleteDoc, doc } from 'firebase/firestore';

export function UsersList({data}){
    async function handleDeleteItem(){
        const docRef = doc(db, "users", data.id)
        await deleteDoc(docRef)
        console.log(data);
   
        
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item}>Nome: {data.nome}</Text>
            <Text tyle={styles.item}>Idade: {data.idade}</Text>
            <Text tyle={styles.item}>Cargo: {data.cargo}</Text>
            <TouchableOpacity  style={styles.button} onPress={handleDeleteItem}>
                <Text style={styles.buttonText}>Deletar usuário</Text>
            </TouchableOpacity>
        </View>
    )
}


//customizando

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f0A8f0",
        padding: 8,
        borderRadius: 4,
        marginBottom: 14,
    },

    item: {
        color: "#000",
        fontSize: 16,
    },

button: {
backgroundColor: "#B3261E",
alignSelf: "flex-start",
padding: 4,
borderRadius: 4,
marginTop: 16
},

buttonText: {
    color: "#FFF",
    paddingLeft: 8,
    paddingRight: 8,
}

})