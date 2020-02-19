
const myList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');


function getFruit(doc){

    let li = document.createElement('li');
    let name = document.createElement('span');
    let quantity = document.createElement('span');
    let cross = document.createElement('div');


    li.setAttribute('data-id', doc.id);
    name.textContent= doc.data().name;
    quantity.textContent= doc.data().quantity;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(quantity);
    li.appendChild(cross);

    myList.appendChild(li);


    //Deleting Data
    cross.addEventListener('click', (e) =>{

        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('Shop').doc(id).delete();
    })

}



//Getting data from Firebase database (We used instead a Real-time listener below)
//db.collection('Shop').get().then((snapshot) => {
//    snapshot.forEach(doc => {
//        getFruit(doc);
//    });
//})



//Saving data in the Firebase
form.addEventListener('submit', (e) => {

    e.preventDefault();
    db.collection('Shop').add({

        name: form.name.value,
        quantity: form.quantity.value
    });
 
    form.name.value = '';
    form.quantity.value = '';
})



// real-time listener
db.collection('Shop').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            getFruit(change.doc);
        } else if (change.type == 'removed'){
            let li = myList.querySelector('[data-id=' + change.doc.id + ']');
            myList.removeChild(li);
        }
    });
});

























//To get a specific data we use the method where()
//db.collection('Shop').where('quantity', '==', '30').get().then((snapshot) => {
//   snapshot.forEach(doc => {
//     getFruit(doc);
//});
//})


//To get the  data ordered by alphabetic we use the method where()
//db.collection('Shop').orderBy(name).get().then((snapshot) => {
//   snapshot.forEach(doc => {
//     getFruit(doc);
//});
//})



//Updating data (change) from console

//db.collection('Shop').doc('SBb1oev8ls36o54A6vJy').update({
//    name:'pen',
//   quantity: '4'
//})