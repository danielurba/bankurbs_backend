
module.exports = app => {
    const save = async (req, res) => {
        const user = { ...req.body }
        if(!user.name || !user.email) return res.status(400).send('Informar Nome/Email')
        if(!user.password) return res.status(400).send('Informe uma senha !')
        
        const userDb = await app.db('users')
        .where({ agencia: user.agencia, conta: user.conta })
        .first()
        
        const emailTrue = await app.db('users')
        .where({ email: user.email })
        .first()
        
        if(emailTrue) return res.status(400).send('Email já esta cadastrado !')
        
        if(!userDb) {
            user.name = user.name.charAt(0).toUpperCase() + user.name.slice(1)
            app.db('users')
            .insert(user)
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }

        if(userDb) {
            app.db('users')
            .update(user)
            .where({ agencia: user.agencia, conta: user.conta})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const update = (req, res) => {
        const user = { ...req.body }

        if(user.money === 'NaN') return res.status(400).send('Informe somente números !')
        if(user.conta) {
            app.db('users')
            .update(user)
            .where({ conta: user.conta})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'email', 'agencia', 'conta', 'money')
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const getAccount = (req, res) => {
        const user = { ...req.body }
        if(!user.agencia) return res.status(400).send('Informe a agência !')
        if(!user.conta) return res.status(400).send('Informe a conta !')
        app.db('users')
            .select('money')
            .where({ agencia: user.agencia, conta: user.conta})
            .first()
            .then(users => res.json(users))
            .catch(_ => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const user = { ...req.body }
        if(!user.email || !user.password) return res.status(400).send('Informe usuário/senha !')
        
        const getUser = await app.db('users')
            .where({ email: user.email, password: user.password})
            .first()
        
        if(getUser === undefined) return res.status(400).send('Senha não confere !')
        if(getUser.email === user.email && getUser.password === user.password) {
            app.db('users')
                .where({ email: user.email, password: user.password })
                .del()
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }
    
    return { save, get, update, getAccount, remove }
}