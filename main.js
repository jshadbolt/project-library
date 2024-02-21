const form = document.getElementById('form')
const formSubmitBtn = document.getElementById('form-submit')
const list = document.querySelector('.list')
const listDeleteAll = document.getElementById('delete-all')

let library = [
    // new Book('One Hundred Years of Solitude', 'Gabriel Garcia Marquez', '422', 'Thriller'),
    // new Book('The Trial', 'Franz Kafka', '162', 'Crime')
]

function Book(title, author, pages, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.status = 'Unread';
    // this.info = function() {
    //     return `${this.title} by ${author}, ${this.pages} pages, hasRead status: ${this.hasRead}`
    // }
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
        let category = document.createElement('div')
        category.textContent = obj[key]
        listItem.appendChild(category)
    }

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
    e.preventDefault()
    let listItems = list.querySelectorAll('.list-item')
    for (let item of listItems) {
        removeItem(item)
    }
})


//to add:
//validation
//read status toggle
//sort feature
//del individual button