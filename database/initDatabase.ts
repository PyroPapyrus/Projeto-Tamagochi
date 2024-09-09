import { SQLiteDatabase } from "expo-sqlite";

export async function initDatabase(database: SQLiteDatabase) {
    try {
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

        console.log("database funciona grazadeus")
    } catch (error) {
        console.error("deu pau, erro:", error);
    }
}