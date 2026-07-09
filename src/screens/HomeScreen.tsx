import {useNavigation} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { Header } from '../../components/ui/Header';

export default function HomeScreen() {
    const navigation = useNavigation();

    return (
        <>
            <Header title="Simple Store" />
            <View style={styles.container}>
                <Text>Open up Home.tsx to start working on your app!</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});