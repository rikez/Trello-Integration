module.exports = (app) => {

    function UserController() {

        this.userService = new app.App.Services.UserService();

        this.save = (req, res) => { 
            this.userService.save(req.body).then(result => {
                res.json(result);
            }).catch(err => {
                res.status(500).json(err);
            })
        }

    }

    return UserController;
}