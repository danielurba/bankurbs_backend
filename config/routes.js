module.exports = app => {
    app.post('/login', app.api.login.login)
    app.post('/registerlogin', app.api.user.save)
    app.put('/update', app.api.user.update)
    app.post('/account', app.api.user.getAccount)
    app.get('/users',app.api.user.get)
    app.post('/delete',app.api.user.remove)
}