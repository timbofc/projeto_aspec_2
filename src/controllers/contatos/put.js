const { updatecontatos } = require('../../repositories/contatos-repository.js')

async function put(req, res) {
	try {
		const { id } = req.params
		const { name, email, phone, category_id} = req.body

		if (!name || !email || !phone) {
			return res.status(400).json({ error: 'Nome, email e telefone são obrigatórios.' })
		}

		const result = await updatecontatos({name, email, phone, category_id, id})
		if (!result) {
			return res.status(400).json({error: 'Contato não identificado.'})
		}
		console.log('Contato editado com sucesso.')
		console.log(result)
		res.status(200).json(result)
	} catch (error) {
		console.error('Erro ao atualizar registro:', error)
		res.status(500).json({ error: 'Erro ao atualizar registro' })
	}
}

module.exports = put