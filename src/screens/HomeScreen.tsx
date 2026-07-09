import {useNavigation} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/ui/Header';
import { ProductCard } from '../../components/ProductCard';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Header title="Simple Store" />
            <ProductCard />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        // justifyContent: 'center',
        // flex: 1,
    }
});