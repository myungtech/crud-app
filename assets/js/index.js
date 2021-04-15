
// 사용자 추가
$("#add_user").submit(function (event) {
    alert('data success!!');
})

// 사용자 업데이트
$("#update_user").submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    })

    console.log(data);
    var request = {
        "url": `http://localhost:3000/api/users/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("데이터 업데이트가 성공 !!");
    })

})

// 사용자 제거
if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/users/${id}`,
            "method": "DELETE"
        }
        if (confirm("정말로 삭제하시겠습니까?")) {
            $.ajax(request).done(function (response) {
                alert("데이터 삭제가 성공 !!");
                location.reload();
            })
        }

    })
}