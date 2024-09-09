import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { updateAttributesBasedOnTime } from "@/utils/updateAttributesBasedOnTime";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './_layout';
import { TamagochiType } from '@/assets/images/TamagochiImages';

type ListTamagochiNavigationProp = StackNavigationProp<RootStackParamList, 'ListTamagochi'>;

const ListTamagochi: React.FC = () => {
  const [tamagochis, setTamagochis] = useState<Tamagochi[]>([]);
  const navigation = useNavigation<ListTamagochiNavigationProp>();
  const database = useTamagochiDatabase();

  const ChargeTamagochi = async () => {
    try {
      const allTamagochis = await database.findAllTamagochi();

      const updatedTamagochis = allTamagochis.map(async (tamagochi) => {
        const { hunger, sleep, happy } = updateAttributesBasedOnTime(
          tamagochi.lastUpdated,
          tamagochi.hunger,
          tamagochi.sleep,
          tamagochi.happy
        );

        const updatedTamagochi = {
          ...tamagochi,
          hunger,
          sleep,
          happy,
        };

        if (sleep !== tamagochi.sleep || hunger !== tamagochi.hunger || happy !== tamagochi.happy) {
          await database.updateAllTamagochiAttribute(tamagochi.id, hunger, sleep, happy);
        }

        return updatedTamagochi;
      });

      setTamagochis(await Promise.all(updatedTamagochis));
    } catch (error) {
      console.log('Erro ao carregar Tamagochis:', error);
    }
  };

  useEffect(() => {
    ChargeTamagochi();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      ChargeTamagochi();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const renderItem = ({ item }: { item: Tamagochi }) => {
    const status = calculateTamagochiStatus(item.hunger, item.sleep, item.happy);
    return (
      <Pressable onPress={() => navigation.navigate('TamagochiDetails', { tamagochiId: item.id })}>
        <View style={styles.itemContainer}>
          <Image source={getTamagochiImage(status, item.tamagochi_id as TamagochiType)} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      data={tamagochis}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ListTamagochi;
