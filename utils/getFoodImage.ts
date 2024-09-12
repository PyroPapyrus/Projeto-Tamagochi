const getFoodImage = (name: string) => {
    switch (name) {
      case 'hamburguer':
        return require('@/assets/images/hamburguer.png');
      case 'pizza':
        return require('@/assets/images/basket.png');
      case 'sushi':
        return require('@/assets/images/icon.png');
      default:
        return require('@/assets/images/sleepingTamagochi/walter-white.png');
    }
  };
  
  export default getFoodImage