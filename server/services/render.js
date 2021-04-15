const axios = require('axios');

// home화면 render
exports.homeRoutes = (req, res) => {

    // GET 요청 api/users 생성
    axios.get('http://localhost:3000/api/users')
        .then(function (response) {
            // console.log(response.data);
            res.render('index', { users: response.data });
        })
        .catch(err => {
            res.send(err);
        })

    // res.render('index', { users: "새로운 데이터" });
}

// 사용자 추가 render부분
exports.add_user = (req, res) => {
    res.render('add_user');
}

// 업데이트 할 유저 render
exports.update_user = (req, res) => {
    axios.get('http://localhost:3000/api/users'
        , { params: { id: req.query.id } })
        .then(function (userdata) {
            res.render("update_user", { user: userdata.data })
        })
        .catch(err => {
            res.send(err);
        })
}