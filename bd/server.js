const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ciudadanos_db'
});

db.connect(err => {
    if (err) console.error('❌ Error MySQL:', err);
    else console.log('✅ Conectado a MySQL');
});

// ===========================================================
// REGISTRO (CORREGIDO)
// ===========================================================
app.post('/auth/register', (req, res) => {
    const { name, email, password, city } = req.body;

    if (!name || !email || !password || !city)
        return res.status(400).json({ message: 'Faltan datos' });

    // Insertar usuario
    const sql = 'INSERT INTO users (name, email, password, city) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, email, password, city], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        // Obtener usuario recién creado
        db.query('SELECT * FROM users WHERE id = ?', [result.insertId], (err2, rows) => {
            if (err2) return res.status(500).json({ error: err2.message });
            res.status(201).json(rows[0]);
        });
    });
});

// LOGIN
app.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';

    db.query(sql, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Credenciales inválidas' });

        res.json(results[0]);
    });
});

// OBTENER REPORTES
app.get('/reports', (req, res) => {
    const sql = `
        SELECT r.*, u.name as userName 
        FROM reports r 
        JOIN users u ON r.user_id = u.id 
        ORDER BY r.created_at DESC
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// CREAR REPORTE
app.post('/reports', (req, res) => {
    const { userId, title, problem, location, imageUrl } = req.body;

    const sql = 'INSERT INTO reports (user_id, title, problem, location, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [userId, title, problem, location, imageUrl], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Reporte creado' });
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor listo en puerto ${PORT}`);
});
