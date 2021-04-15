const mongoose = require('mongoose');

// 스키마 세팅 데이터베이스의 구조와 제약 조건에 관한 전반적인 명세
var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true // 필수값
    },
    email: {
        type: String,
        required: true, // 필수값
        unique: true
    },
    gender: String,
    status: String
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;