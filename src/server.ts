import express, { Request, Response } from 'express'
import productRouter from './routes/product.routes'

const app = express()

app.use(express.json())
app.use("/", productRouter)

app.use((req, res, next) => {
    res.status(404).send("404 Not Found")
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})