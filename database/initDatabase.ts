import { SQLiteDatabase } from "expo-sqlite";

/**
 * Função assíncrona para inicializar o banco de dados SQLite.
 * Essa função cria a tabela "tamagochis" se ela não existir e também cria triggers para atualizar o status
 * dos Tamagochis com base em mudanças nos atributos de fome, felicidade e sono.
 */
export async function initDatabase(database: SQLiteDatabase) {
    try {
        // Criação da tabela "tamagochis" se ela ainda não existir
        await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tamagochis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        hunger INTEGER NOT NULL DEFAULT 100,
        happy INTEGER NOT NULL DEFAULT 100,
        sleep INTEGER NOT NULL DEFAULT 100,
        status INTEGER,
        tamagochi_id TEXT NOT NULL,
        lastUpdated INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
`);
// Trigger que atualiza o status do Tamagochi automaticamente após uma atualização nos atributos de fome, felicidade ou sono
        await database.execAsync(`
            CREATE TRIGGER IF NOT EXISTS update_data
            AFTER UPDATE OF hunger, happy, sleep ON tamagochis
            FOR EACH ROW
            BEGIN
            UPDATE tamagochis
            SET status = NEW.hunger + NEW.happy + NEW.sleep
            WHERE id = NEW.id;
            END;
        `);
        
        // Trigger que calcula o status do Tamagochi automaticamente após a inserção de um novo registro
        await database.execAsync(`
            CREATE TRIGGER IF NOT EXISTS calculate_data
            AFTER INSERT ON tamagochis
            FOR EACH ROW
            BEGIN
                UPDATE tamagochis
                SET status = NEW.hunger + NEW.happy + NEW.sleep
                WHERE id = NEW.id;
            END;
        `);

        // Mensagem de sucesso no console
        console.log("database funciona grazadeus")

    } catch (error) {
        // Captura e exibe qualquer erro que ocorrer durante a inicialização
        console.error("deu pau, erro:", error);
    }
}