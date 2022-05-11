$(document).ready(function () {

    const fetchUsers = () => {
        return $.get('http://kremallive.temp.swtest.ru/server/vendor/all.php').then(function (data) {
            console.log(data);

            data.forEach(data => {
                $('tbody').append(`
             <tr rowId="${data.id}">
              <td>
                <div class="titleWrapper lastName show">${data.lastName}</div>
                <div class="updateInputWrapper hide"><input type="text" name="lastName" value="${data.lastName}"></div>
              </td>
              <td>
                <div class="titleWrapper firstName show">${data.firstName}</div>
                <div class="updateInputWrapper hide"><input type="text" name="firstName" value="${data.firstName}"></div>                
               </td>
              <td>
                <div class="titleWrapper patronymic show">${data.patronymic}</div>
                <div class="updateInputWrapper hide"><input type="text" name="patronymic" value="${data.patronymic}"></div>
              </td>
              <td class="updateTd btnTd">
                <div class="updatedWrapper btn_div show">
                    <button class="update" id="${data.id}">Редактировать</button>
                </div>
                <div class="updateDoneWrapper btn_div hide">
                    <button class="sendUpdate" id="${data.id}">Применить</button>
                </div>
              </td>
              <td class="deleteTd btnTd">
                <div class="deleteBtnDiv show">
                    <button class="delete" id="${data.id}">Удалить</button>
                </div>
                <div class="cancelBtnDiv hide">
                    <button class="cancel" id="${data.id}">Отменить</button>
                </div>
              </td>
        </tr>
        `)

            });

        });
    }

    const deleteUser = (id) => {
        $.ajax({
            url: 'http://kremallive.temp.swtest.ru/server/vendor/delete.php',
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({"id": id}),
            success: function (result) {
                console.log(JSON.stringify({"id": id}))
                $(`.table tr[rowId = ${id}]`).remove()
            },
            error: function (request, msg, error) {
                console.log(error)
            }
        });
        console.log(id)
    }

    const createUser = (firstName, lastName, patronymic) => {
        $.ajax({
            url: 'http://kremallive.temp.swtest.ru/server/vendor/create.php',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({"firstName": firstName, "lastName": lastName, "patronymic": patronymic}),
            success: function (result) {
                $('#firstName').val('')
                $('#lastName').val('')
                $('#patronymic').val('')
                console.log(result)
                $('tbody').append(`
                    <tr rowId="${result.id}">
                      <td>
                        <div class="titleWrapper lastName show">${lastName}</div>
                        <div class="updateInputWrapper hide"><input type="text" name="lastName" value="${lastName}"></div>
                      </td>
                      <td>
                        <div class="titleWrapper firstName show">${firstName}</div>
                        <div class="updateInputWrapper hide"><input type="text" name="firstName" value="${firstName}"></div>                
                       </td>
                      <td>
                        <div class="titleWrapper patronymic show">${patronymic}</div>
                        <div class="updateInputWrapper hide"><input type="text" name="patronymic" value="${patronymic}"></div>
                      </td>
                      <td class="updateTd btnTd">
                        <div class="updatedWrapper show">
                            <button class="update" id="${result.id}">Редактировать</button>
                        </div>
                        <div class="updateDoneWrapper hide">
                            <button class="sendUpdate" id="${result.id}">Применить</button>
                        </div>
                      </td>
                      <td class="deleteTd btnTd">
                        <div class="deleteBtnDiv show">
                            <button class="delete" id="${result.id}">Удалить</button>
                        </div>
                        <div class="cancelBtnDiv hide">
                            <button class="cancel" id="${result.id}">Отменить</button>
                        </div>
                      </td>
                    </tr>
        `)
            },
            error: function (request, msg, error) {
                alert(request?.responseJSON.message)
            }
        });
    }

    const updateUser = ({id, firstName, lastName, patronymic}) => {
        $.ajax({
            url: 'http://kremallive.temp.swtest.ru/server/vendor/update.php',
            method: 'UPDATE',
            contentType: 'application/json',
            data: JSON.stringify({"id" : id ,"firstName": firstName, "lastName": lastName, "patronymic": patronymic}),
            success: function (result) {

                $(`tr[rowId = ${id}] div.firstName`).text(firstName)
                $(`tr[rowId = ${id}] div.lastName`).text(lastName)
                $(`tr[rowId = ${id}] div.patronymic`).text(patronymic)


                $(`tr[rowId = ${id}] div.titleWrapper`).toggleClass('show hide')
                $(`tr[rowId = ${id}] div.updateInputWrapper`).toggleClass('hide show')
                $(`tr[rowId = ${id}] td.updateTd div.updatedWrapper`).toggleClass('show hide')
                $(`tr[rowId = ${id}] td.updateTd div.updateDoneWrapper`).toggleClass('hide show')
            },
            error: function (request, msg, error) {
                alert(request?.responseJSON.message)
            }
        });
    }

    fetchUsers()

    $(document).on('click', '.update', function () {
        const id = $(this).prop('id')
        console.log(id)
        $(`tr[rowId = ${id}] div.titleWrapper`).toggleClass('show hide')
        $(`tr[rowId = ${id}] div.updateInputWrapper`).toggleClass('hide show')
        $(`tr[rowId = ${id}] td.updateTd div.updatedWrapper`).toggleClass('show hide')
        $(`tr[rowId = ${id}] td.updateTd div.updateDoneWrapper`).toggleClass('hide show')
        $(`tr[rowId = ${id}] td.deleteTd div.deleteBtnDiv`).toggleClass('show hide')
        $(`tr[rowId = ${id}] td.deleteTd div.cancelBtnDiv`).toggleClass('hide show')
    })

    $(document).on('click', '.sendUpdate', function () {
        const id = $(this).prop('id')
        const firstName = $(`tr[rowId = ${id}] input[name = firstName]`).val().trim()
        const lastName = $(`tr[rowId = ${id}] input[name = lastName]`).val().trim()
        const patronymic = $(`tr[rowId = ${id}] input[name = patronymic]`).val().trim()
        if (!!firstName && !!lastName && !!patronymic) {
            updateUser({id, firstName, lastName, patronymic})
        } else {
            alert('Все поля должны быть заполены')
        }
    })

    $(document).on('click', '.delete', function () {
        console.log($(this).prop('id'))
        deleteUser($(this).prop('id'))
    })

    $(document).on('click', '.cancel', function () {
        const id = $(this).prop('id')
        $(`tr[rowId = ${id}] div.titleWrapper`).toggleClass('show hide')
        $(`tr[rowId = ${id}] div.updateInputWrapper`).toggleClass('hide show')
        $(`tr[rowId = ${id}] td.updateTd div.updatedWrapper`).toggleClass('show hide')
        $(`tr[rowId = ${id}] td.updateTd div.updateDoneWrapper`).toggleClass('hide show')
        $(`tr[rowId = ${id}] td.deleteTd div.deleteBtnDiv`).toggleClass('hide show')
        $(`tr[rowId = ${id}] td.deleteTd div.cancelBtnDiv`).toggleClass('show hide')
    })

    $('.form1').submit(function (e) {
        e.preventDefault()
        const firstName = $('#firstName').val().trim()
        const lastName = $('#lastName').val().trim()
        const patronymic = $('#patronymic').val().trim()

        if (!!firstName && !!lastName && !!patronymic) {
            createUser(firstName, lastName, patronymic)
            console.log({firstName, lastName, patronymic})
        } else {
            alert('Все поля должны быть заполены')
        }
    })


})

