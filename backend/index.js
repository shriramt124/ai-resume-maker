import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import express from "express"

const app = express();


app.use(cors({
    origin:"*"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


 







const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
