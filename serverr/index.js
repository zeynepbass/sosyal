import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import postRoutes from './routes/post.js'
const app=express();
app.use(cors())
app.use(bodyParser.json({limit:"30mb"}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))//en fazla 30 mb resım yolluyoru.//sifrelenmıslerde de body parser kullandık

const MONGO_URI="mongodb+srv://zeynep:12345678n@clustersosyal.ebell11.mongodb.net/SosyalMedya?retryWrites=true&w=majority"
const PORT=process.env.PORT || 2049;
app.use('/posts',postRoutes)

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Veritabanı bağlantısı başarılı bir sekilde Server ${PORT} çalışıyor`)
    })

})
.catch(err=>{
    console.log(err);
})
