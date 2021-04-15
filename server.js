const express = require('express');// express라는 module을 사용하겠다.
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();// 함수로 실행, 변수에 담음

dotenv.config({ path: 'config.env' })
const PORT = process.env.PORT || 8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

// view engine 설정
app.set("view engine", "ejs");
// app.set('views', path.resolve(__dirname, 'views/ejs'));

// assets 로딩
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

//load routers
//라우터를 쓸거다. 라우터로 가기 위한 url은 '/'다.
app.use('/', require('./server/routes/router'));

// 이 포트로 귀를 기울이겠다.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})