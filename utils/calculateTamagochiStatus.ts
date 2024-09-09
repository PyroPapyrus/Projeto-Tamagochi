import { TamagochiStatus } from "@/assets/images/TamagochiImages";

export function calculateTamagochiStatus(hunger: number, sleep: number, happy: number): TamagochiStatus {
    const total = hunger + sleep + happy;

    if (total === 0) {
        return "morto";
    } else if (total >= 1 && total <= 50) {
        return "critico";
    } else if (total >= 51 && total <= 100) {
        return "muito_triste";
    } else if (total >= 101 && total <= 150) {
        return "triste";
    } else if (total >= 151 && total <= 200) {
        return "ok";
    } else if (total >= 201 && total <= 250) {
        return "bem";
    } else if (total >= 251 && total <= 300) {
        return "muito_bem";
    } else {
        // Retornar um valor padrão válido ou lançar um erro
        return "morto"; // ou qualquer outro valor padrão válido
    }
}

