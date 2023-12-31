const { query } = require('../database')

async function showContatos(filters) {
	// Construa a consulta SQL com base no parâmetro 'name'
	const { name } = filters

	let sql = 'SELECT * FROM contatos'

	if (!name) {
		sql += ' ORDER BY id'
	}

	if (name) {
		sql += ' WHERE name LIKE $1'
	}

	// Execute a consulta SQL e passe o parâmetro seguro
	const contatos = await query(sql, name ? [`%${name}%`] : [])

	return contatos
}

async function createContatos(name, email, phone, category_id) {
	const obj = {
		text: 'INSERT INTO contatos (name, email, phone, category_id) VALUES ($1, $2, $3, $4) RETURNING *',
		values: [name, email, phone, category_id]
	}

	const [contatoCriado] = await query(obj)

	return contatoCriado
}

async function updatecontatos(contato) {
	const { name, email, phone, category_id, id } = contato

	const sql = {
		text: 'UPDATE contatos SET name = $1, email = $2, phone = $3, category_id = $4 WHERE id = $5 RETURNING *',
		values: [name, email, phone, category_id, id],
	}
	const [atualizarcontatos] = await query(sql)

	return atualizarcontatos
}

// delete contatos
async function deletecontatos(id) {
	const sql = {
		text: 'DELETE FROM contatos WHERE id = $1 RETURNING *',
		values: [id],
	}

	const [deletarcontatos] = await query(sql)

	return deletarcontatos
}

module.exports = {
	showContatos,
	createContatos,
	deletecontatos,
	updatecontatos,
}
