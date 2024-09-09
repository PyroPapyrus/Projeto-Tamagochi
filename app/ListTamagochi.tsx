import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Tamagochi, useTamagochiDatabase } from "@/database/tamagochiDatabase";
import { updateAttributesBasedOnTime } from "@/utils/updateAttributesBasedOnTime";
import { getTamagochiImage } from '@/utils/getTamagochiImage';
import { useRouter } from "expo-router";
import { calculateTamagochiStatus } from '@/utils/calculateTamagochiStatus';
import { TamagochiType } from '@/assets/images/TamagochiImages';

const ListTamagochi: React.FC = () => {
  const [tamagochis, setTamagochis] = useState<Tamagochi[]>([]);
  const router = useRouter();
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
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

    const renderItem = ({ item }: { item: Tamagochi }) => {
    const statusConverterTamagochi = calculateTamagochiStatus( item.hunger, item.sleep, item.happy );
        return(

            <View style={styles.itemContainer}>
        <Image source={getTamagochiImage(statusConverterTamagochi,item.tamagochi_id as TamagochiType)} style={styles.image} />

        <Text style={styles.name}>{item.name}</Text>

        </View>

    );
    };



    return (
        <FlatList data={tamagochis}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}>

        </FlatList>
    );
}
export default ListTamagochi;

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
