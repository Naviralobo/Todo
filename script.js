let totalTaskCount = 0;
let remainingTaskCount = 0;

function disableOrEnableInput() {
  let addButton = document.getElementById("addButton");
  let todoInput = document.getElementById("todoInput");
  if (todoInput.value !== "") addButton.removeAttribute("disabled");
  else addButton.setAttribute("disabled", "disabled");
}

function addItemToList() {
  let item = document.getElementById("todoInput").value;
  let ul = document.querySelector("ul");
  let li = document.createElement("li");
  let checkbox = addCheckbox(li);
  li.appendChild(checkbox);
  let label = addLabel(item);
  li.appendChild(label);
  let deleteBtn = addDeleteButton(li);
  li.appendChild(deleteBtn);
  ul.appendChild(li);
  setTimeout(() => li.classList.add("slideIn"), 10);
  document.getElementById("todoInput").value = "";
  disableOrEnableInput();
  totalTaskCount++;
  remainingTaskCount++;
  updateTaskCount();
}

function addCheckbox(parentElement) {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.addEventListener("change", function () {
    if (this.checked) {
      remainingTaskCount--;
      parentElement.classList.add("checked");
      updateTaskCount();
    } else {
      remainingTaskCount++;
      parentElement.classList.remove("checked");
      updateTaskCount();
    }
  });
  return checkbox;
}

function addLabel(text) {
  let label = document.createElement("label");
  label.textContent = text;
  return label;
}

function addDeleteButton(parentElement) {
  let deletebtn = document.createElement("button");
  deletebtn.classList.add("deleteBtn");
  deletebtn.textContent = "X";
  deletebtn.addEventListener("click", function () {
    // parentElemnet.remove();
    parentElement.classList.add("slideOut");
    parentElement.addEventListener("transitionend", function () {
      parentElement.remove();
    });
    totalTaskCount--;
    if (!parentElement.classList.contains("checked")) remainingTaskCount--;
    updateTaskCount();
  });
  return deletebtn;
}

function updateTaskCount() {
  document.getElementById("totaltasks").textContent =
    "Total tasks:" + totalTaskCount;
  document.getElementById("remainingTasks").textContent =
    "Tasks to be done:" + remainingTaskCount;
}

document.addEventListener("DOMContentLoaded", disableOrEnableInput);

document
  .getElementById("todoInput")
  .addEventListener("input", disableOrEnableInput);

document.getElementById("addButton").addEventListener("click", addItemToList);
