let notes = JSON.parse(localStorage.getItem("notes")) || [];

const titleInput = document.getElementById("noteTitle");
const input = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const container = document.getElementById("notesContainer");

// Render Notes
function renderNotes() {
  container.innerHTML = "";

  notes.forEach(note => {
    const div = document.createElement("div");
    div.classList.add("note");

    const title = document.createElement("h3");
    title.innerText = note.title || "Untitled Note";

    const text = document.createElement("p");
    text.innerText = note.content;

    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("note-actions");

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.onclick = () => editNote(note.id);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteNote(note.id);

    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    div.appendChild(title);
    div.appendChild(text);
    div.appendChild(actionsDiv);

    container.appendChild(div);
  });
}

// Add Note
addBtn.addEventListener("click", () => {
  const titleValue = titleInput.value.trim();
  const contentValue = input.value.trim();

  if (contentValue === "") {
    alert("Note content cannot be empty!");
    return;
  }

  const newNote = {
    id: Date.now(),
    title: titleValue,
    content: contentValue
  };

  notes.unshift(newNote); // Add to the beginning
  saveNotes();
  renderNotes();

  titleInput.value = "";
  input.value = "";
});

// Delete Note
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  renderNotes();
}

// Edit Note
function editNote(id) {
  const note = notes.find(n => n.id === id);
  
  const newTitle = prompt("Edit your title:", note.title || "");
  if (newTitle === null) return; // Cancelled
  
  const newContent = prompt("Edit your note content:", note.content);
  if (newContent === null) return; // Cancelled

  if (newContent.trim() !== "") {
    note.title = newTitle.trim();
    note.content = newContent.trim();
    saveNotes();
    renderNotes();
  } else {
    alert("Note content cannot be empty!");
  }
}

// Save to localStorage
function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Load Notes on Start
renderNotes(); 