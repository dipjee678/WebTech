const form = document.getElementById('bookForm');
const bookIdInput = document.getElementById('bookId');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const categoryInput = document.getElementById('category');
const statusInput = document.getElementById('status');
const tableBody = document.getElementById('bookTableBody');
const message = document.getElementById('message');
const formTitle = document.getElementById('formTitle');
const submitBtn = document.getElementById('submitBtn');
const cancelBtn = document.getElementById('cancelBtn');
const refreshBtn = document.getElementById('refreshBtn');
const endpoint = 'ajax/book_handler.php';

document.addEventListener('DOMContentLoaded', loadBooks);
form.addEventListener('submit', saveBook);
cancelBtn.addEventListener('click', resetForm);
refreshBtn.addEventListener('click', loadBooks);

async function sendRequest(action, data = {}) {
    const formData = new FormData();
    formData.append('action', action);

    Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
    });

    const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
    });

    return response.json();
}

async function loadBooks() {
    tableBody.innerHTML = '<tr><td colspan="6" align="center">Loading books...</td></tr>';

    try {
        const result = await sendRequest('get_books');

        if (!result.success) {
            showMessage(result.message, 'error');
            return;
        }

        renderBooks(result.data);
    } catch (error) {
        showMessage('Unable to load books. Check the database connection.', 'error');
    }
}

function renderBooks(books) {
    if (!books.length) {
        tableBody.innerHTML = '<tr><td colspan="6" align="center">No book records found.</td></tr>';
        return;
    }

    tableBody.innerHTML = books.map((book) => `
        <tr>
            <td>${escapeHtml(book.id)}</td>
            <td>${escapeHtml(book.title)}</td>
            <td>${escapeHtml(book.author)}</td>
            <td>${escapeHtml(book.category)}</td>
            <td>${escapeHtml(book.status)}</td>
            <td align="center">
                <button type="button" onclick="editBook(${book.id})">Edit</button>
                <button type="button" onclick="deleteBook(${book.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

async function saveBook(event) {
    event.preventDefault();

    const id = bookIdInput.value;
    const action = id ? 'update_book' : 'add_book';
    const payload = {
        id,
        title: titleInput.value,
        author: authorInput.value,
        category: categoryInput.value,
        status: statusInput.value
    };

    try {
        const result = await sendRequest(action, payload);
        showMessage(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            resetForm();
            loadBooks();
        }
    } catch (error) {
        showMessage('Request failed. Please try again.', 'error');
    }
}

async function editBook(id) {
    try {
        const result = await sendRequest('get_book', { id });

        if (!result.success) {
            showMessage(result.message, 'error');
            return;
        }

        const book = result.data;
        bookIdInput.value = book.id;
        titleInput.value = book.title;
        authorInput.value = book.author;
        categoryInput.value = book.category;
        statusInput.value = book.status;
        formTitle.textContent = 'Update Book';
        submitBtn.textContent = 'Update Book';
        titleInput.focus();
    } catch (error) {
        showMessage('Unable to load selected book.', 'error');
    }
}

async function deleteBook(id) {
    if (!confirm('Delete this book record?')) {
        return;
    }

    try {
        const result = await sendRequest('delete_book', { id });
        showMessage(result.message, result.success ? 'success' : 'error');

        if (result.success) {
            loadBooks();
        }
    } catch (error) {
        showMessage('Unable to delete book.', 'error');
    }
}

function resetForm() {
    form.reset();
    bookIdInput.value = '';
    formTitle.textContent = 'Add New Book';
    submitBtn.textContent = 'Add Book';
}

function showMessage(text, type) {
    message.textContent = text;

    setTimeout(() => {
        message.textContent = '';
    }, 3500);
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }[character]));
}
