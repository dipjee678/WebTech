<?php
require_once __DIR__ . '/../controllers/BookController.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Invalid request method.');
}

$action = $_POST['action'] ?? '';

switch ($action) {
    case 'get_books':
        handleGetBooks();
        break;

    case 'get_book':
        handleGetBook();
        break;

    case 'add_book':
        handleAddBook();
        break;

    case 'update_book':
        handleUpdateBook();
        break;

    case 'delete_book':
        handleDeleteBook();
        break;

    default:
        sendJsonResponse(false, 'Invalid action.');
}
