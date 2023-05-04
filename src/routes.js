
// import handler
const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteByIdHandler } = require('./handler')

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHandler,
    },
    {
        // menampilkan seluruh/ secara spesifik catatan yang disimpan di server
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler
    },
    {
        // buat route untuk mendapatkan catatan secara spesifik
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHandler,

    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNoteByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteByIdHandler,
    }
]

module.exports = routes;