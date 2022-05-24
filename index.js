import express from 'express';
import configViewEngine from './src/configs/viewEngine';
import initialWebRoute from './src/router/web';
import initialApiRoute from './src/router/api';
import morgan from 'morgan';
import 'dotenv/config';


const app = express();
const port = process.env.PORT || 8080;
app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initialWebRoute(app);
initialApiRoute(app);

app.use((req, res)=>{
  return res.render('404.ejs');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});