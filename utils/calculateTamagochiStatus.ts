import { TamagochiStatus } from "@/assets/images/TamagochiImages";

 //Calcula o status do Tamagochi com base nos atributos de fome, sono e felicidade
export function calculateTamagochiStatus(hunger: number, sleep: number, happy: number): TamagochiStatus {
    const total = hunger + sleep + happy; // Soma os níveis de fome, sono e felicidade

 // Determina o status com base na soma total
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
        return "morto"; // Retorna "morto" como valor padrão para qualquer caso não esperado
    }
}

