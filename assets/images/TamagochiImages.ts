import { ImageSourcePropType } from "react-native";

export type TamagochiStatus = "morto" | "critico" | "muito_triste" | "triste" | "ok" | "bem" | "muito_bem";
export type TamagochiType = "tamagochi1" | "tamagochi2" | "tamagochi3" | "tamagochi4";

const tamagochiImages: Record<TamagochiStatus, Record<TamagochiType, ImageSourcePropType>> = {
    morto: {
        tamagochi1: require('./rip-morto.webp'),
        tamagochi2: require('./rip-morto.webp'),
        tamagochi3: require('./rip-morto.webp'),
        tamagochi4: require('./rip-morto.webp'),
    },
    critico: {
        tamagochi1: require('./monky/monky critico.png'),
        tamagochi2: require('./big-floppa/floppa critico.png'),
        tamagochi3: require('./frog/frog critico.png'),
        tamagochi4: require('./pinguim/pinguim critico.png'),
    },
    muito_triste: {
        tamagochi1: require('./monky/monky muito-triste.png'),
        tamagochi2: require('./big-floppa/floppa muito triste.png'),
        tamagochi3: require('./frog/frog muito triste.png'),
        tamagochi4: require('./pinguim/pinguim muito triste.png'),
    },
    triste: {
        tamagochi1: require('./monky/monky triste.png'),
        tamagochi2: require('./big-floppa/floppa triste.png'),
        tamagochi3: require('./frog/frog triste.png'),
        tamagochi4: require('./pinguim/pinguim triste.png'),
    },
    ok: {
        tamagochi1: require('./monky/monky ok.png'),
        tamagochi2: require('./big-floppa/floppa.png'),
        tamagochi3: require('./frog/frog ok.png'),
        tamagochi4: require('./pinguim/pinguim ok.png'),
    },
    bem: {
        tamagochi1: require('./monky/monky bem.png'),
        tamagochi2: require('./big-floppa/floppa bem.png'),
        tamagochi3: require('./frog/frog bem.png'),
        tamagochi4: require('./pinguim/pinguim bem.png'),
    },
    muito_bem: {
        tamagochi1: require('./monky/monky muito-bem.gif'),
        tamagochi2: require('./big-floppa/floppa-pet.gif'),
        tamagochi3: require('./frog/frog muito bem.gif'),
        tamagochi4: require('./pinguim/pinguim-dance-unscreen.gif'),
    }
};

export { tamagochiImages };