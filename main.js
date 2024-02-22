const form = document.getElementById('form')
const formSubmitBtn = document.getElementById('form-submit')
const list = document.querySelector('.list')
const listDeleteAll = document.getElementById('delete-all')
const titleSort = document.getElementById('title-sort')
const authorSort = document.getElementById('author-sort')
const pagesSort = document.getElementById('pages-sort')
const genreSort = document.getElementById('genre-sort')
const statusSort = document.getElementById('status-sort')
let sortBtns = document.querySelectorAll('.sort-button')

let library = [
    new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '422', 'Thriller'),
    new Book('The Trial', 'Franz Kafka', '162', 'Crime'),
    new Book('Alice in Wonderland', 'Someone', '215', 'mystery'),
]

function Book(title, author, pages, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.status = 'Unread';
}

function createBook() {
    let formData = []
    let fields = Array.from(form.querySelectorAll('input'))
    fields.forEach((field) => {
        formData.push(field.value)
    })
    let book = new Book(...formData)
    library.push(book)
    return book
}

function createItem(obj) {
    let indexValue = obj.title
    let listItem = document.createElement('li')
    listItem.classList.add('list-item')
    listItem.setAttribute('data-value', indexValue); // adding a data attribute

    for (let key in obj) {
        if (key === 'status') continue;

        let category = document.createElement('div')
        category.textContent = obj[key]
        listItem.appendChild(category)
    }

    let statusBtn = document.createElement('button')
    statusBtn.textContent = obj.status
    statusBtn.classList.add('status-button')
    listItem.appendChild(statusBtn)

    let itemDelBtn = document.createElement('button')
    itemDelBtn.textContent = 'Delete'
    itemDelBtn.classList.add('list-item-delete')
    itemDelBtn.addEventListener('click', () => removeItem(listItem))
    listItem.appendChild(itemDelBtn)

    list.appendChild(listItem)
}

function removeItem(item) {
    let index = Array.from(item.parentNode.children).indexOf(item);
    item.remove();
    if (index !== -1) {
        library.splice(index, 1);
    }
}

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    createItem(createBook())
    form.reset()
})

listDeleteAll.addEventListener('click', (e) => {
    let listItems = list.querySelectorAll('.list-item')
    for (let item of listItems) {
        removeItem(item)
    }
})



function createItemsFromLibrary() {
    for (let book of library) {
        createItem(book)
    }
}

function sortByProperty(array, property, order) {
    return array.sort((a, b) => {
        let comparison = 0;
        if (typeof a[property] === 'string') {
            comparison = a[property].localeCompare(b[property]);
        } else if (typeof a[property] === 'number') {
            comparison = a[property] - b[property];
        }
        return (order === 'desc') ? (comparison * -1) : comparison;
    });
}

function formValidity() {

}





sortByProperty(library, 'pages', 'desc')


createItemsFromLibrary()




//to add:
//validation
//read status toggle
//sort feature
//del individual button