const moongoose = require('mongoose')



module.exports = () => {
    const connectionsParams = {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    };
    try {
        moongoose.connect(process.env.DB, connectionsParams)
        console.log('connected to database')
    } catch (error) {
        console.log(error)
        console.log('could not connect to database')
    }
}