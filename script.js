/* 
В проекте используется большое количество обработчиков событий, я знаю про делегирование событий, однако не стал переделавыть уже готовы функционал под него
*/

const $btnClose = document.querySelector('.close');
const $btnClose2 = document.querySelector('.closING');
console.log($btnClose2)

const $wr = document.querySelector('[data-wr]')
var cnt = 0
let $buttonBoard = document.querySelector('.button_board')


const catInfo = 'https://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/show'
const catAdd = 'https://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/add'
const catDel = 'https://sb-cats.herokuapp.com/api/2//andrey-glazkov-frontend/delete/'
const cardAdd = 'https://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/add'
const cardEdit = 'https://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/update/'


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
                    'Content-Type': 'application/json',
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
    async CatEdit(catEditId) {
        try {
            const EditResponse = await fetch(`${this.baseUrl}/update/${catEditId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify(data),
            })
            // return console.log(JSON.stringify(data))
            if (EditResponse.status !== 200) {
                throw new Error()
            }
        } catch (error) {
            throw new Error(error)
        }
    }

    async CatShow(catEditId) {
        try {
            const EditResponse = await fetch(`${this.baseUrl}/show/${catEditId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

                // body: JSON.stringify(data),
            })
            // return console.log(JSON.stringify(data))
            if (EditResponse.status !== 200) {
                throw new Error()
            }
        } catch (error) {
            throw new Error(error)
        }
    }
}

const api = new API('https://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend')



// fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {


//        const postsHTML = json.data.map(post => cardGenerator(post)).join("")
//     //    $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });

const result = catRater()
const cardGenerator = (post) => {
    const newHTML = document.createElement('div');

    newHTML.innerHTML = `
    <div  class="card" data-card_id=${post.id}>
        <h3>${post.name}</h3>
        <img src="${post.img_link}" alt="${post.name}">
        <p>${post.description}</p>
        <p id="features__rate-box"></p>
        <div class="button_board">
        <button data-action="edit_cat">Edit</button>
        <button data-action="Show_cat">Show</button>
        </div>
        </div>

    `;
    // newHTML.innerHTML = `
    // <div class="col m12 l3 ng-tns-c40-0 ng-trigger ng-trigger-appear ng-star-inserted" style="">
    //             <div class="card" data-card_id=${post.id}>
    //                 <div class="card-image"><img class="ng-tns-c40-0"
    //                         src="${post.img_link}"><span
    //                         class="card-title"></span></div>
    //                 <div class="card-content">
    //                     <p class="ng-tns-c40-0">${post.description}
    //                     </p>
    //                 </div>
    //                 <div class="card-action"><button data-action="edit_cat">Edit</button>
    //                 <button data-action="Show_cat">Show</button>
    //                 </div>`

    $wr.append(newHTML);
}

// Новый обработчик для формы
// const CatEditor = (event) => {
//     event.preventDefault()

//     const data = Object.fromEntries(new FormData(event.target).entries())

//     data.name = data.Name
//     data.id = +data.id
//     data.rate = +data.rate
//     data.favorite = data.favorite === 'on'
//     api
//         .CatEdit(data, catId)
//         .then(() => {
//             $wr.insertAdjacentHTML('beforeend', generateHTMLTemplateForCat(data))
//             $modalsWr.classList.add('hidden')
//             event.target.reset()
//             addNewCatModal.closeModal()
//         })
//         .catch(alert)
// }


// $wr.addEventListener('click', (event) => {
//     console.log(event.target.dataset.action)
//     const $cardWr = event.target.closest('[data-card_id]')
//     const catId = $cardWr.dataset.card_id
//     form.classList.add('open2');
//     popup.classList.add('popup_open2');
//     $btnDel.classList.add('hidden');

// })



// протестировать попап через использоапния одного селктора с классои
const form2 = document.querySelector('#blablabla2');
const popup2 = document.querySelector('.popup2');
const cardOpen = document.querySelector('#blablabla3')
const popup3 = document.querySelector('.popup3');


$wr.addEventListener('click', (event) => {
    console.log(event.target.dataset.action)



    if (event.target.dataset.action == 'edit_cat') {
        form2.classList.add('open');
        popup2.classList.add('popup_open');

        const $cardWr = event.target.closest('[data-card_id]')
        const catId = $cardWr.dataset.card_id


        document.forms.edit_cat.addEventListener('submit', (event) => {
            event.preventDefault()

            const data = Object.fromEntries(new FormData(event.target).entries())
            data.description = data.description
            data.rate = +data.rate
            data.favorite = data.favorite === 'on'
            form2.classList.remove('open');
            popup2.classList.remove('popup_open');
            for (key in data) {
                if (data[key] == '') {
                    delete data[key]
                }

            }

            api.CatEdit(data, catId).then(() => {
                // cardGenerator(data)
                window.location.reload();
            }).catch(alert)

        })
    } else if (event.target.dataset.action == 'Show_cat') {
        cardOpen.classList.add('open');
        popup3.classList.add('popup_open');
        const $cardWr2 = event.target.closest('[data-card_id]')
        const catId2 = $cardWr2.dataset.card_id
        // api.CatShow(catId2).then((result) => {
        //     console.log(result)
        // }
        // )
        async function waitingFetch2() {
            const response = await fetch(`${catInfo}/${catId2}`);
            const json = await response.json();

            return json
        }


        waitingFetch2()

            .then((json) => {

                // const postsHTML = json.data.map(post => cardGenerator(post)).join("")
                const addCardHtml = json.data
                console.log(addCardHtml)
                catCardOpen(addCardHtml)
            });


    }
})

function catCardOpen(post) {
    const newHTML = document.createElement('div');

    newHTML.innerHTML = `
    <div data-cl class="card" data-card_id=${post.id}>
        <h3>${post.name}</h3>
        <img src="${post.img_link}" alt="${post.name}">
        <p>${post.description}</p>
        <p id="features__rate-box"></p>
        <div class="button_board">
        
        </div>
        </div>

    `;
    cardOpen.append(newHTML)
}
const clossing_card = document.querySelector('.clossing_card')
clossing_card.addEventListener('click', () => {
    cardOpen.classList.remove('open');
    popup3.classList.remove('popup_open');
    // const removable = document.querySelector('[data-cl]')
    cardOpen.innerHTML = ''


});
$btnClose2.addEventListener('click', () => {
    form2.classList.remove('open');
    popup2.classList.remove('popup_open');


});




// ДОРАБОТАТЬ ОЦЕНКУ на тест: вложить в функцию тело запроса
function catRater() {

    let rate = document.querySelectorAll('#features__rate-box')
    const catRating = `<i class="fa-solid fa-star"></i>`
    rate.forEach(element => {

        console.log(catRating.repeat(post.rate))
        rate.append(catRating.repeat(post.rate))
    });

}

async function waitingFetch() {
    const response = await fetch(catInfo);
    const json = await response.json();
    return json
}
// для теста, проверить меттод обавления карточки с семинара, посмотреть что получает html в результате, почему плывет верстка
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



button.addEventListener('click', () => {
    form.classList.add('open');
    popup.classList.add('popup_open');
    $btnDel.classList.add('hidden');
    cnt = 0
    inputHider()
});

$btnClose.addEventListener('click', () => {
    form.classList.remove('open');
    popup.classList.remove('popup_open');



});









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
                $btnDel.classList.add('hidden')

            })


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

const $btnDel = document.querySelector('.btn_delete')


function deleteButtonAdd() {

    // $buttonBoard.innerHTML += '<button class="btn_delete">Убрать котика</button>'
    // let addedButton = document.createElement('button')
    // addedButton.innerHTML = 'Убрать котика'
    // addedButton.classList.add('btn_delete')
    // $buttonBoard.append(addedButton)
    const $card = document.querySelectorAll('.card')
    $btnDel.classList.remove('hidden')
    $card.forEach(el => {
        el.innerHTML += `<input type="checkbox" class='delete'>`
    });

}

$btnDel.addEventListener('click', catsRemover)

$btnFind.addEventListener('click', e => {
    cnt++;
    console.log(cnt)
    if (cnt % 2 == 1) {
        deleteButtonAdd()


    } else {
        inputHider()
        $btnDel.classList.add('hidden')
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


document.forms.add_cat.addEventListener('submit', (event) => {
    event.preventDefault()

    const data = Object.fromEntries(new FormData(event.target).entries())
    data.name = data.Name
    data.description = data.description
    data.id = +data.id
    data.rate = +data.rate
    data.favorite = data.favorite === 'on'
    form.classList.remove('open');
    popup.classList.remove('popup_open');
    api.addCat(data).then(() => {
        cardGenerator(data)
    }).catch(alert)

})

console.log(document.forms.add_cat.name)

const $nameInput = document.forms.add_cat.name

const rawFormDataFromLS = localStorage.getItem(document.forms.add_cat.name)
const formDataFromLS = rawFormDataFromLS ? JSON.parse(rawFormDataFromLS) : undefined

if (formDataFromLS) {
    Object.keys(formDataFromLS).forEach(key => {
        document.forms.add_cat[key].value = formDataFromLS[key]
    })
}


document.forms.add_cat.addEventListener('input', (e) => {
    const formDataObj = Object.fromEntries(new FormData(document.forms.add_cat).entries())
    console.log({ formDataObj })
    localStorage.setItem(document.forms.add_cat.name, JSON.stringify(formDataObj))
})


// addNewCatModal.registerAdditionalActionOnOpen(() => {
// document.forms.add_cat.addEventListener('submit', submitAddCatFormHandler)
// })
// addNewCatModal.registerAdditionalActionOnClose(() => {
// document.forms.add_cat.removeEventListener('submit', submitAddCatFormHandler)
// })

//  fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {
//        const postsHTML = json.map(post => cardGenerator(post))
//        $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });





// 20 56 массовое удаление   сделать валидацию формы кнопки звездочки? поправить без пустых мест, разобраться с кнопкой докал сторадже для обновления айдишников