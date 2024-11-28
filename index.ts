import express from "express"
import cors from "cors"
import predicition from "./src/routes/prediction"
import stake from "./src/routes/onchain"
const corsOptions = {
    origin: '*', // Allow all origins
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allow specified methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
    //credentials: true, // Allow credentials (optional)
  };
const App = express()
const port =  process.env.PORT as unknown as number || 3000
App.use(express.json())
App.use(cors(corsOptions)); // Apply CORS with the specified options
App.use(express.urlencoded({ extended: true }));
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