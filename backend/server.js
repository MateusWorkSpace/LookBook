const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { openDb, initializeDb } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-change-it';

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));

let db;

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};


// --- API Endpoints ---

// AUTH
app.post('/api/auth/register', async (req, res) => {
    const { name, whatsappNumber, email, password } = req.body;
    if (!email || !password || !name || !whatsappNumber) {
        return res.status(400).json({ error: 'All fields are required.' });
    }
    try {
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run('INSERT INTO users (name, whatsappNumber, email, password) VALUES (?, ?, ?, ?)', name, whatsappNumber, email, hashedPassword);
        res.status(201).json({ id: result.lastID, email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, whatsappNumber: user.whatsappNumber } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PROFILE (Protected)
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const profile = await db.get('SELECT id, name, email, whatsappNumber FROM users WHERE id = ?', req.user.id);
        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/profile', authenticateToken, async (req, res) => {
    const { name, whatsappNumber } = req.body;
    try {
        await db.run('UPDATE users SET name = ?, whatsappNumber = ? WHERE id = ?', name, whatsappNumber, req.user.id);
        const profile = await db.get('SELECT id, name, email, whatsappNumber FROM users WHERE id = ?', req.user.id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// LOOKBOOKS (Protected)
app.get('/api/lookbooks', authenticateToken, async (req, res) => {
    try {
        const lookbooksRows = await db.all('SELECT * FROM lookbooks WHERE userId = ? ORDER BY createdAt DESC', req.user.id);
        const itemsRows = await db.all('SELECT * FROM lookbook_items WHERE lookbookId IN (SELECT id FROM lookbooks WHERE userId = ?)', req.user.id);

        const lookbooks = lookbooksRows.map(lb => ({
            ...lb,
            items: itemsRows.filter(item => item.lookbookId === lb.id)
        }));

        res.json(lookbooks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/lookbooks', authenticateToken, async (req, res) => {
    const { title, description, items } = req.body;
    const userId = req.user.id;
    if (!title || !items || items.length === 0) {
        return res.status(400).json({ error: 'Title and at least one item are required.' });
    }

    const lookbookId = `lookbook-${Date.now()}`;
    const createdAt = new Date().toISOString();

    try {
        await db.run('BEGIN TRANSACTION');

        const lookbookStmt = await db.prepare('INSERT INTO lookbooks (id, userId, title, description, createdAt) VALUES (?, ?, ?, ?, ?)');
        await lookbookStmt.run(lookbookId, userId, title, description, createdAt);
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

// Endpoint for Client View (Public)
app.get('/api/lookbook-details/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const lookbookRow = await db.get('SELECT * FROM lookbooks WHERE id = ?', id);

        if (!lookbookRow) {
            return res.status(404).json({ error: 'Lookbook not found' });
        }

        const items = await db.all('SELECT * FROM lookbook_items WHERE lookbookId = ?', id);
        const profile = await db.get('SELECT name, whatsappNumber FROM users WHERE id = ?', lookbookRow.userId);

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