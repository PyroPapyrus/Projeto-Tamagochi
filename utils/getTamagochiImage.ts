import { tamagochiImages, TamagochiStatus, TamagochiType } from "@/assets/images/TamagochiImages";
import { ImageSourcePropType } from "react-native";

 //Obtém a imagem do Tamagochi com base em seu status e tipo
export function getTamagochiImage(status: TamagochiStatus, tamagochiType: TamagochiType): ImageSourcePropType {
    return tamagochiImages[status][tamagochiType]; // Retorna a imagem do Tamagochi com base no status e tipo fornecidos
}

