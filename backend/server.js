const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { openDb } = require('./database');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-super-secret-key-that-should-be-in-env-vars'; // Para produção, use variáveis de ambiente

app.use(cors());
// Aumenta o limite para dados de imagem em base64
app.use(express.json({ limit: '20mb' }));

// Middleware para autenticar JWT
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


// --- ROTAS DE AUTENTICAÇÃO ---
app.post('/api/auth/register', async (req, res) => {
    const { name, whatsappNumber, email, password } = req.body;
    if (!name || !whatsappNumber || !email || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const db = await openDb();
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (existingUser) {
            return res.status(409).json({ error: 'Este email já está em uso' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            id: uuidv4(),
            name,
            whatsappNumber,
            email,
            password: hashedPassword,
        };
        await db.run('INSERT INTO users (id, name, whatsappNumber, email, password) VALUES (?, ?, ?, ?, ?)', [newUser.id, newUser.name, newUser.whatsappNumber, newUser.email, newUser.password]);

        res.status(201).json({ message: 'Usuário registrado com sucesso' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const db = await openDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', email);
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// --- ROTAS DE PERFIL ---
app.get('/api/profile', authenticateToken, async (req, res) => {
    try {
        const db = await openDb();
        const profile = await db.get('SELECT id, name, whatsappNumber, email FROM users WHERE id = ?', req.user.userId);
        if (!profile) {
            return res.status(404).json({ error: 'Perfil não encontrado' });
        }
        res.json(profile);
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
    const { name, whatsappNumber } = req.body;
    if (!name || !whatsappNumber) {
        return res.status(400).json({ error: 'Nome e número do WhatsApp são obrigatórios' });
    }
    try {
        const db = await openDb();
        await db.run('UPDATE users SET name = ?, whatsappNumber = ? WHERE id = ?', [name, whatsappNumber, req.user.userId]);
        const updatedProfile = await db.get('SELECT id, name, whatsappNumber, email FROM users WHERE id = ?', req.user.userId);
        res.json(updatedProfile);
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


// --- ROTAS DE LOOKBOOK ---
app.get('/api/lookbooks', authenticateToken, async (req, res) => {
    try {
        const db = await openDb();
        const lookbooks = await db.all('SELECT * FROM lookbooks WHERE user_id = ? ORDER BY createdAt DESC', req.user.userId);

        for (let lookbook of lookbooks) {
            const items = await db.all('SELECT * FROM lookbook_items WHERE lookbook_id = ?', lookbook.id);
            lookbook.items = items;
        }

        res.json(lookbooks);
    } catch (error) {
        console.error('Get lookbooks error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.post('/api/lookbooks', authenticateToken, async (req, res) => {
    const { title, description, items } = req.body;
    if (!title || !items || items.length === 0) {
        return res.status(400).json({ error: 'Título e pelo menos um item são obrigatórios' });
    }

    const db = await openDb();
    try {
        await db.run('BEGIN TRANSACTION');
        
        const newLookbookId = uuidv4();
        const createdAt = new Date().toISOString();
        
        await db.run('INSERT INTO lookbooks (id, user_id, title, description, createdAt) VALUES (?, ?, ?, ?, ?)', [newLookbookId, req.user.userId, title, description, createdAt]);

        for (const item of items) {
            await db.run('INSERT INTO lookbook_items (id, lookbook_id, imageUrl, name, price) VALUES (?, ?, ?, ?, ?)', [uuidv4(), newLookbookId, item.imageUrl, item.name, item.price]);
        }
        
        await db.run('COMMIT');

        res.status(201).json({ id: newLookbookId, message: 'Lookbook criado com sucesso' });
    } catch (error) {
        await db.run('ROLLBACK');
        console.error('Create lookbook error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.get('/api/lookbooks/public/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await openDb();
        const lookbook = await db.get('SELECT * FROM lookbooks WHERE id = ?', id);

        if (!lookbook) {
            return res.status(404).json({ error: 'Lookbook não encontrado' });
        }
        
        const items = await db.all('SELECT * FROM lookbook_items WHERE lookbook_id = ?', id);
        lookbook.items = items;

        const profile = await db.get('SELECT name, whatsappNumber, email FROM users WHERE id = ?', lookbook.user_id);

        if (!profile) {
            return res.status(404).json({ error: 'Vendedor não encontrado' });
        }

        res.json({ lookbook, profile });
    } catch (error) {
        console.error('Get public lookbook error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.get('/api/lookbooks/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const db = await openDb();
        const lookbook = await db.get('SELECT * FROM lookbooks WHERE id = ? AND user_id = ?', [id, req.user.userId]);

        if (!lookbook) {
            return res.status(404).json({ error: 'Lookbook não encontrado ou não pertence a você' });
        }
        
        const items = await db.all('SELECT * FROM lookbook_items WHERE lookbook_id = ?', id);
        lookbook.items = items;
        
        res.json(lookbook);
    } catch (error) {
        console.error('Get single lookbook error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


app.put('/api/lookbooks/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { title, description, items } = req.body;

    if (!title || !items) {
        return res.status(400).json({ error: 'Título e itens são obrigatórios' });
    }
    
    const db = await openDb();
    try {
        const lookbook = await db.get('SELECT * FROM lookbooks WHERE id = ? AND user_id = ?', [id, req.user.userId]);
        if (!lookbook) {
            return res.status(404).json({ error: 'Lookbook não encontrado ou não pertence a você' });
        }

        await db.run('BEGIN TRANSACTION');

        await db.run('UPDATE lookbooks SET title = ?, description = ? WHERE id = ?', [title, description, id]);

        await db.run('DELETE FROM lookbook_items WHERE lookbook_id = ?', id);

        for (const item of items) {
            await db.run('INSERT INTO lookbook_items (id, lookbook_id, imageUrl, name, price) VALUES (?, ?, ?, ?, ?)',
                [uuidv4(), id, item.imageUrl, item.name, item.price]);
        }

        await db.run('COMMIT');

        res.json({ message: 'Lookbook atualizado com sucesso' });
    } catch (error) {
        await db.run('ROLLBACK');
        console.error('Update lookbook error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

app.delete('/api/lookbooks/:id', authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const db = await openDb();
        const lookbook = await db.get('SELECT * FROM lookbooks WHERE id = ? AND user_id = ?', [id, req.user.userId]);
        if (!lookbook) {
            return res.status(404).json({ error: 'Lookbook não encontrado ou não pertence a você' });
        }

        await db.run('DELETE FROM lookbooks WHERE id = ?', id);

        res.status(204).send();
    } catch (error) {
        console.error('Delete lookbook error:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

const startServer = async () => {
    try {
        await openDb();
        console.log("Database connection established and schema verified.");
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();
