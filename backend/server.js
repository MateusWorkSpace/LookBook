const express = require('express');
const cors = require('cors');
const { openDb, initializeDb } = require('./database');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors());
// Aumenta o limite do payload para acomodar as imagens em base64
app.use(express.json({ limit: '50mb' }));

let db;

// --- API Endpoints ---

// PROFILE
app.get('/api/profile', async (req, res) => {
    try {
        const profile = await db.get('SELECT * FROM profiles WHERE id = 1');
        res.json(profile || { name: '', whatsappNumber: '' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/profile', async (req, res) => {
    const { name, whatsappNumber } = req.body;
    if (!name || !whatsappNumber) {
        return res.status(400).json({ error: 'Name and WhatsApp number are required.' });
    }
    try {
        // Usamos INSERT OR REPLACE para simplificar: cria se não existir, atualiza se existir.
        const stmt = await db.prepare('INSERT OR REPLACE INTO profiles (id, name, whatsappNumber) VALUES (1, ?, ?)');
        await stmt.run(name, whatsappNumber);
        await stmt.finalize();
        const profile = await db.get('SELECT * FROM profiles WHERE id = 1');
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// LOOKBOOKS
app.get('/api/lookbooks', async (req, res) => {
    try {
        const lookbooksRows = await db.all('SELECT * FROM lookbooks ORDER BY createdAt DESC');
        const itemsRows = await db.all('SELECT * FROM lookbook_items');

        const lookbooks = lookbooksRows.map(lb => ({
            ...lb,
            items: itemsRows.filter(item => item.lookbookId === lb.id)
        }));

        res.json(lookbooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/lookbooks', async (req, res) => {
    const { title, description, items } = req.body;
    if (!title || !items || items.length === 0) {
        return res.status(400).json({ error: 'Title and at least one item are required.' });
    }

    const lookbookId = `lookbook-${Date.now()}`;
    const createdAt = new Date().toISOString();

    try {
        await db.run('BEGIN TRANSACTION');

        const lookbookStmt = await db.prepare('INSERT INTO lookbooks (id, title, description, createdAt) VALUES (?, ?, ?, ?)');
        await lookbookStmt.run(lookbookId, title, description, createdAt);
        await lookbookStmt.finalize();

        const itemStmt = await db.prepare('INSERT INTO lookbook_items (id, lookbookId, imageUrl, name, price) VALUES (?, ?, ?, ?, ?)');
        for (const item of items) {
            const itemId = `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            await itemStmt.run(itemId, lookbookId, item.imageUrl, item.name, item.price);
        }
        await itemStmt.finalize();

        await db.run('COMMIT');

        const newLookbook = { id: lookbookId, title, description, createdAt, items };
        res.status(201).json(newLookbook);
    } catch (error) {
        await db.run('ROLLBACK');
        res.status(500).json({ error: error.message });
    }
});

// Endpoint for Client View - returns lookbook and shopper profile together
app.get('/api/lookbook-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const lookbookRow = await db.get('SELECT * FROM lookbooks WHERE id = ?', id);

        if (!lookbookRow) {
            return res.status(404).json({ error: 'Lookbook not found' });
        }

        const items = await db.all('SELECT * FROM lookbook_items WHERE lookbookId = ?', id);
        const profile = await db.get('SELECT name, whatsappNumber FROM profiles WHERE id = 1');

        const lookbook = { ...lookbookRow, items };
        const shopperProfile = profile || { name: 'Personal Shopper', whatsappNumber: '' };

        res.json({ lookbook, shopperProfile });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// --- Server Initialization ---
const startServer = async () => {
    db = await openDb();
    await initializeDb(db);
    app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
    });
};

startServer();
