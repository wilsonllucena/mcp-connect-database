import sqlite3 from 'sqlite3';
const _db = new sqlite3.Database('./mcp.sqlite'); // Corrigido para usar mcp.sqlite

type Cliente = {
  id: number;
  nome: string;  // Corrigido de 'name' para 'nome'
  email: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  ativo: boolean;
  origem?: string;
  data_criacao?: string; // Adicionado campo de data
  data_atualizacao?: string; // Adicionado campo de data
}

const listaClientes = `
  SELECT id, nome, email, bairro, cidade, estado, cep, ativo, origem, data_criacao, data_atualizacao
  FROM clientes
  ORDER BY data_criacao DESC;
`;

function listarClientes(): Promise<Cliente[]> {
  return new Promise((resolve, reject) => {
    _db.all(listaClientes, (err, rows: Cliente[]) => {
      if (err) {
        console.error('Erro ao listar clientes:', err.message);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

// Função adicional para buscar cliente por ID
function buscarClientePorId(id: number): Promise<Cliente | null> {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, nome, email, bairro, cidade, estado, cep, ativo, origem, data_criacao, data_atualizacao
      FROM clientes
      WHERE id = ?
    `;
    
    _db.get(sql, [id], (err, row: Cliente) => {
      if (err) {
        console.error('Erro ao buscar cliente:', err.message);
        reject(err);
      } else {
        resolve(row || null);
      }
    });
  });
}

function quantidadeClientes(): Promise<number> {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as quantidade
      FROM clientes
    `;
    
    _db.get(sql, [], (err, row: { quantidade: number }) => {
      if (err) {
        console.error('Erro ao contar usuários:', err.message);
        reject(err);
      } else {
        resolve(row.quantidade || 0);
      }
    });
  });
} 

function buscarClientesPorOrigem(origem: string): Promise<Cliente[]> {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, nome, email, bairro, cidade, estado, cep, ativo, origem, data_criacao, data_atualizacao
      FROM clientes
      WHERE origem = ? and ativo = 1
      ORDER BY nome ASC
    `;
    
    _db.all(sql, [origem], (err, rows: Cliente[]) => {
      if (err) {
        console.error('Erro ao buscar clientes por origem:', err.message);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

function quantidadeClientesAtivosPorOrigem(origem: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT COUNT(*) as quantidade
      FROM clientes
      WHERE origem = ? AND ativo = 1
    `;
    
    _db.get(sql, [origem], (err, row: { quantidade: number }) => {
      if (err) {
        console.error('Erro ao contar clientes ativos por origem:', err.message);
        reject(err);
      } else {
        resolve(row.quantidade || 0);
      }
    });
  });
}

interface MetricasClientes {
  totalClientes: number;
  clientesAtivos: number;
  clientesPorOrigem: { origem: string; quantidade: number }[];
  crescimentoMensal: { mes: string; quantidade: number }[];
}

function obterMetricasClientes(): Promise<MetricasClientes> {
  return new Promise((resolve, reject) => {
    const sqlTotal = `SELECT COUNT(*) as total FROM clientes`;
    const sqlAtivos = `SELECT COUNT(*) as ativos FROM clientes WHERE ativo = 1`;
    const sqlPorOrigem = `
      SELECT origem, COUNT(*) as quantidade 
      FROM clientes 
      WHERE origem IS NOT NULL 
      GROUP BY origem`;
    const sqlCrescimento = `
      SELECT 
        strftime('%Y-%m', data_criacao) as mes,
        COUNT(*) as quantidade
      FROM clientes
      WHERE data_criacao IS NOT NULL
      GROUP BY strftime('%Y-%m', data_criacao)
      ORDER BY mes DESC
      LIMIT 12`;

    Promise.all([
      new Promise((res, rej) => _db.get(sqlTotal, [], (err, row: { total: number }) => err ? rej(err) : res(row.total))),
      new Promise((res, rej) => _db.get(sqlAtivos, [], (err, row: { ativos: number }) => err ? rej(err) : res(row.ativos))),
      new Promise((res, rej) => _db.all(sqlPorOrigem, [], (err, rows) => err ? rej(err) : res(rows))),
      new Promise((res, rej) => _db.all(sqlCrescimento, [], (err, rows) => err ? rej(err) : res(rows)))
    ])
    .then(([total, ativos, porOrigem, crescimento]) => {
      resolve({
        totalClientes: total as number,
        clientesAtivos: ativos as number, 
        clientesPorOrigem: porOrigem as { origem: string; quantidade: number }[],
        crescimentoMensal: crescimento as { mes: string; quantidade: number }[]
      });
    })
    .catch(err => {
      console.error('Erro ao obter métricas:', err.message);
      reject(err);
    });
  });
}

export {
  listarClientes,
  buscarClientePorId,
  quantidadeClientes,
  buscarClientesPorOrigem,
  quantidadeClientesAtivosPorOrigem,
  obterMetricasClientes,
  Cliente
}
