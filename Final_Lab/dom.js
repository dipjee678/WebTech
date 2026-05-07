// 1. Event listener for form submission
document.getElementById('student-form').addEventListener('submit', addStudent);
 
// 2. Add student function
function addStudent(event) {
    event.preventDefault();

    let studentName = document.getElementById('student-name').value;
    let studentRoll = document.getElementById('student-roll').value;

    if (studentName === '' || studentRoll === '') {
        alert('Please enter both Roll No and Name');
        return;
    }
 
    // 4. Create new list item
    let li = document.createElement('li');
    li.classList.add('student-item');
 
    // 5. Create span to show student name
    let span = document.createElement('span');
    span.textContent = studentRoll + " – " + studentName;
 
    // 6. Create Edit button
    let editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('btn-edit');

    editButton.addEventListener('click', function () {
        let newRoll = prompt("Enter new Roll No:", studentRoll);
        let newName = prompt("Enter new Name:", studentName);

        if (newRoll && newName) {
            studentRoll = newRoll;
            studentName = newName;
            span.textContent = studentRoll + " – " + studentName;
        }
    });
 
    // 6. Create Delete button
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('btn-delete');
    deleteButton.addEventListener('click', function () {
        deleteStudent(li);
    });
 
    // Put span and buttons inside li
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
 
    // 7. Add li to the student list
    document.getElementById('student-list').appendChild(li);
 
    // Clear input field
    document.getElementById('student-name').value = '';
}
 
// 8. Delete a student
function deleteStudent(studentElement) {
    studentElement.remove();
}
 
// 9. Edit a student's name
function editStudent(studentElement, studentNameElement) {
    let newName = prompt('Enter the new name:', studentNameElement.textContent);
    if (newName !== null && newName !== '') {
        studentNameElement.textContent = newName;
    }
}
 
// 10. Change list style (highlight)
function changeListStyle() {
    let students = document.querySelectorAll('.student-item');
    students.forEach(student => {
        student.classList.toggle('highlight');
    });
}
 
// 11. Add Highlight button dynamically
let changeStyleButton = document.createElement('button');
changeStyleButton.textContent = 'Highlight Students';
changeStyleButton.addEventListener('click', changeListStyle);
document.body.appendChild(changeStyleButton);
 