import { getTamagochiImage } from "@/utils/getTamagochiImage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, Image, ImageBackground, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
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
        <ImageBackground source={{ uri: 'https://i.pinimg.com/736x/c9/8b/a0/c98ba0403bb66007b04c6c396267d30d.jpg' }} style={styles.background}>
            
                    <Text style={styles.buttonGoBack}
                        onPress={() => {
                            router.back();
                        }}     
                    >GO BACK</Text>

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

                <TextInput  placeholder="Nome"
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

    buttonGoBack: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'left', 
        padding: 15,
        width: '100%',
        paddingVertical: 30,
    },

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
        marginBottom: 10,
        color: 'white',
    },
    inputField: {
        height: 45,
        borderColor: 'green',
        borderWidth: 2,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    imageSelectionLabel: {
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
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