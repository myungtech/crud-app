var Userdb = require('../model/model');

// *** 새로운 사용자 생성 및 저장
exports.create = (req, res) => {
    // 요청 승인
    if (!req.body) {
        res.status(400).send({ message: "내용이 없습니다!!" })
        return;
    }
    //새로운 사용자 
    //post방식은 body로 값 전달
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    })

    // mongo 데이터베이스에 사용자 저장
    user
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/')
            // res.redirect('/add-user')
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "생성 작업동안 오류 발생!!"
            });
        });
}

// *** 모든 사용자 검색 및 반환/단일 사용자 검색 및 반환
exports.find = (req, res) => {

    if (req.query.id) {
        const id = req.query.id;
        Userdb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: "해당 사용자를 찾을 수 없습니다. id = " + id
                    })
                } else {
                    res.send(data)
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "id를 가진 사용자 검색 오류! id = " + id
                })
            })
    } else {
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "사용자 정보를 검색하는 동안 오류가 발생하였습니다!"
                });
            })
    }

}
// *** 사용자 ID별로 새 식별 사용자를 업데이트
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "업데이트할 데이터가 없습니다.!" })

    }
    const id = req.params.id;
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res
                    .status(404)
                    .send({ message: `${id}로 사용자 update가 불가능합니다. 사용자를 찾을수 없습니다!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "사용자 정보 업데이트 오류!!" })
        })
}

// *** 요청에 지정된 사용자 ID를 가진 사용자를 삭제
exports.delete = (req, res) => {
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res
                    .status(404)
                    .send({ message: `${id} id를 삭제할 수 없습니다. 아이디를 확인해주세요!` })
            } else {
                res.send({
                    message: "사용자가 성공적으로 삭제되었습니다!"
                })
            }
        }).catch(err => {
            res.status(500).send({
                message: "사용자를 삭제할 수 없습니다. id = " + id
            });
        });
}