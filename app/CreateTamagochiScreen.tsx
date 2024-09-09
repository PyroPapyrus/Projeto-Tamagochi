import { getTamagochiImage } from "@/utils/getTamagochiImage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTamagochiDatabase } from "../database/tamagochiDatabase";
import { tamagochiImages, TamagochiType } from "@/assets/images/TamagochiImages";


const CreateTamagochiScreen = () => {
    const [selectedImage, setSelectedImage] = useState<TamagochiType | null>(null);
    const [name, setName] = useState('');
    const router = useRouter();
    const database = useTamagochiDatabase();

      async function constructTamagochi() {
        
        try {
            if (!name) {
                return Alert.alert('O tamagochi precisa ter um nome');
            }
            if (selectedImage === null) {
                return Alert.alert('O tamagochi precisa ter uma imagem');
            }
            const newTamagochiId = await database.createTamagochi({
                name: name,
                tamagochi_id: selectedImage
            });
            Alert.alert('Tamagochi cadastrado com sucesso!', `ID: ${newTamagochiId}`);
            setName('');
            setSelectedImage(null);
            router.back();

        } catch (error) {
            console.log('Erro ao criar Tamagochi:', error);
        }
    }

    const registeredImage = selectedImage !== null ? getTamagochiImage('muito_bem', selectedImage) : null;


    return (
        <ImageBackground  source={{ uri: 'https://example.com/image.png' }} style={styles.background}>

            <ScrollView  contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.header}>Gerador de Tamagochi</Text>

                <Text style={styles.imageSelectionLabel}>Qual a aparência do Tamagochi:</Text>
                <View style={styles.imageGrid}>
                    {Object.keys(tamagochiImages.muito_bem).map((key) => (
                        <Pressable
                        key={key}
                            onPress={() => setSelectedImage(key as TamagochiType)}
                            style={[styles.imageTile, selectedImage === key && styles.selectedImageTile]}
                            >
                            <Image
                                source={getTamagochiImage('muito_bem', key as TamagochiType)}
                                resizeMode="contain"
                                style={styles.image}
                                />
                        </Pressable>
                    ))}
                </View>

                {registeredImage && (
                    <View>
                        <Image source={registeredImage} resizeMode="contain" style={styles.selectedImage} />
                    </View>
                )}

                <TextInput  placeholder="Name"
                value={name}
                style={styles.inputField}
                onChangeText={setName}
                />

                <Pressable onPress={constructTamagochi} style={styles.createButton}>
                    <Text style={styles.createButtonText}>Gerar</Text>
                </Pressable>
            </ScrollView>
        </ImageBackground>
    );
};

export default CreateTamagochiScreen;
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000',
    },
    inputField: {
        height: 45,
        borderColor: '#000',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    imageSelectionLabel: {
        fontSize: 20,
        marginBottom: 10,
        color: '#000',
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20,
        gap: 5
    },
    imageTile: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    selectedImageTile: {
        borderColor: '#295',
    },
    image: {
        width: 70,
        height: 70,
    },
    selectedImage: {
        width: 120,
        height: 120,
        marginBottom: 10,
    },
    createButton: {
        backgroundColor: '#007B18',
        padding: 10,
        borderRadius: 5,
    },
    createButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});