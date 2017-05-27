let app = require('./Config/ExpressConfig');


app.listen(process.env.PORT, () => {
    console.log("NodeJS server is ready to go on port ", process.env.PORT)
})