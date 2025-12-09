let notes = [];

function loadNotes() {
    const saved = localStorage.getItem("notes");
    notes = saved ? JSON.parse(saved) : [];
    renderNotes();
}

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function addNote() {
    const judul = document.getElementById("judul").value;
    const isi = document.getElementById("isi").value;

    if (!judul || !isi) {
        alert("Isi semua kolom!");
        return;
    }

    const newNote = {
        id: Date.now(),
        judul,
        isi,
        tanggal: new Date().toLocaleDateString()
    };

    notes.push(newNote);
    saveNotes();
    renderNotes();

    document.getElementById("judul").value = "";
    document.getElementById("isi").value = "";
}

function renderNotes() {
    const container = document.getElementById("notesList");
    container.innerHTML = "";

    notes.forEach(note => {
        const card = document.createElement("div");
        card.className = "note-card";

        card.innerHTML = `
            <h3>${note.judul}</h3>
            <p>${note.isi}</p>
            <small>${note.tanggal}</small>
            <div class="actions">
                <button onclick="editNote(${note.id})">Edit</button>
                <button onclick="deleteNote(${note.id})">Hapus</button>
            </div>
        `;

        container.appendChild(card);
    });
}

function editNote(id) {
    const note = notes.find(n => n.id === id);
    document.getElementById("judul").value = note.judul;
    document.getElementById("isi").value = note.isi;

    deleteNote(id);
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveNotes();
    renderNotes();
}

loadNotes();
