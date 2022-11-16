

const $wr = document.querySelector('[data-wr]')
var cnt = 0
let $buttonBoard = document.querySelector('.button_board')


const catInfo = 'http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/show'
const catAdd = 'http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/add'
const catDel = 'http://sb-cats.herokuapp.com/api/2//andrey-glazkov-frontend/delete/'
const cardAdd = 'http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/add'

async function deleteCat(id) {
    try {
        const deleteResponse = await fetch(`${catDel}${id}`, {
            method: 'DELETE',
        })

        if (deleteResponse.status !== 200) {
            throw new Error()
        }
    } catch (error) {
        throw new Error(error)
    }
}

async function catAdder(catCardInfo) {
    try {
        const addResponse = await fetch(cardAdd, {
            method: 'POST',
            headers: {
                'Content-type': 'aplication/json',
            },
            body: JSON.stringify(catCardInfo),
        })
        if (addResponse.status !== 200) {
            throw new Error()
        }
    } catch (error) {
        throw new Error(error)
    }
}

class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }


    async addCat(data) {
        try {
            const response = await fetch(`${this.baseUrl}/add`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.status !== 200) {
                throw new Error()
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}


// fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {


//        const postsHTML = json.data.map(post => cardGenerator(post)).join("")
//     //    $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });
const cardGenerator = (post) => {
    const newHTML = document.createElement('div');
    newHTML.innerHTML = `
    <div  class="card" data-card_id=${post.id}>
        <h3>${post.name}</h3>
        <img src="${post.img_link}" alt="${post.name}">
        <p>${post.description}</p>
        <p id="features__rate-box"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></p>
    `;
    $wr.append(newHTML);

}


async function waitingFetch() {
    const response = await fetch(catInfo);
    const json = await response.json();
    return json
}

async function render() {
    waitingFetch()

        .then((json) => {

            const postsHTML = json.data.map(post => cardGenerator(post)).join("")

        });

}
render()
const button = document.querySelector('button');
const form = document.querySelector('#blablabla');
const popup = document.querySelector('.popup');
const $btnClose = document.querySelector('.close');


button.addEventListener('click', () => {
    form.classList.add('open');
    popup.classList.add('popup_open');
});

$btnClose.addEventListener('click', () => {
    form.classList.remove('open');
    popup.classList.remove('popup_open');


});





// fetch(catAdd, {
//   method: "post",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },


//   body: JSON.stringify({
//     id
//     name: myName,
//     password: myPassword
//     // id (обязательное поле) — число
// // age — число
// // name (обязательное поле) — строка
// // rate — число от 1 до 10
// // description — строка
// // favourite — логическое значение true или false
// // img_link — строка. Ссылка на картинку
//   })
// })
// .then( (response) => { 
//    //do something awesome that makes the world a better place
// });

// fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {


//        const postsHTML = json.data.map(post => cardGenerator(post)).join("")
//     //    $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });



// const cardGenerator = (post) => {
//     return `
//    
// </div>
//     `
// }




// const $card = document.querySelectorAll('.card')


const $btnFind = document.querySelector('.btn_find')


function catsFinder() {

    $card.forEach(el => {
        el.innerHTML += `<input type="checkbox" class='delete'>`
    });
}



function catsRemover() {

    let $chbox = document.querySelectorAll('.delete')
    $chbox.forEach((el) => {
        if (el.checked) {
            // let deleteable = el.parentNode
            // el.parentElement.remove()
            // console.log(event.target.dataset.action)
            // let deletableId = event.target.closest('[data-card_id]')
            let catId = el.parentElement.dataset.card_id
            // console.log(deletableId)
            cnt = 0
            deleteCat(catId).then(() => {
                el.parentElement.remove()

            })
            $buttonBoard.lastElementChild.remove()
        } else {
            el.remove()
        }
    });
}

function inputHider() {

    let $chbox = document.querySelectorAll('.delete')
    $chbox.forEach(el => {
        el.remove()
    });
}


// $btnFind.addEventListener('click', e => {
//     cnt++;
//     if (cnt%2 == 1) {
//         catsFinder()
//     } else {
//         inputHider()
//     }
// })



function deleteButtonAdd() {

    // $buttonBoard.innerHTML += '<button class="btn_delete">Убрать котика</button>'
    let addedButton = document.createElement('button')
    addedButton.innerHTML = 'Убрать котика'
    addedButton.classList.add('btn_delete')
    $buttonBoard.append(addedButton)
    const $card = document.querySelectorAll('.card')
    const $btnDel = document.querySelector('.btn_delete')
    $btnDel.addEventListener('click', catsRemover)
    $card.forEach(el => {
        el.innerHTML += `<input type="checkbox" class='delete'>`
    });

}

$btnFind.addEventListener('click', e => {
    cnt++;
    console.log(cnt)
    if (cnt % 2 == 1) {
        deleteButtonAdd()


    } else {
        inputHider()
        $buttonBoard.lastElementChild.remove()
    }

})


// document.forms.add_cat.addEventListener('submit', (event) => {
//     event.preventDefault()

//     const data = Object.fromEntries(new FormData(event.target).entries())

//     data.id = +data.id
//     data.rate = +data.rate
//     data.favorite = data.favorite === 'on'
//     console.log(data)
//     catAdder(data).then(() => {
//         cardGenerator(data)

//     }).catch(alert)
// })

const api = new API('http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend')
document.forms.add_cat.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target).entries())
    data.name = data.Name
    data.id = +data.id
    data.rate = +data.rate
    data.favorite = data.favorite === 'on'
    form.classList.remove('open');
    popup.classList.remove('popup_open');
    api.addCat(data).then(() => {
        cardGenerator(data)
    }).catch(alert)

})

//  fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {
//        const postsHTML = json.map(post => cardGenerator(post))
//        $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });



// 20 56 массовое удаление   сделать валидацию формы кнопки звездочки? поправить без пустых мест, разобраться с кнопкой