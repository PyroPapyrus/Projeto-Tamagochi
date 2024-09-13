import { getTamagochiImage } from "@/utils/getTamagochiImage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useTamagochiDatabase } from "../database/tamagochiDatabase";
import { tamagochiImages, TamagochiType } from "@/assets/images/TamagochiImages";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";


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
            Alert.alert('Tamagochi cadastrado com sucesso!');
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
            
            <Ionicons name="arrow-back" style={styles.arrowBack}
                onPress={() => {
                    router.back();
                }}/>

            <ScrollView  contentContainerStyle={styles.scrollContainer}>

                <Text style={styles.header}>Gerador de Tamagochi</Text>

                <Text style={styles.imageSelectionLabel}>Escolha a aparência do Tamagochi:</Text>
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

                <Pressable style={styles.createButton} onPress={constructTamagochi}>
                    <Text style={styles.createButtonText}>
                        Gerar
                    </Text>
                </Pressable>
                
            </ScrollView>
        </ImageBackground>
    );
};

export default CreateTamagochiScreen;
const styles = StyleSheet.create({

    arrowBack: {
        fontSize: 32,
        color: "white",     
        marginTop: 25,
        paddingHorizontal: 10, 
        paddingVertical: 10,    
        alignSelf: 'flex-start', 
        textShadowColor: 'black',
        textShadowOffset: { width: -0, height: 2 },
        textShadowRadius: 1,
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
        fontFamily: 'PixelifySansBold',
        fontSize: 30,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 1,
    },
    inputField: {
        fontFamily: 'PixelifySansMedium',
        height: 45,
        borderColor: 'black',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 10
    },
    imageSelectionLabel: {
        fontFamily: 'PixelifySansMedium',
        fontSize: 20,
        marginBottom: 10,
        color: 'white',
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 1,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        margin: 20,
        gap: 5,
    },
    imageTile: {
        margin: 10,
        padding: 10,
        borderWidth: 3,
        borderColor: '#777',
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        opacity: 0.5
    },
    selectedImageTile: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'green',
        opacity: 1
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
        backgroundColor: 'rgba(0, 123, 255, 0.4)',
        padding: 12,
        paddingHorizontal: 28,
        borderRadius: 10,
    },
    createButtonText: {
        fontFamily: 'PixelifySansMedium',
        color: 'white',
        fontSize: 18,
        textShadowColor: 'black',
        textShadowOffset: { width: -2, height: 2 },
        textShadowRadius: 1,
    },
});