import { ImageSourcePropType } from "react-native";

export type TamagochiStatus = "morto" | "critico" | "muito_triste" | "triste" | "ok" | "bem" | "muito_bem";
export type TamagochiType = "tamagochi1" | "tamagochi2" | "tamagochi3" | "tamagochi4";

const tamagochiImages: Record<TamagochiStatus, Record<TamagochiType, ImageSourcePropType>> = {
    morto: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    critico: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa gritante.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    muito_triste: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    triste: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    ok: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    bem: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    },
    muito_bem: {
        tamagochi1: require('./dog/dog.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog.png'),
        tamagochi4: require('./pinguim/pinguim.png'),
    }
};

export { tamagochiImages };