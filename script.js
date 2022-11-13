

 const $wr = document.querySelector('[data-wr]')
 var cnt = 0



const catInfo = 'http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/show'
const catAdd = 'http://sb-cats.herokuapp.com/api/2/andrey-glazkov-frontend/add'

// fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {

   
//        const postsHTML = json.data.map(post => cardGenerator(post)).join("")
//     //    $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });
const cardGenerator = (post) => {
    const newHTML = document.createElement('div');
    newHTML.innerHTML = `
    <div  class="card">
        <h3>${post.name}</h3>
        <img src="${post.img_link}" alt="">
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

async function render(){
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

$btnClose.addEventListener('click', ()=> {
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

const $btnDel = document.querySelector('.btn_delete')
const $btnFind = document.querySelector('.btn_find')


 function catsFinder() {

    $card.forEach(el => {
        el.innerHTML += `<input type="checkbox" class='delete'>`
    });
 }
 function catsRemover () {
    let $chbox = document.querySelectorAll('.delete')
    $chbox.forEach(el => {
    if (el.checked)
    { let deleteable = el.parentNode
        el.parentElement.remove()
        el.remove()
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

$btnFind.addEventListener('click', e => {
    cnt++;
    if (cnt%2 == 1) {
        const $card = document.querySelectorAll('.card')
        console.log($card)
        $card.forEach(el => {
            el.innerHTML += `<input type="checkbox" class='delete'>`
        });
    } else {
        inputHider()
    }
})

 $btnDel.addEventListener('click',catsRemover)

//  fetch(catInfo)
//  .then((response) => response.json())
//  .then((json) => {
//        const postsHTML = json.map(post => cardGenerator(post))
//        $wr.insertAdjacentHTML('beforeend', postsHTML)
//    });



