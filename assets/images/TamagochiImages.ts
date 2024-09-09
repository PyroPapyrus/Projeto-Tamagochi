import { ImageSourcePropType } from "react-native";

export type TamagochiStatus = "morto" | "critico" | "muito_triste" | "triste" | "ok" | "bem" | "muito_bem";
export type TamagochiType = "tamagochi1" | "tamagochi2" | "tamagochi3" | "tamagochi4";

const tamagochiImages: Record<TamagochiStatus, Record<TamagochiType, ImageSourcePropType>> = {
    morto: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    critico: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    muito_triste: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    triste: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    ok: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    bem: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    },
    muito_bem: {
        tamagochi1: require('./dog.png'),
        tamagochi2: require('./fruit.png'),
        tamagochi3: require('./frog.png'),
        tamagochi4: require('./pinguim.png'),
    }
};

export { tamagochiImages };