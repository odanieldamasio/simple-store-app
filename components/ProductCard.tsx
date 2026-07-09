import { Image, StyleSheet, Text, View } from "react-native";

export function ProductCard() {
    return (
        <View style={styles.card}>
            <Image 
            source={{ uri: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png' }} 
            style={styles.image}
            resizeMode="cover"
            />
            <Text style={styles.title}>Product Title</Text>
            <Text style={styles.price}>$99.99</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginTop: 4,
    },
}); 