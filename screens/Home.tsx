import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Dish } from './RootStackParams';
import { useRoute } from '@react-navigation/native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const route = useRoute<HomeScreenRouteProp>();
    const navigation = useNavigation<homeScreenProp>();

    // Organize dishes by courses
    const [dishes, setDishes] = useState<Dish[]>(route.params?.dishes || []);

    const starters = dishes.filter(dish => dish.Course === 'Starter');
    const mains = dishes.filter(dish => dish.Course === 'Main');
    const desserts = dishes.filter(dish => dish.Course === 'Dessert');

    const averagePrice = (items: Dish[]) =>
        items.length ? (items.reduce((sum, dish) => sum + dish.Price, 0) / items.length).toFixed(2) : '0.00';

    useEffect(() => {
        const newDish = route.params?.newDish;
        if (newDish) {
            setDishes(prevDishes => [...prevDishes, newDish]);
        }
    }, [route.params?.newDish]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Christoffels Culinary</Text>

            <View style={styles.logo}>
                <Image style={styles.ImageSize} source={require('../img/food_logo.png')} />
            </View>

            <Text style={styles.dishCount}>Total Dishes: {dishes.length}</Text>
            <Text style={styles.aveDish}>Average Price: R {averagePrice(dishes)}</Text>

            <Text style={styles.courseAve}>Starter: {starters.length} (Average Price: R {averagePrice(starters)})</Text>
            <Text style={styles.courseAve}>Main: {mains.length} (Average Price: R {averagePrice(mains)})</Text>
            <Text style={styles.courseAve}>Dessert: {desserts.length} (Average Price: R {averagePrice(desserts)})</Text>

            <FlatList
                data={dishes}
                keyExtractor={(item, index) => `${item.Title}-${index}`}
                renderItem={({ item }) => (
                    <View style={styles.dishDetails}>
                        <Text>Dish Title: {item.Title}</Text>
                        <Text>Dish Description: {item.Description}</Text>
                        <Text>Course: {item.Course}</Text>
                        <Text>Dish Price (R): {item.Price}</Text>
                    </View>
                )}
            />

            <Button
                title="Add Dish"
                onPress={() => navigation.navigate('AddDish', { dishes, setDishes })}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#ffc7b5', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 16, color: '#76280f' },
    dishCount: { fontSize: 18, marginBottom: 16, color: 'red' },
    dishDetails: { marginBottom: 24 },
    aveDish: { fontSize: 18, fontWeight: 'bold', color: '#2f9220', marginBottom: 16 },
    courseAve: { fontSize: 18, color: '#2f9220', marginBottom: 10 },
    logo: { paddingTop: 10, justifyContent: 'center', alignItems: 'center' },
    ImageSize: { width: 200, height: 200 },
});
