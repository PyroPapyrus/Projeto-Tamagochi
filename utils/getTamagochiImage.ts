import { tamagochiImages, TamagochiStatus, TamagochiType } from "@/assets/images/TamagochiImages";
import { ImageSourcePropType } from "react-native";

export function getTamagochiImage(status: TamagochiStatus, tamagochiType: TamagochiType): ImageSourcePropType {
    return tamagochiImages[status][tamagochiType];
}

