const todoList = document.getElementById('todo-list');
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button'); 


// Function to create a new list item with a delete button
function createListItem(text) {
  const li = document.createElement('li');
  li.textContent = text;

  const deleteButton = document.createElement('button');
  deleteButton.textContent 
  = 'Delete';
  deleteButton.addEventListener('click', () => {
    li.remove();
  });

  li.appendChild(deleteButton);
  todoList.appendChild(li); 

}

// Add event listener to the "Add" button
addButton.addEventListener('click', () => {
  const taskText = taskInput.value;
  if (taskText !== '') {
    createListItem(taskText);
    taskInput.value = '';
  }
});

// Add delete buttons to the initial tasks immediately on page load
const initialTasks = todoList.querySelectorAll('li');
initialTasks.forEach(li => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click',
  () => {
    li.remove();
  });
  li.appendChild(deleteButton); 

});