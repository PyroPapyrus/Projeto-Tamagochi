import { ImageSourcePropType } from "react-native";

export type TamagochiStatus = "morto" | "critico" | "muito_triste" | "triste" | "ok" | "bem" | "muito_bem";
export type TamagochiType = "tamagochi1" | "tamagochi2" | "tamagochi3" | "tamagochi4";

const tamagochiImages: Record<TamagochiStatus, Record<TamagochiType, ImageSourcePropType>> = {
    morto: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    critico: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    muito_triste: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    triste: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    ok: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    bem: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    },
    muito_bem: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./dog.png'),
        tamagochi4: require('./dog.png'),
    }
};

export { tamagochiImages };