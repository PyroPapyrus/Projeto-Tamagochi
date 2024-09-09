import { useSQLiteContext } from "expo-sqlite";

// Define o tipo Tamagochi com todos os atributos necessários
export type Tamagochi = {
    id: number;
    name: string;
    hunger: number;
    sleep: number;
    happy: number;
    status: number;
    tamagochi_id: string;
    lastUpdated: number;
};

// Função para usar o banco de dados Tamagochi
export function useTamagochiDatabase() {
    const database = useSQLiteContext();

    // Função para criar um novo Tamagochi
    async function createTamagochi(data: Omit<Tamagochi, 'id' | 'hunger' | 'sleep' | 'happy' | 'status' | 'lastUpdated'>) {
        const currentTime = Math.floor(Date.now() / 3600000); // Calcula o tempo atual

        // Prepara a declaração SQL para inserir um novo Tamagochi
        const statement = await database.prepareAsync(`
            INSERT INTO tamagochis (name, hunger, sleep, happy, status, tamagochi_id, lastUpdated) 
            VALUES ($name, 100, 100, 100, 300, $tamagochi_id, $lastUpdated);    
        `);
        try {
            // Executa a declaração SQL com os valores fornecidos
            const result = await statement.executeAsync({
                $name: data.name,
                $tamagochi_id: data.tamagochi_id,
                $lastUpdated: currentTime, 
            });

             // Verifica se o ID do último registro inserido é um número válido e o formata
        const lastInsertId = Number(result.lastInsertRowId);
        if (!isNaN(lastInsertId)) {
            return lastInsertId.toLocaleString(); // Retorna o ID do último registro inserido
        } else {
            throw new Error("ID do último registro inserido não é um número válido.");
        }
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        } finally {
            await statement.finalizeAsync(); // Finaliza a declaração SQL
        }
    }

    // Função para buscar todos os Tamagochis
    async function findAllTamagochi() {
        try {
            const query = `SELECT * FROM tamagochis;`; // Declaração SQL para buscar todos os registros
            return await database.getAllAsync<Tamagochi>(query); // Executa a consulta e retorna os resultados
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        }
    }

    // Função para buscar um Tamagochi pelo ID
    async function findeTamagochiById(id: number) {
        try {
            const query = `SELECT * FROM tamagochis WHERE id = ?;`; // Declaração SQL para buscar um registro pelo ID
            return await database.getFirstAsync<Tamagochi>(query, id); // Executa a consulta e retorna o primeiro resultado
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        }
    }

    // Função para buscar Tamagochis pelo nome
    async function findTamagochiByName(search: string) {
        try {
            const query = `SELECT * FROM tamagochis WHERE name LIKE ?;`; // Declaração SQL para buscar registros pelo nome
            return await database.getAllAsync<Tamagochi>(query, `%${search}%`); // Executa a consulta e retorna os resultados
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        }
    }

    // Função para atualizar o atributo hunger de um Tamagochi
    async function updateHunger(id: number, hunger: number) {
        const currentTime = Math.floor(Date.now() / 3600000); // Calcula o tempo atual
        
        // Prepara a declaração SQL para atualizar o atributo hunger
        const statement = await database.prepareAsync(`
            UPDATE tamagochis SET hunger = $hunger, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            // Executa a declaração SQL com os valores fornecidos
            await statement.executeAsync({
                $hunger: hunger,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        } finally {
            await statement.finalizeAsync(); // Finaliza a declaração SQL
        }
    }

    // Função para atualizar o atributo happy de um Tamagochi
    async function updateHappy(id: number, happy: number) {
        const currentTime = Math.floor(Date.now() / 3600000); // Calcula o tempo atual
        
        // Prepara a declaração SQL para atualizar o atributo happy
        const statement = await database.prepareAsync(`
            UPDATE tamagochis SET happy = $happy, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            // Executa a declaração SQL com os valores fornecidos
            await statement.executeAsync({
                $happy: happy,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        } finally {
            await statement.finalizeAsync(); // Finaliza a declaração SQL
        }
    }

    // Função para atualizar o atributo sleep de um Tamagochi
    async function updateSleep(id: number, sleep: number) {
        const currentTime = Math.floor(Date.now() / 3600000); // Calcula o tempo atual
        
        // Prepara a declaração SQL para atualizar o atributo sleep
        const statement = await database.prepareAsync(`
            UPDATE tamagochis SET sleep = $sleep, lastUpdated = $lastUpdated WHERE id = $id;
        `);
        try {
            // Executa a declaração SQL com os valores fornecidos
            await statement.executeAsync({
                $sleep: sleep,
                $lastUpdated: currentTime,
                $id: id
            });
        } catch (error) {
            throw error; // Lança um erro caso ocorra algum problema
        } finally {
            await statement.finalizeAsync(); // Finaliza a declaração SQL
        }
    }
    
    async function updateTamagochiAttribute(tamagochiId: number, hunger: number, sleep: number, happy: number) {
        // Calcula o tempo atual em segundos
        const currentTime = Math.floor(Date.now() / 3600000); 
        
        // Prepara a declaração SQL para atualizar os atributos do Tamagochi
        const statement = await database.prepareAsync(`
            UPDATE tamagochis 
            SET hunger = $hunger, sleep = $sleep, happy = $happy, lastUpdated = $lastUpdated
            WHERE id = $id;
            `);
            
            try {
                // Executa a declaração SQL com os valores fornecidos
                await statement.executeAsync({
                    $hunger: hunger,
                    $sleep: sleep,
                    $happy: happy,
                    $lastUpdated: currentTime,
                    $id: tamagochiId
                });
            } catch (error) {
                // Lança um erro caso ocorra algum problema
                throw error;
            } finally {
                // Finaliza a declaração SQL
                await statement.finalizeAsync();
            }
        }
        
        
        
        // Retorna todas as funções para uso externo
    return { createTamagochi, findAllTamagochi, findeTamagochiById, findTamagochiByName, updateHunger, updateHappy, updateSleep,updateTamagochiAttribute };
}