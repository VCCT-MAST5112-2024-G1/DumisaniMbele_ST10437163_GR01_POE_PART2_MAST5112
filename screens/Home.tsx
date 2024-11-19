import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParams';
import { useRoute } from '@react-navigation/native';
import { Image } from 'react-native';

type homeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {

    const route = useRoute<HomeScreenRouteProp>();

    
    const dishes = route.params?.dishes || [];


    const navigation = useNavigation<homeScreenProp>();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Christoffels Culinary</Text>

            <View style={styles.logo}>
                <Image style={styles.ImageSize}
                source={require('../img/food_logo.png')} />
            </View>

        <Text style={styles.dishCount}>Total Dishes: {dishes.length}</Text>

        <FlatList
            data={dishes}
            keyExtractor={(item, index) => `${item.Price}-${index}`}
            renderItem={({ item }) => (
            <View style={styles.dishDetails}>
                <Text>Dish Title: {item.Title}</Text>
                <Text>Dish Description: {item.Description}</Text>
                <Text>Course: {item.Course}</Text>
                <Text>Dish Price(R): {item.Price}</Text>
            </View>
            )}
        />

            <Button
                title="Add Dish"
                onPress={() => navigation.navigate('AddDish')}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#ffc7b5', alignItems: 'center' },
    title: { fontSize: 24, marginBottom: 16, color: '#76280f' },
    dishCount: { fontSize: 18, marginBottom: 16, color: 'red' }, 
    dishDetails: { marginBottom: 24 },
    logo:{ paddingTop: 10, justifyContent: 'center', alignItems: 'center'},
    ImageSize:{ width: 200, height: 200},
});


