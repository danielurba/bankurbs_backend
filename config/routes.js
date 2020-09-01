module.exports = app => {
    app.post('/login', app.api.login.login)
    app.post('/registerlogin', app.api.user.save)
    app.put('/update', app.api.user.save)
    app.post('/account', app.api.user.getAccount)
    app.route('/users')
        .get(app.api.user.get)
    
    app.route('/users/:id')
        .delete(app.api.user.remove)
}