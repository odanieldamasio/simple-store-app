import {useNavigation} from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

export default function Home() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text>Open up Home.tsx to start working on your app!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    }
});