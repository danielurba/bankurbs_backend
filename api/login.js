module.exports = app => {
    const login = async (req, res) => {
        if(!req.body.email || !req.body.password) {
            return res.status(400).send('Informar Usuário e Senha !')
        }

        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
        
        if(!user) return res.status(400).send('Usuário não encontrado !')

        const isTrue = req.body.password === user.password
        if(!isTrue) return res.status(401).send('Email/Senha inválidos !')

        const store = {
            id: user.id,
            name: user.name,
            email: user.email,
            agencia: user.agencia,
            conta: user.conta,
            money: user.money
        }

        res.json({...store})
    }

    return { login }
}