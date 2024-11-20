import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Dish, RootStackParamList } from './RootStackParams';

type AddDishRouteProp = RouteProp<RootStackParamList, 'AddDish'>;

const AddDishScreen = () => {
    const route = useRoute<AddDishRouteProp>();
    const { dishes, setDishes } = route.params;

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Course, setCourse] = useState('');
    const [Price, setPrice] = useState<number | string>('');  // Handle as string initially for numeric input

    const handleAddDish = () => {
        if (!Title || !Description || !Course || !Price) {
            alert('Please fill all the fields');
            return;
        }

        const newDish = { Title, Description, Course, Price: Number(Price) };
        setDishes((prevDishes) => [...prevDishes, newDish]);

        // Clear form fields
        setTitle('');
        setDescription('');
        setCourse('');
        setPrice('');
        alert('Dish added successfully!');
    };

    const handleRemoveDish = (index: number) => {
        // Remove dish at the specified index
        setDishes((prevDishes) => prevDishes.filter((_, i) => i !== index));
    };

    const renderDishes = () => {
        return dishes.map((dish, i) => (
            <View key={i} style={styles.inputContainer}>
                <Text style={styles.dishText}>
                    {dish.Title} - {dish.Description} - {dish.Course} - R {dish.Price}
                </Text>
                <TouchableOpacity onPress={() => handleRemoveDish(i)} style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Remove</Text>
                </TouchableOpacity>
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            {/* Add Dish Form */}
            <Text style={styles.title}>Add a New Dish</Text>
            <Text style={styles.label}>Dish Title:</Text>
            <TextInput
                placeholder="Title"
                onChangeText={(newText) => setTitle(newText)}
                style={styles.input}
                value={Title}
            />

            <Text style={styles.label}>Dish Description:</Text>
            <TextInput
                placeholder="Description"
                onChangeText={(newText) => setDescription(newText)}
                style={styles.input}
                value={Description}
            />

            <Text style={styles.label}>Dish Price (R):</Text>
            <TextInput
                placeholder="Price"
                keyboardType="numeric"
                onChangeText={(newText) => {
                    const value = newText === '' ? '' : parseFloat(newText);
                    setPrice(value);
                }}
                style={styles.input}
                value={Price === '' ? '' : Price.toString()}  // Display as string when Price is empty
            />

            <Text style={styles.label}>Course:</Text>
            <Picker
                selectedValue={Course}
                onValueChange={(value) => setCourse(value)}
                style={styles.picker}
            >
                <Picker.Item label="Select a course" value="" />
                <Picker.Item label="Starter" value="Starter" />
                <Picker.Item label="Main" value="Main" />
                <Picker.Item label="Dessert" value="Dessert" />
            </Picker>

            <Button title="Add Dish" onPress={handleAddDish} />

            {/* Displaying and Removing Dishes */}
            <Text style={styles.subtitle}>Current Menu</Text>
            {renderDishes()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#ffc7b5' },
    title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
    input: { borderWidth: 1, padding: 8, marginBottom: 12 },
    label: { fontSize: 16, marginBottom: 8, fontWeight: 'bold' },
    picker: { height: 50, width: 200, marginBottom: 16 },
    subtitle: { fontSize: 18, fontWeight: 'bold', marginTop: 24, marginBottom: 16 },
    dishDetails: { padding: 10, backgroundColor: '#f7d9d5', marginVertical: 8 },
    dishText: { fontSize: 14, color: '#333' },
    inputContainer: { marginBottom: 16, padding: 10, backgroundColor: '#f7d9d5', flexDirection: 'row', alignItems: 'center' },
    deleteButton: { marginLeft: 10, padding: 8, backgroundColor: '#ff3333', borderRadius: 4 },
    deleteButtonText: { color: '#fff', fontSize: 14 },
});

export default AddDishScreen;
