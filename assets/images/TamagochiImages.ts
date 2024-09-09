type TamagochiStatus = "morto" | "critico" | "muito_triste" | "triste" | "ok" | "bem" | "muito_bem";
type TamagochiType = "tamagochi1" | "tamagochi2" | "tamagochi3" | "tamagochi4";

const tamagochiImages: Record<TamagochiStatus, Record<TamagochiType, string>> = {
    morto: {
        tamagochi1: "path/to/tamagochi1_morto.png",
        tamagochi2: "path/to/tamagochi2_morto.png",
        tamagochi3: "path/to/tamagochi3_morto.png",
        tamagochi4: "path/to/tamagochi4_morto.png",
    },
    critico: {
        tamagochi1: "path/to/tamagochi1_critico.png",
        tamagochi2: "path/to/tamagochi2_critico.png",
        tamagochi3: "path/to/tamagochi3_critico.png",
        tamagochi4: "path/to/tamagochi4_critico.png",
    },
    muito_triste: {
        tamagochi1: "path/to/tamagochi1_muito_triste.png",
        tamagochi2: "path/to/tamagochi2_muito_triste.png",
        tamagochi3: "path/to/tamagochi3_muito_triste.png",
        tamagochi4: "path/to/tamagochi4_muito_triste.png",
    },
    triste: {
        tamagochi1: "path/to/tamagochi1_triste.png",
        tamagochi2: "path/to/tamagochi2_triste.png",
        tamagochi3: "path/to/tamagochi3_triste.png",
        tamagochi4: "path/to/tamagochi4_triste.png",
    },
    ok: {
        tamagochi1: "path/to/tamagochi1_ok.png",
        tamagochi2: "path/to/tamagochi2_ok.png",
        tamagochi3: "path/to/tamagochi3_ok.png",
        tamagochi4: "path/to/tamagochi4_ok.png",
    },
    bem: {
        tamagochi1: "./dog.png",
        tamagochi2: "path/to/tamagochi2_bem.png",
        tamagochi3: "path/to/tamagochi3_bem.png",
        tamagochi4: "path/to/tamagochi4_bem.png",
    },
    muito_bem: {
        tamagochi1: "path/to/tamagochi1_muito_bem.png",
        tamagochi2: "path/to/tamagochi2_muito_bem.png",
        tamagochi3: "path/to/tamagochi3_muito_bem.png",
        tamagochi4: "path/to/tamagochi4_muito_bem.png",
    }
};
