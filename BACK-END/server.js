const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config(); // Carrega variáveis de ambiente localmente

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// CONFIGURAÇÃO DO POSTGRES (Usa variáveis de ambiente ou os dados do Aiven)
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para bancos de dados em nuvem como Aiven/Render
    }
});

app.get('/', (req, res) => {
    res.send('Servidor VAPE EXPRESS está ON!');
});

app.post('/signup', async (req, res) => {
    const { full_name, email, password, dob, receive_marketing, accept_cookies, profile_picture } = req.body;

    try {
        const query = `
      INSERT INTO users (full_name, email, password, date_of_birth, receive_marketing, accept_cookies, profile_picture)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

        const values = [full_name, email, password, dob, receive_marketing, accept_cookies, profile_picture];
        const result = await pool.query(query, values);

        res.status(201).json({ message: "Usuário criado!", user: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no banco: " + err.message });
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
        const result = await pool.query(query, [email, password]);

        if (result.rows.length > 0) {
            res.status(200).json({ message: "Login realizado!", user: result.rows[0] });
        } else {
            res.status(401).json({ error: "Email ou senha incorretos." });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro no servidor." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));