import { todoFactory, createTodos } from "./createTodo";
import { storeTodos } from "./storage.js";

// Get the content container from page
const content = document.querySelector("#content");

// Render all todos for a project
const renderToDoObjects = (project) => {
  // First create container for todo
  let todoContainer = document.createElement("div");
  todoContainer.setAttribute("id", "todoContainer");

  // Check if there is any todo, if there is then loop through them and adding the class for each priority
  if (project.projectTodoList.length > 0) {
    project.projectTodoList.forEach((i) => {
      const todo = document.createElement("div");
      if (i.doneStatus == "Complete") {
        todo.setAttribute("class", "todoCompleted");
      } else if (i.doneStatus == "Incomplete" && i.priority == "High") {
        todo.setAttribute("class", "todo highPriority");
      } else if (i.doneStatus == "Incomplete" && i.priority == "Medium") {
        todo.setAttribute("class", "todo mediumPriority");
      } else if (i.doneStatus == "Incomplete" && i.priority == "Low") {
        todo.setAttribute("class", "todo lowPriority");
      }
      // Create title for the todo
      const todoTitle = document.createElement("p");
      todoTitle.setAttribute("class", "todoTitle");
      todoTitle.append(i.title);
      todo.appendChild(todoTitle);

      // Create div for the todo info
      const todoInfo = document.createElement("div");
      todoInfo.setAttribute("class", "todoInfo");
      todoInfo.setAttribute("id", "todoInfo");

      // Create container for the dueDate
      const dueDateContainer = document.createElement("div");
      dueDateContainer.setAttribute("class", "dueDateContainer");
      // Showing the rigth dueDate for the todo
      const todoDueDateHeading = document.createElement("p");
      todoDueDateHeading.setAttribute("class", "todoDueDateHeading");
      if (i.dueDate != undefined && i.dueDate != "") {
        todoDueDateHeading.textContent = "Due Date: \n" + i.dueDate;
      }
      // Creating container for the priority
      const todoPriorityContainer = document.createElement("div");
      todoPriorityContainer.setAttribute("class", "todoPriorityContainer");
      // Adding a heading for the priority
      const priorityHeading = document.createElement("p");
      priorityHeading.setAttribute("class", "priorityHeading");
      priorityHeading.textContent = "Priority: " + i.priority;
      // Adding a note for the todo
      const noteContainer = document.createElement("div");
      noteContainer.setAttribute("class", "noteContainer");
      noteContainer.setAttribute("id", "noteContainer");

      const todoNote = document.createElement("p");
      todoNote.setAttribute("class", "todoNote");
      if (i.note != undefined && todo.note != "") {
        todoNote.textContent = "Note: \n" + i.note;
      }
      noteContainer.appendChild(todoNote);
      // Appending all of it
      dueDateContainer.append(todoDueDateHeading);
      todoPriorityContainer.append(priorityHeading);
      todoInfo.append(dueDateContainer, todoPriorityContainer);
      todo.append(todoInfo);
      todo.append(noteContainer);

      // Create remove button for remove todo
      const todoRemoveBtn = document.createElement("button");
      todoRemoveBtn.setAttribute("class", "todoRemoveBtn");
      todoRemoveBtn.textContent = "X";
      // Adding eventlistener for the button, and removing item from localstorage
      todoRemoveBtn.addEventListener("click", (e) => {
        project.removeFromProjectList(i);
        storeTodos.setTodoList(project);
        localStorage.removeItem(
          project.title + " " + i.title + " todo info",
          todo.todoInfo
        );
        if (localStorage[project.title + " project todo list"].length == 0) {
          localStorage.removeItem(project.title + " project todo list");
        }
        todo.remove();
      });
      // Appending remove button to each todo
      todo.append(todoRemoveBtn);
      // Create edit button
      const todoEditButton = document.createElement("button");
      todoEditButton.setAttribute("class", "btn");
      todoEditButton.setAttribute("id", "todoEditBtn");
      todoEditButton.textContent = "Edit";
      // Adding eventlistener for edit button, and creating pop up
      todoEditButton.addEventListener("click", (e) => {
        todo.setAttribute("class", "todoInEdit");
        todoTitle.remove();
        todoEditButton.remove();
        todoCompleteBtn.remove();
        todoInfo.remove();
        noteContainer.remove();

        const editTodoPopup = document.createElement("div");
        editTodoPopup.setAttribute("id", "editTodoPopup");

        todo.append(editTodoPopup);
        // Title label for pop up
        const todoTitleText = document.createElement("p");
        todoTitleText.setAttribute("class", "todoTitleText");
        todoTitleText.textContent = "Title:";
        editTodoPopup.append(todoTitleText);
        // Title inpput for pop up
        const todoTitleInput = document.createElement("input");
        todoTitleInput.setAttribute("class", "todoTitleInput");
        todoTitleInput.value = i.title;
        editTodoPopup.append(todoTitleInput);
        // Label for dueDate
        const todoDueText = document.createElement("p");
        todoDueText.setAttribute("id", "todoDueText");
        todoDueText.textContent = "Due:";
        editTodoPopup.append(todoDueText);
        // Input for due date
        const todoDueDateInput = document.createElement("input");
        todoDueDateInput.setAttribute("class", "todoDueDateInput");
        todoDueDateInput.setAttribute("type", "date");
        todoDueDateInput.value = i.dueDate;
        editTodoPopup.append(todoDueDateInput);
        // Label for priority
        const todoPriorityLabel = document.createElement("label");
        todoPriorityLabel.setAttribute("for", "todoPriorityInput");
        todoPriorityLabel.textContent = "Priority: ";
        // Input for priority
        const todoPriorityInput = document.createElement("select");
        todoPriorityInput.setAttribute("name", "todoPriorityInput");
        todoPriorityInput.setAttribute("class", "todoPriorityInput");
        todoPriorityInput.setAttribute("id", "todoPriorityInput");

        // Creating options for the priority select input
        const todoPriorityLow = document.createElement("option");
        todoPriorityLow.setAttribute("value", "Low");
        todoPriorityLow.textContent = "Low";

        const todoPriorityMed = document.createElement("option");
        todoPriorityMed.setAttribute("value", "Medium");
        todoPriorityMed.textContent = "Medium";

        const todoPriorityHigh = document.createElement("option");
        todoPriorityHigh.setAttribute("value", "High");
        todoPriorityHigh.textContent = "High";
        // Appending the options
        todoPriorityInput.append(
          todoPriorityHigh,
          todoPriorityMed,
          todoPriorityLow
        );
        // Making sure the default option is same as earlier
        todoPriorityInput.value = i.priority;

        // Appending to the pop up
        editTodoPopup.append(todoPriorityLabel, todoPriorityInput);
        // Label for note
        const todoNoteInputLabel = document.createElement("label");
        todoNoteInputLabel.setAttribute("class", "todoNoteInputLabel");
        todoNoteInputLabel.setAttribute("for", "todoNoteInput");
        todoNoteInputLabel.textContent = "Note:";
        // Input for note
        const todoNoteInput = document.createElement("input");
        todoNoteInput.setAttribute("class", "todoNoteInput");
        todoNoteInput.value = i.note;

        editTodoPopup.append(todoNoteInputLabel, todoNoteInput);
        // Throw error if no name is entered
        const noNameError = document.createElement("p");
        noNameError.setAttribute("class", "noNameError");
        noNameError.textContent = "Enter a name!";
        // Create submit button, and saving new data in storage
        const todoSubmitBtn = document.createElement("button");
        todoSubmitBtn.setAttribute("class", "btn");
        todoSubmitBtn.textContent = "Save";
        // Adding event listener for the save button
        todoSubmitBtn.addEventListener("click", (e) => {
          if (todoTitleInput.value == "") {
            // Make sure it user at typed in a string
            if (!editTodoPopup.contains(noNameError)) {
              editTodoPopup.append(noNameError);
              return;
            }
          } else {
            const todoTitleInput = document.querySelector(".todoTitleInput");
            // Create new todo
            const editedTodo = todoFactory(
              todoTitleInput.value,
              todoDueDateInput.value,
              todoPriorityInput.value,
              todoNoteInput.value
            );
            // Make sure the edited to do is stored correct
            project.projectTodoList.splice(
              project.projectTodoList.indexOf(i),
              1,
              editedTodo
            );
            project.projectTodoListTitles.splice(
              project.projectTodoListTitles.indexOf(i),
              1,
              editedTodo.title
            );
            localStorage.removeItem(
              project.title + " " + i.title + " todo info"
            );

            if (content.contains(todoContainer)) {
              todoContainer.remove();
            }

            storeTodos.setTodoList(project);
            createTodos();
            renderToDoObjects(project);
            todoCompleteBtn.insertAdjacentElement(
              "beforebegin",
              todoEditButton
            );
          }
        });
        editTodoPopup.append(todoSubmitBtn);
      });

      todo.append(todoEditButton);

      // Todo complete button
      const todoCompleteBtn = document.createElement("button");
      todoCompleteBtn.setAttribute("class", "btn");
      todoCompleteBtn.setAttribute("id", "todoCompleteBtn");
      todoCompleteBtn.textContent = "Complete";
      // Adding eventlistener, and setting status to completed
      todoCompleteBtn.addEventListener("click", function (e) {
        // Switch statement to check if status was complete or incomplete and then change the correct information
        switch (i.doneStatus) {
          case "Incomplete":
            const completeTodo = todoFactory(
              i.title,
              i.dueDate,
              i.priority,
              i.note,
              "Complete"
            );
            // Change the class, so it is visual that the todo is completed
            todo.setAttribute("class", "todoCompleted");
            project.projectTodoList.splice(
              project.projectTodoList.indexOf(i),
              1,
              completeTodo
            );
            project.projectTodoListTitles.splice(
              project.projectTodoListTitles.indexOf(i),
              1,
              completeTodo.title
            );
            break;

          case "Complete":
            const incompleteTodo = todoFactory(
              i.title,
              i.dueDate,
              i.priority,
              i.note,
              "Incomplete"
            );
            todo.setAttribute("class", "todo");
            project.projectTodoList.splice(
              project.projectTodoList.indexOf(i),
              1,
              incompleteTodo
            );
            project.projectTodoListTitles.splice(
              project.projectTodoListTitles.indexOf(i),
              1,
              incompleteTodo.title
            );
            break;
        }
        // Updating the storage
        if (content.contains(todoContainer)) {
          todoContainer.remove();
        }

        localStorage.removeItem(project.title + " " + i.title + " todo info");
        storeTodos.setTodoList(project);
        createTodos();
        renderToDoObjects(project);
      });

      todo.append(todoCompleteBtn);

      todoContainer.insertAdjacentElement("afterbegin", todo);
    });
  }

  // Todo create button
  const todoCreateBtnContainer = document.createElement("div");
  todoCreateBtnContainer.setAttribute("class", "todoCreateBtnContainer");

  const todoCreateBtn = document.createElement("button");
  todoCreateBtn.setAttribute("class", "todoCreateBtn");
  todoCreateBtn.textContent = "New Todo";
  // Adding event listener which create a pop up
  todoCreateBtn.addEventListener("click", (e) => {
    todoCreateBtn.remove();
    // Creating popup, with all inputs
    const createTodoPopup = document.createElement("div");
    createTodoPopup.setAttribute("id", "createTodoPopup");
    todoContainer.insertAdjacentElement("afterbegin", createTodoPopup);

    const todoTitleText = document.createElement("p");
    todoTitleText.setAttribute("id", "todoTitleText");
    todoTitleText.textContent = "Title:";
    createTodoPopup.append(todoTitleText);

    const todoTitleInput = document.createElement("input");
    todoTitleInput.setAttribute("class", "todoTitleInput");
    createTodoPopup.append(todoTitleInput);

    const todoDueText = document.createElement("p");
    todoDueText.setAttribute("id", "todoDueText");
    todoDueText.textContent = "Due:";
    createTodoPopup.append(todoDueText);

    const todoDueDateInput = document.createElement("input");
    todoDueDateInput.setAttribute("class", "todoDueDateInput");
    todoDueDateInput.setAttribute("type", "date");
    createTodoPopup.append(todoDueDateInput);

    const todoPriorityLabel = document.createElement("label");
    todoPriorityLabel.setAttribute("for", "todoPriorityInput");
    todoPriorityLabel.textContent = "Priority:";

    const todoPriorityInput = document.createElement("select");
    todoPriorityInput.setAttribute("name", "todoPriorityInput");
    todoPriorityInput.setAttribute("class", "todoPriorityInput");

    const todoPriorityLow = document.createElement("option");
    todoPriorityLow.setAttribute("value", "Low");
    todoPriorityLow.textContent = "Low";

    const todoPriorityMed = document.createElement("option");
    todoPriorityMed.setAttribute("value", "Medium");
    todoPriorityMed.textContent = "Medium";

    const todoPriorityHigh = document.createElement("option");
    todoPriorityHigh.setAttribute("value", "High");
    todoPriorityHigh.textContent = "High";

    todoPriorityInput.append(
      todoPriorityHigh,
      todoPriorityMed,
      todoPriorityLow
    );

    createTodoPopup.append(todoPriorityLabel, todoPriorityInput);

    const todoNoteInputLabel = document.createElement("label");
    todoNoteInputLabel.setAttribute("class", "todoNoteInputLabel");
    todoNoteInputLabel.setAttribute("for", "todoNoteInput");
    todoNoteInputLabel.textContent = "Note:";

    const todoNoteInput = document.createElement("input");
    todoNoteInput.setAttribute("class", "todoNoteInput");

    createTodoPopup.append(todoNoteInputLabel, todoNoteInput);

    const noNameError = document.createElement("p");
    noNameError.setAttribute("class", "noNameError");
    noNameError.textContent = "Enter a name!";
    // Submit button
    const todoSubmitBtn = document.createElement("button");
    todoSubmitBtn.setAttribute("class", "btn");
    todoSubmitBtn.setAttribute("id", "todoSubmitBtn");
    todoSubmitBtn.textContent = "Save";
    todoSubmitBtn.addEventListener("click", (e) => {
      if (todoTitleInput.value == "") {
        if (!createTodoPopup.contains(noNameError)) {
          createTodoPopup.append(noNameError);
          return;
        }
      } else {
        const todoTitleInput = document.querySelector(".todoTitleInput");
        const newTodo = todoFactory(
          todoTitleInput.value,
          todoDueDateInput.value,
          todoPriorityInput.value,
          todoNoteInput.value
        );
        project.projectTodoList.push(newTodo);
        if (content.contains(todoContainer)) {
          todoContainer.remove();
        }

        storeTodos.setTodoList(project);
        createTodos();
        project.projectTodoListTitles.push(todoTitleInput.value);
        renderToDoObjects(project);
        todoCreateBtnContainer.append(todoCreateBtn);
      }
    });
    createTodoPopup.append(todoSubmitBtn);
    // Cancel button
    const todoCancelBtn = document.createElement("button");
    todoCancelBtn.textContent = "Cancel";
    todoCancelBtn.setAttribute("class", "btn");
    todoCancelBtn.setAttribute("id", "todoCancelBtn");
    todoCancelBtn.addEventListener("click", (e) => {
      createTodoPopup.remove();
      todoTitleInput.remove();
      todoSubmitBtn.remove();
      noNameError.remove();
      todoCreateBtnContainer.append(todoCreateBtn);
    });
    createTodoPopup.appendChild(todoCancelBtn);
  });
  todoCreateBtnContainer.append(todoCreateBtn);
  todoContainer.insertAdjacentElement("afterbegin", todoCreateBtnContainer);
  projectAndTodoContainer.append(todoContainer);
};
export { renderToDoObjects };
