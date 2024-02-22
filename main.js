const form = document.getElementById('form')
const formSubmitBtn = document.getElementById('form-submit')
const list = document.querySelector('.list')
const deleteAllBtn = document.getElementById('delete-all')
const titleSort = document.getElementById('title-sort')
const authorSort = document.getElementById('author-sort')
const pagesSort = document.getElementById('pages-sort')
const genreSort = document.getElementById('genre-sort')
const statusSort = document.getElementById('status-sort')
let sortBtns = document.querySelectorAll('.sort-button')

const sortCategory = document.getElementById('sort-category')
const sortOrder = document.getElementById('sort-order')
const sortSearch = document.getElementById('sort-search')

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
    statusBtn.addEventListener('click', (e) => {
        if (obj.status === 'Unread') {
            obj.status = 'Read'
            statusBtn.classList.add('has-read')
        } else {
            obj.status = 'Unread'
            statusBtn.classList.remove('has-read')

        }
        statusBtn.textContent = obj.status
        console.log(obj.status)
    })
    if (obj.status === 'Read') {
        statusBtn.classList.add('has-read')
    } 
    listItem.appendChild(statusBtn)

    let itemDelBtn = document.createElement('button')
    itemDelBtn.textContent = 'Delete'
    itemDelBtn.classList.add('list-item-delete')
    itemDelBtn.addEventListener('click', () => {
        removeLibraryItem(listItem)
        removeListItem(listItem)
    })
    listItem.appendChild(itemDelBtn)

    list.appendChild(listItem)
}

function removeListItem(item) {
    let index = Array.from(item.parentNode.children).indexOf(item);
    item.remove();

}

function removeLibraryItem(item) {
    let index = Array.from(item.parentNode.children).indexOf(item);
    if (index !== -1) {
        library.splice(index, 1);
    }
}



function listDeleteAll() {
    let listItems = list.querySelectorAll('.list-item')
    for (let item of listItems) {
        removeListItem(item)
    }
}

function libraryDeleteAll() {
    library = []
}

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
        if (form.checkValidity()) {
            return true
        }
        else {
            //Validate Form
            form.reportValidity()
            return false
        }

}

function init() {
    sortByProperty(library, 'title', 'asc')
    createItemsFromLibrary()
}

formSubmitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if (formValidity()) {
        createItem(createBook())
        form.reset()
    } else {
        return null
    }

})

deleteAllBtn.addEventListener('click', (e) => {
    listDeleteAll()
    libraryDeleteAll()
})


sortSearch.addEventListener('click', () => {
    let category = sortCategory.value
    let order = sortOrder.value
    listDeleteAll()
    sortByProperty(library, category, order)
    createItemsFromLibrary()
})


init()



//to add:
//validation