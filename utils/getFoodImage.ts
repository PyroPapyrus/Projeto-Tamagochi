 //Obtém a imagem correspondente ao nome do alimento fornecido
const getFoodImage = (name: string) => {
    switch (name) {
      case 'hamburguer':
        return require('@/assets/images/foods/hamburguer.png');
      case 'pizza':
        return require('@/assets/images/foods/pizza.png');
      case 'sushi':
        return require('@/assets/images/foods/sushi.png');
      default:
        return require('@/assets/images/sleepingTamagochi/walter-white.png'); // Retorna uma imagem padrão se o nome não for reconhecido
    }
  };
  
  export default getFoodImage;