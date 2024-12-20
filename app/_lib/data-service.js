import connectToDatabase from './database.js';

async function executeQuery(query, params = []) {
    const db = connectToDatabase();
    const stmt = db.prepare(query);
    const data = params.length ? stmt.get(...params) : stmt.all();
    db.close();
    return data;
}

export const getCabins = async function () {
    try {
        const query = `
            SELECT id, name, maxCapacity, regularPrice, discount, image
            FROM cabins
            ORDER BY name
        `;
        return await executeQuery(query);
    } catch (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
};

export const getCabin = async function (id) {
    try {
        const query = `
            SELECT id, name, maxCapacity, regularPrice, discount, image
            FROM cabins
            WHERE id = ?
        `;
        const data = await executeQuery(query, [id]);

        if (!data) {
            throw new Error("Cabin not found");
        }

        return data;
    } catch (error) {
        console.error(error);
        throw new Error("Cabin could not be loaded");
    }
};