 //Atualiza os atributos de um Tamagochi com base no tempo decorrido desde a última atualização
export function updateAttributesBasedOnTime(lastUpdated: number, hunger: number, sleep: number, happy: number): { hunger: number; sleep: number; happy: number } {
    const currentTime = Math.floor(Date.now() / 3600000); // Cada unidade representa 1 hora
    const timeDiff = currentTime - lastUpdated; // Diferença em horas

    const decayAmount = timeDiff * 1; // Decaimento de 1 unidade por hora

    return {
        hunger: Math.max(0, hunger - (decayAmount )), // Atualiza a fome, garantindo que não fique negativa
        sleep: Math.max(0, sleep - (decayAmount )), // Atualiza o sono, garantindo que não fique negativo
        happy: Math.max(0, happy - (decayAmount)), // Atualiza a felicidade, garantindo que não fique negativa
    };
}
