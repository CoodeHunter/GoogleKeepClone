const addButton = document.querySelector('#add');




const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];
    textAreaData.forEach((note) => {
        return notes.push(note.value);
    })
    localStorage.setItem('notes', JSON.stringify(notes));

}

const addNewNotes = (text = '') => {
    const note = document.createElement('div');
    note.classList.add('notes');
    const htmldata = `
    <div class="operation">
        <button class="edit"><span  class="material-symbols-outlined invert"> edit</span></button>
        <button class="delete"><span class="material-symbols-outlined invert">delete</span></button>
    </div>
    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class=" ${text ? "hidden" : ""} " cols="49" rows="12"></textarea>`
    note.insertAdjacentHTML('afterbegin', htmldata);



    // getting the referncess

    const editButton = note.querySelector('.edit');
    const delButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // deleting the node 
    delButton.addEventListener('click', () => {
        note.remove();
        updateLSData();

    })

    // toogle using edit btn 
    textArea.innerHTML = text;
    mainDiv.innerHTML = text;




    editButton.addEventListener('click', () => {
        mainDiv.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })
    textArea.addEventListener('change', (event) => {
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })

    document.body.appendChild(note);




}


// getting data back from local storage 


const notes = JSON.parse(localStorage.getItem('notes'));


if (notes) { notes.forEach((note) => { addNewNotes(note) }) }



addButton.addEventListener('click', () => addNewNotes());