const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTask = document.querySelector(".input-task");

const fetchTasks = async () => {
  const response = await fetch("http://localhost:3333/tasks");
  const tasks = await response.json();
  return tasks;
};

const createElement = (tag, text = "") => {
  const element = document.createElement(tag);
  element.innerText = text;

  return element;
};

const createSelect = (value) => {
  const options = `<option value='pendente'>pendente</option>
  <option value='em andamento'>em andamento</option>
  <option value='concluida'>concluida</option>`;

  const select = createElement("select");
  select.innerHTML = options;
  select.value = value;

  if (select.value === "pendente") {
    select.classList.add("bg-yellow");
  } else if (select.value === "concluida") {
    select.classList.add("bg-green");
  } else if (select.value === "em andamento") {
    select.classList.add("bg-semi-green");
  }

  return select;
};

const createTask = async (event) => {
  event.preventDefault();

  const task = { titulo: inputTask.value };

  await fetch("http://localhost:3333/tasks", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  inputTask.value = "";
  loadTasks();
};

const deleteTask = async (id) => {
  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "delete",
  });

  loadTasks();
};

const updateTask = async (task) => {
  const { id, titulo, status } = task;

  await fetch(`http://localhost:3333/tasks/${id}`, {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, status }),
  });

  loadTasks();
};

const formatDate = (dateUTC) => {
  const date = new Date(dateUTC).toLocaleString("pt-br", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return date;
};

const createRow = (task) => {
  const { id, titulo, status, data } = task;

  const trTask = createElement("tr");

  const tdTitle = createElement("td", titulo);
  const tdData = createElement("td", formatDate(data));
  const tdStatus = createElement("td");
  const tdButtons = createElement("td");

  //criando o select para colocar no Td de status
  const select = createSelect(status);

  select.addEventListener("change", (event) =>
    updateTask({ ...task, status: event.target.value })
  );
  tdStatus.appendChild(select);

  //criando botões para colocar no Td de botões
  buttonEdit = createElement("button");
  buttonEdit.classList.add("btn-action");
  buttonEdit.innerHTML =
    "<span class='material-symbols-outlined'> edit </span>";

  const formEdit = createElement("form");
  const inputEdit = createElement("input");
  inputEdit.value = titulo;

  formEdit.appendChild(inputEdit);

  buttonEdit.addEventListener("click", () => {
    tdTitle.innerText = "";

    tdTitle.appendChild(formEdit);
  });

  formEdit.addEventListener("submit", (event) => {
    event.preventDefault();

    updateTask({ id, titulo: inputEdit.value, status });
  });

  buttonDelete = createElement("button");
  buttonDelete.classList.add("btn-action");
  buttonDelete.addEventListener("click", () => deleteTask(id));
  buttonDelete.innerHTML =
    "<span class='material-symbols-outlined'> delete </span>";

  tdButtons.appendChild(buttonEdit);
  tdButtons.appendChild(buttonDelete);

  trTask.appendChild(tdTitle);
  trTask.appendChild(tdData);
  trTask.appendChild(tdStatus);
  trTask.appendChild(tdButtons);

  tbody.appendChild(trTask);
};

const loadTasks = async () => {
  tbody.innerHTML = "";

  const tasks = await fetchTasks();

  tasks.forEach((task) => {
    createRow(task);
  });
};

addForm.addEventListener("submit", createTask);

loadTasks();
