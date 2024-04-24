const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3003;

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harrypotter',
  password: 'ds564',
  port: 5432, // ou 7007
});

// Middleware para processar JSON
app.use(express.json());

// Rota para criar um novo bruxo
app.post('/bruxos', async (req, res) => {
  const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
  const query = 'INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [nome, idade, casa, habilidade, status_sangue, patrono];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar bruxo:', err);
    res.status(500).send('Erro ao criar bruxo');
  }
});

// Rota para obter todos os bruxos
app.get('/bruxos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bruxos');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao obter bruxos:', err);
    res.status(500).send('Erro ao obter bruxos');
  }
});

// Rota para atualizar um bruxo existente
app.put('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
  const query = 'UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade=$4, status_sangue=$5, patrono=$6 WHERE id=$7';
  const values = [nome, idade, casa, habilidade, status_sangue, patrono, id];

  try {
    await pool.query(query, values);
    res.send('Bruxo atualizado com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar bruxo:', err);
    res.status(500).send('Erro ao atualizar bruxo');
  }
});

// Rota para deletar um bruxo existente
app.delete('/bruxos/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM bruxos WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Bruxo deletado com sucesso');
  } catch (err) {
    console.error('Erro ao deletar bruxo:', err);
    res.status(500).send('Erro ao deletar bruxo');
  }
});

// Rota para criar uma nova varinha
app.post('/varinhas', async (req, res) => {
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [material, comprimento, nucleo, data_fabricacao];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar varinha:', err);
    res.status(500).send('Erro ao criar varinha');
  }
});

// Rota para obter todas as varinhas
app.get('/varinhas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varinhas');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao obter varinhas:', err);
    res.status(500).send('Erro ao obter varinhas');
  }
});

// Rota para atualizar uma varinha existente
app.put('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const { material, comprimento, nucleo, data_fabricacao } = req.body;
  const query = 'UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5';
  const values = [material, comprimento, nucleo, data_fabricacao, id];

  try {
    await pool.query(query, values);
    res.send('Varinha atualizada com sucesso');
  } catch (err) {
    console.error('Erro ao atualizar varinha:', err);
    res.status(500).send('Erro ao atualizar varinha');
  }
});

// Rota para deletar uma varinha existente
app.delete('/varinhas/:id', async (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM varinhas WHERE id=$1';

  try {
    await pool.query(query, [id]);
    res.send('Varinha deletada com sucesso');
  } catch (err) {
    console.error('Erro ao deletar varinha:', err);
    res.status(500).send('Erro ao deletar varinha');
  }
});

// Rota de teste que retorna uma frase aleatória do filme Harry Potter ou um feitiço
app.get('/', async (req, res) => {
    const frases = [
      "Nitwit! Blubber! Oddment! Tweak!",
      "Wingardium Leviosa!",
      "Expecto Patronum!",
      "Expelliarmus!",
      "Accio!",
      "Alohomora!",
      "Imperio!",
      "Crucio!",
      "Avada Kedavra!",
      "Lumos!",
      "Nox!",
      "Incendio!",
      "Aguamenti!",
      "Protego!",
      "Riddikulus!",
      // Adicione mais feitiços conforme desejado
    ];
  
    const randomIndex = Math.floor(Math.random() * frases.length);
    const randomPhrase = frases[randomIndex];
    res.send("Harry Potter lançou sobre você o feitiço: " + randomPhrase);
  });



// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}🧙🪄✨`);
});
