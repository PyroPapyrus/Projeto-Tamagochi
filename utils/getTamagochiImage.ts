export function getTamagochiImage(status: TamagochiStatus, tamagochiType: TamagochiType): string {
    return tamagochiImages[status][tamagochiType];
}


// para testar futuramente quando tivermos imagens suficientes

// const hunger = 80;
// const sleep = 70;
// const happy = 60;
// const status = calculateTamagochiStatus(hunger, sleep, happy);
// const tamagochiType: TamagochiType = "tamagochi1"; // Pode ser tamagochi1, tamagochi2, tamagochi3, tamagochi4
// const imagePath = getTamagochiImage(status, tamagochiType);

// console.log(`Status: ${status}, Image Path: ${imagePath}`);
