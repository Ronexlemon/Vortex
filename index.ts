import express from "express"
import predicition from "./src/routes/prediction"
const App = express()
const port =  process.env.PORT as unknown as number || 3000
App.use(express.json())
App.use(express.urlencoded({ extended: true }))
App.use("/prediction", predicition)


    App.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        })