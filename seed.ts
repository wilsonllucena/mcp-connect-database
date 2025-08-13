import sqlite3 from 'sqlite3';
import { faker } from '@faker-js/faker';

// Conectar ao banco de dados
const db = new sqlite3.Database('./mcp.sqlite');

// Função para criar a tabela clientes
function criarTabelaClientes(): Promise<void> {
  return new Promise((resolve, reject) => {
    const sql = `
      CREATE TABLE IF NOT EXISTS clientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        bairro TEXT,
        cidade TEXT,
        estado TEXT,
        cep TEXT,
        origem TEXT,
        ativo BOOLEAN DEFAULT 1,
        data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
        data_atualizacao DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    db.run(sql, (err) => {
      if (err) {
        console.error('Erro ao criar tabela clientes:', err.message);
        reject(err);
      } else {
        console.log('Tabela clientes criada com sucesso!');
        resolve();
      }
    });
  });
}

// Função para inserir um cliente
function inserirCliente(nome: string, email: string, ativo: boolean, bairro: string, cidade: string, estado: string, cep: string, origem: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO clientes (nome, email, ativo, data_criacao, bairro, cidade, estado, cep, origem)
      VALUES (?, ?, ?, datetime('now'), ?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [nome, email, ativo, bairro, cidade, estado, cep, origem], function(err) {
      if (err) {
        console.error('Erro ao inserir cliente:', err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// Função para inserir 50 clientes fake
async function inserir50ClientesFake(): Promise<void> {
  console.log('Inserindo 50 clientes fake...');
  
  for (let i = 0; i < 50; i++) {
    try {
      const nome = faker.person.fullName();
      const email = faker.internet.email().toLowerCase();
      const ativo = faker.datatype.boolean();
      const bairro = faker.location.street();
      const cidade = faker.helpers.arrayElement(['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília']);
      const estado = faker.helpers.arrayElement(['SP', 'RJ', 'MG', 'DF']);
      const cep = faker.location.zipCode();
      const origem = faker.helpers.arrayElement(['facebook', 'instagram', 'tiktok']);
      
      await inserirCliente(nome, email, ativo, bairro, cidade, estado, cep, origem);
      console.log(`Cliente ${i + 1}/50 inserido: ${nome}, ${email}, ${ativo}, ${bairro}, ${cidade}, ${estado}, ${cep}, ${origem}`);   
    } catch (error) {
      console.error(`Erro ao inserir cliente ${i + 1}:`, error);
    }
  }
  
  console.log('Todos os 50 clientes foram inseridos!');
}

// Função principal para executar o seed
async function executarSeed(): Promise<void> {
  try {
    console.log('Iniciando processo de seed...');
    
    // Criar tabela
    await criarTabelaClientes();
    
    // Inserir dados fake
    await inserir50ClientesFake();
    
    console.log('Seed executado com sucesso!');
  } catch (error) {
    console.error('Erro durante o seed:', error);
  } finally {
    // Fechar conexão com o banco
    db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco de dados:', err.message);
      } else {
        console.log('Conexão com banco de dados fechada.');
      }
    });
  }
}

// Executar o seed se o arquivo for chamado diretamente
if (require.main === module) {
  executarSeed();
}

export {
  criarTabelaClientes,
  inserirCliente,
  inserir50ClientesFake,
  executarSeed
};