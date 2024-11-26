import express from "express"
import predicition from "./src/routes/prediction"
import stake from "./src/routes/onchain"
const App = express()
const port =  process.env.PORT as unknown as number || 3000
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use("/api/prediction", predicition)
App.use("/api/stake", stake)
App.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});



    App.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        })