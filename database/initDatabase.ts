import { SQLiteDatabase } from "expo-sqlite";

// Função assíncrona para inicializar o banco de dados
export async function initDatabase(database: SQLiteDatabase) {
    try {
           // Criação da tabela tamagochis se ela não existir
        await database.execAsync(`
    CREATE TABLE IF NOT EXISTS tamagochis (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        hunger INTEGER NOT NULL DEFAULT 100,
        happy INTEGER NOT NULL DEFAULT 100,
        sleep INTEGER NOT NULL DEFAULT 100,
        status INTEGER,
        tamagochi_id INTEGER NOT NULL,
        lastUpdated INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
`);
        // Criação do trigger para atualizar o status após atualização dos atributos hunger, happy e sleep
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
        
        // Criação do trigger para calcular o status após inserção de um novo Tamagochi
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
        
         // Mensagem de erro no console
        console.error("deu pau, erro:", error);
    }
}