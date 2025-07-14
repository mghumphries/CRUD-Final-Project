
$(document).ready(function () {
  renderTasks();

  $('#addTask').on('click', handleAddTask);
  $('#taskList').on('click', '.view', toggleDetails);
  $('#taskList').on('click', '.edit', toggleEditFields);
  $('#taskList').on('click', '.save', handleSaveEdit);
  $('#taskList').on('click', '.delete', handleDeleteTask);
});

function renderTasks() {
  $('#taskList').empty();
  tasks.forEach(task => $('#taskList').append(createTaskElement(task)));
}

function createTaskElement(task) {
  return $(`
    <li class="task" data-id="${task.id}">
      <strong class="task-title">${task.title}</strong> — 
      <span class="task-day">${task.day}</span>
      <span class="task-time">${task.time}</span>
      <div class="actions">
        <button class="view">View</button>
        <button class="edit">Edit</button>
        <button class="save" style="display:none;">Save</button>
        <button class="delete">Delete</button>
      </div>
      <div class="details">${task.description}</div>

      <div class="edit-fields" style="display:none; margin-top: 10px;">
        <input type="text" class="edit-day" value="${task.day}">
        <input type="text" class="edit-time" value="${task.time}">
        <input type="text" class="edit-title" value="${task.title}">
        <input type="text" class="edit-description" value="${task.description}">
      </div>
    </li>
  `);
}

function handleAddTask() {
  const day = $('#day').val().trim();
  const time = $('#time').val().trim(); 
  const title = $('#title').val().trim();
  const description = $('#description').val().trim();

  if (!day || !time || !title || !description) return;

  tasks.push({
    day,
    time,
    title,
    description,
  });

  renderTasks();
  clearInputs();
}

function showStatus(message) {
  $('#status').text(message);
  setTimeout(() => $('#status').text(''), 3000);
}

function toggleDetails() {
  $(this).closest('li').find('.details').slideToggle();
}

function toggleEditFields() {
  const $li = $(this).closest('li');
  $li.find('.edit-fields').slideToggle();
  $li.find('.save').show();
}

function handleSaveEdit() {
  const $li = $(this).closest('li');
  const id = parseInt($li.data('id'));

  const newDay = $li.find('.edit-day').val().trim();
  const newTitle = $li.find('.edit-title').val().trim();
  const newTime = $li.find('.edit-time').val().trim();
  const newDesc = $li.find('.edit-description').val().trim();

  if (!newTitle || !newTime || !newDesc || !newDay) return;

  task.day = newDay;
  task.time = newTime; 
  task.title = newTitle;
  task.description = newDesc;

  renderTasks();
  showStatus("Task updated.");
}

function handleDeleteTask() {
  const id = parseInt($(this).closest('li').data('id'));
  task = tasks.filter(task => task.id !== id);
  renderTasks();
  showStatus("Task deleted.");
}

function clearInputs() {
  $('#day, #title, #time, #description').val('');
}