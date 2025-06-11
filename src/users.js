import { View, StyleSheet, Text, TouchableOpacity} from 'react-native'

export function UsersList({data}){
    function handleDeleteItem() {

        console.log(data);
    }
    return(
        <View style={styles.container}>
            <Text style={styles.item}>Nome: {data.nome}</Text>
            <Text tyle={styles.item}>Idade: {data.idade}</Text>
            <Text tyle={styles.item}>Cargo: {data.cargo}</Text>
            <TouchableOpacity onPress={handleDeleteItem}>
                <Text>Deletar usuário</Text>
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
})