
module.exports = app => {
    const save = (req, res) => {
        const user = { ...req.body }
        if(user.agencia && user.conta) {
            app.db('users')
            .update(user)
            .where({ agencia: user.agencia, conta: user.conta})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else if(user.conta) {
            app.db('users')
            .update(user)
            .where({ conta: user.conta})
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
            .insert(user)
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
        app.db('users')
            .select('money')
            .where({ agencia: user.agencia, conta: user.conta})
            .first()
            .then(users => res.json(users))
            .catch(err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .del()
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }
    
    return { save, get, getAccount, remove }
}