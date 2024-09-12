import { TamagochiType } from "@/assets/images/TamagochiImages";

const getSleepingImage = (tamagochiId: TamagochiType) => {
    switch (tamagochiId) {
      case 'tamagochi1':
        return require('@/assets/images/sleepingTamagochi/monky sleep.png');
      case 'tamagochi2':
        return require('@/assets/images/sleepingTamagochi/floppa sleep.png');
      case 'tamagochi3':
        return require('@/assets/images/sleepingTamagochi/frog sleep.png');
      case 'tamagochi4':
        return require('@/assets/images/sleepingTamagochi/pinguim sleep.png');
      default:
        return require('@/assets/images/sleepingTamagochi/floppa sleep.png');
    }
  };

export { getSleepingImage };