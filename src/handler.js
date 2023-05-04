// import nanoid dari package
const { nanoid } = require('nanoid')
// import array notes pada berkas handler
const notes = require('./notes')


const addNoteHandler = (request, h) => {
    /*Client mengirim data catatan (title, tags, dan body) yang akan disimpan dalam 
    bentuk JSON melalui body request dengan menggunakan properti request.payload */
    const { title, tags, body } = request.payload;

    // memanggil method nanoid() menggunakan parameter number yang merupakan ukuran stringnya
    const id = nanoid(16)
    // next menambahkan properti createdAt dan updatedAt. menambahkan catatan baru dengan nilai properti yang sama
    // dengan memberikan nilai new Date().toISOString();.
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    // menambahkan properti newNote berisikan 
    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }
    // memasukkan nilai" kedalam array notes menggunakan method push()
    notes.push(newNote);

    // untuk mengetahui apakah newNote masuk ke array notes dengan menggunakan method filter() berdasarkan catatan id
    const isSuccess = notes.filter((note) => note.id === id).length > 0;

    // gunakan isSuccess untuk menentukan respons yang diberikan server
    if (isSuccess) {
        // apabila bernilai true maka respons berhasil
        const response = h.response({
            status: true,
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });
        response.code(201);
        return response;
    }
    // apabila bernilai false maka respons gagal
    const response = h.response({
        status: false,
        message: 'Catatan gagal ditambahkan',
    })
    response.code(500);
    return response;
}

const getAllNotesHandler = () => ({
    status: true,
    data: {
        notes,
    }
})

// fungsi ini harus mengembalikan objek catatan secara spesifik berdasarkan id yang digunakan oleh path parameter.
const getNoteByIdHandler = (request, h) => {
    // dapatkan dulu nilai id dari request.params.
    const { id } = request.params;
    // dapatkan objek note dengan id tersebut dari objek array notes. Manfaatkan method array filter() untuk mendapatkan objeknya.
    const note = notes.filter((n) => n.id === id)[0];

    //pastikan dulu objek note tidak bernilai undefined. Bila undefined, kembalikan dengan respons gagal
    if (note !== undefined) {
        return {
            status: true,
            data: {
                note,
            }
        }
    }

    const response = h.response({
        status: false,
        message: 'Catatan tidak ditemukan',
    })
    response.code(404);
    return response
}


const editNoteByIdHandler = (request, h) => {
    // Catatan yang diubah akan diterapkan sesuai dengan id yang digunakan pada route parameter
    const { id } = request.params;

    //dapatkan data notes terbaru yang dikirimkan oleh client melalui body request.
    const { title, tags, body } = request.payload;
    // perbarui juga nilai dari properti updatedAt. Jadi, dapatkan nilai terbaru dengan menggunakan new Date().toISOString().
    const updatedAt = new Date().toISOString();

    //dapatkan dulu index array pada objek catatan sesuai id yang ditentukan menggunakan findIndex().
    const index = notes.findIndex((note) => note.id === id);

    /*Bila note dengan id yang dicari ditemukan, maka index akan bernilai array index dari objek catatan yang dicari. 
    Namun bila tidak ditemukan, maka index bernilai -1. Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari 
    nilai index menggunakan if else. */
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            updatedAt
        }

        const response = h.response({
            status: true,
            message: 'Catatan berhasil diperbaharui'
        })
        response.code(200);
        return response;
    }
    const response = h.response({
        status: false,
        message: 'Gagal diperbahrui, id tidak ditemukan'
    })
    response.code(404);
    return response
}


// menghapus catatan
const deleteNoteByIdHandler = (request, h) => {
    const { id } = request.params;
    // dapatkan index dari objek catatan sesuai dengan id yang didapat.
    const index = notes.findIndex((note) => notes.id === id);
    /*Lakukan pengecekan terhadap nilai index, pastikan nilainya tidak -1 
    bila hendak menghapus catatan. Nah, untuk menghapus data pada array 
    berdasarkan index, gunakan method array splice(). */

    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: true,
            message: 'Catatan berhasil dihapus',
        })
        response.code(200);
        return response;
    }
    //Bila index bernilai -1, maka kembalikan handler dengan respons gagal.
    const response = h.response({
        status: false,
        message: 'Catatan gagal dihapus. Id tidak ditemukan'
    })
    response.code(404);
    return response
}
module.exports = {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
    editNoteByIdHandler,
    deleteNoteByIdHandler
};