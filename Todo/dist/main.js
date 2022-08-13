"use strict";
(self["webpackChunktodo"] = self["webpackChunktodo"] || []).push([["main"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_renderPage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/renderPage.js */ "./src/modules/renderPage.js");
/* harmony import */ var _modules_createTodo_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/createTodo.js */ "./src/modules/createTodo.js");
/* harmony import */ var _modules_createProject_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/createProject.js */ "./src/modules/createProject.js");
/* harmony import */ var _modules_renderTodo_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/renderTodo.js */ "./src/modules/renderTodo.js");
/* harmony import */ var _modules_storage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/storage.js */ "./src/modules/storage.js");
/* harmony import */ var _modules_renderProjects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/renderProjects */ "./src/modules/renderProjects.js");







const createDefaultProject = (() => {
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_4__.storeProjects.getProjectList();
    _modules_storage_js__WEBPACK_IMPORTED_MODULE_4__.storeProjects.setProjectList();
    (0,_modules_createProject_js__WEBPACK_IMPORTED_MODULE_2__.createProjects)();
    (0,_modules_renderProjects__WEBPACK_IMPORTED_MODULE_5__.renderProjectList)();
})();

/***/ }),

/***/ "./src/modules/createProject.js":
/*!**************************************!*\
  !*** ./src/modules/createProject.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createProjects": () => (/* binding */ createProjects),
/* harmony export */   "projectFactory": () => (/* binding */ projectFactory),
/* harmony export */   "projectObjectList": () => (/* binding */ projectObjectList),
/* harmony export */   "removeProject": () => (/* binding */ removeProject)
/* harmony export */ });
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");


const projectFactory = (title) => {
    const projectTodoList = [];

    const projectTodoListTitles = [];

    function addToProjectTodoList(todoObject) {
        projectTodoList.push(todoObject);
    }

    function removeFromProjectList(todoObject) {
        projectTodoList.splice(projectTodoList.indexOf(todoObject), 1);
    }

    const removeProjectFromList = (project) => {
        _storage_js__WEBPACK_IMPORTED_MODULE_0__.projectList.splice(_storage_js__WEBPACK_IMPORTED_MODULE_0__.projectList.indexOf(project), 1);
    };

    return {
        title,
        projectTodoList,
        projectTodoListTitles,
        addToProjectTodoList,
        removeFromProjectList,
    };
};

//Project objects stored in a list
let projectObjectList = [];

//Create the project objects and push them to the above list
function createProjects() {
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.storeProjects.getProjectList();
    const projectObjectListTitles = [];
    projectObjectList.forEach((projectObject) => {
        projectObjectListTitles.push(projectObject.title);
    });
    _storage_js__WEBPACK_IMPORTED_MODULE_0__.storeProjects.projectList.forEach((project) => {
        if (!projectObjectListTitles.includes(project)) {
            const newProject = projectFactory(project);
            return projectObjectList.push(newProject);
        }
    });
}

//Remove projects from the list above
function removeProject(project) {
    if (projectObjectList.length > 1) {
        projectObjectList.splice(projectObjectList.indexOf(project), 1);
    } else if (projectObjectList.length == 1) {
        projectObjectList = [];
    }
}



/***/ }),

/***/ "./src/modules/createTodo.js":
/*!***********************************!*\
  !*** ./src/modules/createTodo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTodos": () => (/* binding */ createTodos),
/* harmony export */   "todoFactory": () => (/* binding */ todoFactory)
/* harmony export */ });
/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ "./src/modules/createProject.js");


const todoFactory = (
    title,
    dueDate,
    priority,
    note = "None",
    doneStatus = "Incomplete"
) => {
    let todoInfo = [title, dueDate, priority, note, doneStatus];

    return {
        title,
        dueDate,
        priority,
        note,
        doneStatus,
        todoInfo,
    };
};

function createTodos() {
    _createProject__WEBPACK_IMPORTED_MODULE_0__.projectObjectList.forEach((project) => {
        if (project.projectTodoListTitles.length > 0) {
            project.projectTodoListTitles.forEach((title) => {
                const localTodos = localStorage.getItem(
                    project.title + " " + title + " todo info"
                );

                if (localTodos != "" && localTodos != undefined) {
                    const todoInfo = localStorage[
                        project.title + " " + title + " todo info"
                    ].split(",");
                    let newTodo = todoFactory(
                        todoInfo[0],
                        todoInfo[1],
                        todoInfo[2],
                        todoInfo[3],
                        todoInfo[4]
                    );

                    const projectTodoTitles = [];
                    project.projectTodoList.forEach((todo) => {
                        projectTodoTitles.push(todo.title);
                    });

                    if (!projectTodoTitles.includes(title)) {
                        project.addToProjectTodoList(newTodo);
                    }
                }
            });
        }
    });
}



/***/ }),

/***/ "./src/modules/renderPage.js":
/*!***********************************!*\
  !*** ./src/modules/renderPage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderPage": () => (/* binding */ renderPage)
/* harmony export */ });
const renderPage = (() => {
    const content = document.querySelector("#content");

    const headingContainer = document.createElement("div");
    headingContainer.setAttribute("id", "headingContainer");

    const heading = document.createElement("h1");
    heading.textContent = "Todo List";

    headingContainer.append(heading);
    content.append(headingContainer);

    const projectAndTodoContainer = document.createElement("div");
    projectAndTodoContainer.setAttribute("id", "projectAndTodoContainer");
    content.append(projectAndTodoContainer);

    const projects = document.createElement("div");
    projects.setAttribute("id", "projects");

    projectAndTodoContainer.append(projects);

    const projectsListContainer = document.createElement("div");
    projectsListContainer.setAttribute("id", "projectsListContainer");

    projects.append(projectsListContainer);
})();



/***/ }),

/***/ "./src/modules/renderProjects.js":
/*!***************************************!*\
  !*** ./src/modules/renderProjects.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderProjectList": () => (/* binding */ renderProjectList)
/* harmony export */ });
/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ "./src/modules/createProject.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");
/* harmony import */ var _createTodo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTodo */ "./src/modules/createTodo.js");
/* harmony import */ var _renderTodo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderTodo */ "./src/modules/renderTodo.js");





const content = document.querySelector("#content");

//Render a project
const renderProject = (project) => {
    const projectDiv = document.createElement("div");

    projectDiv.setAttribute("class", "project");

    const projectTitle = document.createElement("p");
    projectTitle.setAttribute("class", "projectTitle");
    projectTitle.append(project.title);

    projectDiv.append(projectTitle);
    projectsListContainer.append(projectDiv);

    const projectRemoveBtn = document.createElement("button");
    projectRemoveBtn.setAttribute("class", "projectRemoveBtn");
    projectRemoveBtn.textContent = "X";
    projectRemoveBtn.addEventListener("click", (e) => {
        const pageOverlay = document.createElement("div");
        pageOverlay.setAttribute("id", "pageOverlay");

        pageOverlay.addEventListener("click", (e) => {
            pageOverlay.remove();
        });

        //Project delete confirmation prompt
        const removeProjectCheckContainer = document.createElement("div");
        removeProjectCheckContainer.setAttribute(
            "id",
            "removeProjectCheckContainer"
        );

        const removeProjectCheckText = document.createElement("p");
        removeProjectCheckText.textContent =
            "Are you sure you want to remove this project? \n All todo items will be lost.";

        const removeProjectCheckYes = document.createElement("button");
        removeProjectCheckYes.setAttribute("class", "removeCheckBtn");
        removeProjectCheckYes.textContent = "Remove";
        removeProjectCheckYes.addEventListener("click", (e) => {
            project.projectTodoList.forEach((i) => {
                localStorage.removeItem(
                    project.title + " " + i.title + " todo info"
                );
            });
            localStorage.removeItem(project.title + " project todo list");
            (0,_createProject__WEBPACK_IMPORTED_MODULE_0__.removeProject)(project);
            _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeProjects.removeProjectFromList(project);
            pageOverlay.remove();
            projectDiv.remove();
            todoContainer.remove();
        });

        const removeProjectCheckNo = document.createElement("button");
        removeProjectCheckNo.setAttribute("class", "removeCheckBtn");
        removeProjectCheckNo.textContent = "Cancel";
        removeProjectCheckNo.addEventListener("click", (e) => {
            pageOverlay.remove();
        });

        removeProjectCheckContainer.append(
            removeProjectCheckText,
            removeProjectCheckYes,
            removeProjectCheckNo
        );
        pageOverlay.append(removeProjectCheckContainer);
        content.insertAdjacentElement("afterbegin", pageOverlay);
    });

    projectDiv.append(projectRemoveBtn);

    projectDiv.addEventListener("click", (e) => {
        const todoContainer = document.querySelector("#todoContainer");
        if (content.contains(todoContainer)) {
            todoContainer.remove();
        }
        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTodos.getTodoList();
        (0,_createTodo__WEBPACK_IMPORTED_MODULE_2__.createTodos)();
        (0,_renderTodo__WEBPACK_IMPORTED_MODULE_3__.renderToDoObjects)(project);
    });
};

//Renders all projects
const renderProjectList = () => {
    _createProject__WEBPACK_IMPORTED_MODULE_0__.projectObjectList.forEach((listItem) => {
        renderProject(listItem);
    });
};

const renderProjectCreateBtn = (() => {
    const projectCreateBtnContainer = document.createElement("div");
    projectCreateBtnContainer.setAttribute("id", "projectCreateBtnContainer");

    const projectCreateBtn = document.createElement("button");
    projectCreateBtn.setAttribute("id", "projectCreateBtn");
    projectCreateBtn.textContent = "Create Project";
    projectCreateBtn.addEventListener("click", (e) => {
        projectCreateBtn.remove();
        const createProjectPopup = document.createElement("div");
        createProjectPopup.setAttribute("id", "createProjectPopup");
        projects.insertAdjacentElement("afterbegin", createProjectPopup);

        const projectTitleText = document.createElement("p");
        projectTitleText.setAttribute("id", "projectTitleText");
        projectTitleText.textContent = "Title:";
        createProjectPopup.append(projectTitleText);

        const projectTitleInput = document.createElement("input");
        projectTitleInput.setAttribute("id", "projectTitleInput");
        projectTitleInput.setAttribute("placeholder", "New Project");
        createProjectPopup.append(projectTitleInput);

        const projectExistsError = document.createElement("p");
        projectExistsError.setAttribute("class", "projectExistsError");
        projectExistsError.textContent = "Project already exists!";

        const noNameError = document.createElement("p");
        noNameError.setAttribute("class", "noNameError");
        noNameError.textContent = "Enter a name!";

        const projectSubmitBtn = document.createElement("button");
        projectSubmitBtn.textContent = "Save";
        projectSubmitBtn.setAttribute("class", "btn");
        projectSubmitBtn.addEventListener("click", (e) => {
            if (_storage_js__WEBPACK_IMPORTED_MODULE_1__.projectList.includes(projectTitleInput.value)) {
                if (!createProjectPopup.contains(projectExistsError)) {
                    createProjectPopup.insertAdjacentElement(
                        "afterend",
                        projectExistsError
                    );
                    return;
                }
            } else if (projectTitleInput.value == "") {
                createProjectPopup.insertAdjacentElement(
                    "afterend",
                    noNameError
                );
                return;
            } else if (projectTitleInput.value != "") {
                _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeProjects.addProjectToList(projectTitleInput.value);
                (0,_createProject__WEBPACK_IMPORTED_MODULE_0__.createProjects)();
                createProjectPopup.remove();
                projectTitleInput.remove();
                projectSubmitBtn.remove();
                projectCreateBtnContainer.append(projectCreateBtn);
                projectsListContainer.innerHTML = "";
                renderProjectList();
            }
        });
        createProjectPopup.append(projectSubmitBtn);
    });

    projectCreateBtnContainer.append(projectCreateBtn);
    projects.insertAdjacentElement("afterbegin", projectCreateBtnContainer);
})();



/***/ }),

/***/ "./src/modules/renderTodo.js":
/*!***********************************!*\
  !*** ./src/modules/renderTodo.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderToDoObjects": () => (/* binding */ renderToDoObjects)
/* harmony export */ });
/* harmony import */ var _createTodo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTodo */ "./src/modules/createTodo.js");
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./storage.js */ "./src/modules/storage.js");



const content = document.querySelector("#content");

//Render all todos for a project
const renderToDoObjects = (project) => {
    let todoContainer = document.createElement("div");
    todoContainer.setAttribute("id", "todoContainer");

    if (project.projectTodoList.length > 0) {
        project.projectTodoList.forEach((i) => {
            const todo = document.createElement("div");
            if (i.doneStatus == "Complete") {
                todo.setAttribute("class", "todoCompleted");
            } else if (i.doneStatus == "Incomplete" && i.priority == "High") {
                todo.setAttribute("class", "todoHighPriority");
            } else if (i.doneStatus == "Incomplete" && i.priority == "Medium") {
                todo.setAttribute("class", "todoMediumPriority");
            } else if (i.doneStatus == "Incomplete" && i.priority == "Low") {
                todo.setAttribute("class", "todoLowPriority");
            }

            const todoInfo = document.createElement("div");
            todoInfo.setAttribute("class", "todoInfo");

            const todoTitle = document.createElement("p");
            todoTitle.setAttribute("class", "todoTitle");
            todoTitle.append(i.title);

            const dueDateContainer = document.createElement("div");
            dueDateContainer.setAttribute("class", "dueDateContainer");

            const todoDueDateHeading = document.createElement("p");
            todoDueDateHeading.setAttribute("class", "todoDueDateHeading");
            if (i.dueDate != undefined && i.dueDate != "") {
                todoDueDateHeading.textContent = "Due Date: " + i.dueDate;
            }

            const todoPriorityContainer = document.createElement("div");
            todoPriorityContainer.setAttribute(
                "class",
                "todoPriorityContainer"
            );

            const priorityHeading = document.createElement("p");
            priorityHeading.setAttribute("class", "priorityHeading");
            priorityHeading.textContent = "Priority: " + i.priority;

            const todoNote = document.createElement("p");
            todoNote.setAttribute("class", "todoNote");
            if (i.note != undefined && todo.note != "") {
                todoNote.textContent = "Note: \n" + i.note;
            }

            dueDateContainer.append(todoDueDateHeading);
            todoPriorityContainer.append(priorityHeading);
            todoInfo.append(
                todoTitle,
                dueDateContainer,
                todoPriorityContainer,
                todoNote
            );
            todo.append(todoInfo);

            //Todo remove functionality
            const todoRemoveBtn = document.createElement("button");
            todoRemoveBtn.setAttribute("class", "todoRemoveBtn");
            todoRemoveBtn.textContent = "X";
            todoRemoveBtn.addEventListener("click", (e) => {
                project.removeFromProjectList(i);
                _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTodos.setTodoList(project);
                localStorage.removeItem(
                    project.title + " " + i.title + " todo info",
                    todo.todoInfo
                );
                if (
                    localStorage[project.title + " project todo list"].length ==
                    0
                ) {
                    localStorage.removeItem(
                        project.title + " project todo list"
                    );
                }
                todo.remove();
            });

            todo.append(todoRemoveBtn);

            const todoEditButton = document.createElement("button");
            todoEditButton.setAttribute("class", "btn");
            todoEditButton.textContent = "Edit";

            todoEditButton.addEventListener("click", (e) => {
                todoEditButton.remove();
                const editTodoPopup = document.createElement("div");
                editTodoPopup.setAttribute("id", "editTodoPopup");

                todo.append(editTodoPopup);

                const todoTitleText = document.createElement("p");
                todoTitleText.setAttribute("class", "todoTitleText");
                todoTitleText.textContent = "Title:";
                editTodoPopup.append(todoTitleText);

                const todoTitleInput = document.createElement("input");
                todoTitleInput.setAttribute("class", "todoTitleInput");
                todoTitleInput.value = i.title;
                editTodoPopup.append(todoTitleInput);

                const todoDueText = document.createElement("p");
                todoDueText.setAttribute("id", "todoDueText");
                todoDueText.textContent = "Due:";
                editTodoPopup.append(todoDueText);

                const todoDueDateInput = document.createElement("input");
                todoDueDateInput.setAttribute("class", "todoDueDateInput");
                todoDueDateInput.setAttribute("type", "date");
                todoDueDateInput.value = i.dueDate;
                editTodoPopup.append(todoDueDateInput);

                const todoPriorityLabel = document.createElement("label");
                todoPriorityLabel.setAttribute("for", "todoPriorityInput");
                todoPriorityLabel.textContent = "Priority: ";

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

                editTodoPopup.append(todoPriorityLabel, todoPriorityInput);

                const todoNoteInputLabel = document.createElement("label");
                todoNoteInputLabel.setAttribute("class", "todoNoteInputLabel");
                todoNoteInputLabel.setAttribute("for", "todoNoteInput");
                todoNoteInputLabel.textContent = "Note:";

                const todoNoteInput = document.createElement("input");
                todoNoteInput.setAttribute("class", "todoNoteInput");

                editTodoPopup.append(todoNoteInputLabel, todoNoteInput);

                const noNameError = document.createElement("p");
                noNameError.setAttribute("class", "noNameError");
                noNameError.textContent = "Enter a name!";

                const todoSubmitBtn = document.createElement("button");
                todoSubmitBtn.setAttribute("class", "btn");
                todoSubmitBtn.textContent = "Save";
                todoSubmitBtn.addEventListener("click", (e) => {
                    if (todoTitleInput.value == "") {
                        if (!editTodoPopup.contains(noNameError)) {
                            editTodoPopup.append(noNameError);
                            return;
                        }
                    } else {
                        const todoTitleInput = document.querySelector(
                            ".todoTitleInput"
                        );

                        const editedTodo = (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(
                            todoTitleInput.value,
                            todoDueDateInput.value,
                            todoPriorityInput.value,
                            todoNoteInput.value
                        );
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

                        _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTodos.setTodoList(project);
                        (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.createTodos)();
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

            //Todo complete button

            const todoCompleteBtn = document.createElement("button");
            todoCompleteBtn.setAttribute("class", "btn");
            todoCompleteBtn.textContent = "Complete";

            todoCompleteBtn.addEventListener("click", function (e) {
                switch (i.doneStatus) {
                    case "Incomplete":
                        const completeTodo = (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(
                            i.title,
                            i.dueDate,
                            i.priority,
                            i.note,
                            "Complete"
                        );
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
                        const incompleteTodo = (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(
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
                if (content.contains(todoContainer)) {
                    todoContainer.remove();
                }

                localStorage.removeItem(
                    project.title + " " + i.title + " todo info"
                );
                _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTodos.setTodoList(project);
                (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.createTodos)();
                renderToDoObjects(project);
            });

            todo.append(todoCompleteBtn);

            todoContainer.insertAdjacentElement("afterbegin", todo);
        });
    }

    //Todo create functionality
    const todoCreateBtnContainer = document.createElement("div");
    todoCreateBtnContainer.setAttribute("class", "todoCreateBtnContainer");

    const todoCreateBtn = document.createElement("button");
    todoCreateBtn.setAttribute("class", "todoCreateBtn");
    todoCreateBtn.textContent = "New Todo";

    todoCreateBtn.addEventListener("click", (e) => {
        todoCreateBtn.remove();

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

        const todoSubmitBtn = document.createElement("button");
        todoSubmitBtn.setAttribute("class", "btn");
        todoSubmitBtn.textContent = "Save";
        todoSubmitBtn.addEventListener("click", (e) => {
            if (todoTitleInput.value == "") {
                if (!createTodoPopup.contains(noNameError)) {
                    createTodoPopup.append(noNameError);
                    return;
                }
            } else {
                const todoTitleInput = document.querySelector(
                    ".todoTitleInput"
                );
                const newTodo = (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.todoFactory)(
                    todoTitleInput.value,
                    todoDueDateInput.value,
                    todoPriorityInput.value,
                    todoNoteInput.value
                );
                project.projectTodoList.push(newTodo);
                if (content.contains(todoContainer)) {
                    todoContainer.remove();
                }

                _storage_js__WEBPACK_IMPORTED_MODULE_1__.storeTodos.setTodoList(project);
                (0,_createTodo__WEBPACK_IMPORTED_MODULE_0__.createTodos)();
                project.projectTodoListTitles.push(todoTitleInput.value);
                renderToDoObjects(project);
                todoCreateBtnContainer.append(todoCreateBtn);
            }
        });
        createTodoPopup.append(todoSubmitBtn);
    });
    todoCreateBtnContainer.append(todoCreateBtn);
    todoContainer.insertAdjacentElement("afterbegin", todoCreateBtnContainer);
    projectAndTodoContainer.append(todoContainer);
};


/***/ }),

/***/ "./src/modules/storage.js":
/*!********************************!*\
  !*** ./src/modules/storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectList": () => (/* binding */ projectList),
/* harmony export */   "storeProjects": () => (/* binding */ storeProjects),
/* harmony export */   "storeTodos": () => (/* binding */ storeTodos)
/* harmony export */ });
/* harmony import */ var _createProject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createProject */ "./src/modules/createProject.js");


//Keep a list of projects, added to localStorage
const projectList = [];

//Create the default project if no others are present
if (localStorage.length == 0) {
    projectList.push("Default Project");
}

const storeProjects = (() => {
    function setProjectList() {
        projectList.forEach((project) => {
            if (project != "") {
                localStorage.setItem("projectList", projectList);
            }
        });
    }

    function getProjectList() {
        if (localStorage.length == 0) {
            setProjectList();
        } else {
            const storedProjectList = localStorage["projectList"].split(",");
            storedProjectList.forEach((project) => {
                if (!projectList.includes(project) || projectList.length == 0) {
                    projectList.push(project);
                }
            });
        }
    }

    //Add and remove projects to the project list so they can be saved in localStorage
    const addProjectToList = (project) => {
        getProjectList();
        projectList.push(project);
        setProjectList();
    };

    const removeProjectFromList = (project) => {
        getProjectList();
        if (projectList.length > 1) {
            projectList.splice(projectList.indexOf(project.title), 1);
            setProjectList();
        } else if (projectList.length == 1) {
            projectList.pop();
            localStorage.removeItem("projectList");
        }
    };

    return {
        projectList,
        setProjectList,
        getProjectList,
        addProjectToList,
        removeProjectFromList,
    };
})();

const storeTodos = (() => {
    function setTodoList(project) {
        const storedProjectTodoList = [];

        project.projectTodoList.forEach((todo) => {
            localStorage.setItem(
                project.title + " " + todo.title + " todo info",
                todo.todoInfo
            );
            storedProjectTodoList.push(todo.title);
        });
        localStorage.setItem(
            project.title + " project todo list",
            storedProjectTodoList
        );
    }

    function getTodoList() {
        _createProject__WEBPACK_IMPORTED_MODULE_0__.projectObjectList.forEach((project) => {
            if (
                localStorage.getItem(project.title + " project todo list") !=
                null
            ) {
                const storedProjectTodoListTitles = localStorage
                    .getItem(project.title + " project todo list")
                    .split(",");

                storedProjectTodoListTitles.forEach((todoTitle) => {
                    if (!project.projectTodoListTitles.includes(todoTitle)) {
                        project.projectTodoListTitles.push(todoTitle);
                    }
                });
            }
        });
    }

    return { setTodoList, getTodoList };
})();



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXFEO0FBQ0M7QUFDc0I7QUFDaEI7QUFDSztBQUNKOztBQUU3RDtBQUNBLElBQUksNkVBQTRCO0FBQ2hDLElBQUksNkVBQTRCO0FBQ2hDLElBQUkseUVBQWM7QUFDbEIsSUFBSSwwRUFBaUI7QUFDckIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWnlEOztBQUUxRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLDJEQUFrQixDQUFDLDREQUFtQjtBQUM5Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUkscUVBQTRCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxJQUFJLDBFQUFpQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEb0Q7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSxxRUFBeUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyQndCO0FBQzZDO0FBQzNCO0FBQ007O0FBRWpEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsWUFBWSw2REFBYTtBQUN6QixZQUFZLDRFQUFtQztBQUMvQztBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwrREFBc0I7QUFDOUIsUUFBUSx3REFBVztBQUNuQixRQUFRLDhEQUFpQjtBQUN6QixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLElBQUkscUVBQXlCO0FBQzdCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkRBQW9CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2QsZ0JBQWdCLHVFQUE4QjtBQUM5QyxnQkFBZ0IsOERBQWM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwS3VEO0FBQ2Q7O0FBRTFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQSxjQUFjO0FBQ2Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLCtEQUFzQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7O0FBRUEsMkNBQTJDLHdEQUFXO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLCtEQUFzQjtBQUM5Qyx3QkFBd0Isd0RBQVc7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLHdEQUFXO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtDQUErQyx3REFBVztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0RBQXNCO0FBQ3RDLGdCQUFnQix3REFBVztBQUMzQjtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msd0RBQVc7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQiwrREFBc0I7QUFDdEMsZ0JBQWdCLHdEQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzWW9EOztBQUVwRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLHFFQUF5QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDs7QUFFQSxhQUFhO0FBQ2IsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tb2R1bGVzL2NyZWF0ZVByb2plY3QuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tb2R1bGVzL2NyZWF0ZVRvZG8uanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tb2R1bGVzL3JlbmRlclBhZ2UuanMiLCJ3ZWJwYWNrOi8vdG9kby8uL3NyYy9tb2R1bGVzL3JlbmRlclByb2plY3RzLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbW9kdWxlcy9yZW5kZXJUb2RvLmpzIiwid2VicGFjazovL3RvZG8vLi9zcmMvbW9kdWxlcy9zdG9yYWdlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlbmRlclBhZ2UgfSBmcm9tIFwiLi9tb2R1bGVzL3JlbmRlclBhZ2UuanNcIjtcbmltcG9ydCB7IHRvZG9GYWN0b3J5IH0gZnJvbSBcIi4vbW9kdWxlcy9jcmVhdGVUb2RvLmpzXCI7XG5pbXBvcnQgeyBwcm9qZWN0RmFjdG9yeSwgY3JlYXRlUHJvamVjdHMgfSBmcm9tIFwiLi9tb2R1bGVzL2NyZWF0ZVByb2plY3QuanNcIjtcbmltcG9ydCB7IHJlbmRlclRvRG9PYmplY3RzIH0gZnJvbSBcIi4vbW9kdWxlcy9yZW5kZXJUb2RvLmpzXCI7XG5pbXBvcnQgeyBzdG9yZVByb2plY3RzLCBzdG9yZVRvZG9zIH0gZnJvbSBcIi4vbW9kdWxlcy9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyByZW5kZXJQcm9qZWN0TGlzdCB9IGZyb20gXCIuL21vZHVsZXMvcmVuZGVyUHJvamVjdHNcIjtcblxuY29uc3QgY3JlYXRlRGVmYXVsdFByb2plY3QgPSAoKCkgPT4ge1xuICAgIHN0b3JlUHJvamVjdHMuZ2V0UHJvamVjdExpc3QoKTtcbiAgICBzdG9yZVByb2plY3RzLnNldFByb2plY3RMaXN0KCk7XG4gICAgY3JlYXRlUHJvamVjdHMoKTtcbiAgICByZW5kZXJQcm9qZWN0TGlzdCgpO1xufSkoKTsiLCJpbXBvcnQgeyBzdG9yZVByb2plY3RzLCBwcm9qZWN0TGlzdCB9IGZyb20gXCIuL3N0b3JhZ2UuanNcIjtcblxuY29uc3QgcHJvamVjdEZhY3RvcnkgPSAodGl0bGUpID0+IHtcbiAgICBjb25zdCBwcm9qZWN0VG9kb0xpc3QgPSBbXTtcblxuICAgIGNvbnN0IHByb2plY3RUb2RvTGlzdFRpdGxlcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0VG9kb0xpc3QodG9kb09iamVjdCkge1xuICAgICAgICBwcm9qZWN0VG9kb0xpc3QucHVzaCh0b2RvT2JqZWN0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVGcm9tUHJvamVjdExpc3QodG9kb09iamVjdCkge1xuICAgICAgICBwcm9qZWN0VG9kb0xpc3Quc3BsaWNlKHByb2plY3RUb2RvTGlzdC5pbmRleE9mKHRvZG9PYmplY3QpLCAxKTtcbiAgICB9XG5cbiAgICBjb25zdCByZW1vdmVQcm9qZWN0RnJvbUxpc3QgPSAocHJvamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0TGlzdC5zcGxpY2UocHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRpdGxlLFxuICAgICAgICBwcm9qZWN0VG9kb0xpc3QsXG4gICAgICAgIHByb2plY3RUb2RvTGlzdFRpdGxlcyxcbiAgICAgICAgYWRkVG9Qcm9qZWN0VG9kb0xpc3QsXG4gICAgICAgIHJlbW92ZUZyb21Qcm9qZWN0TGlzdCxcbiAgICB9O1xufTtcblxuLy9Qcm9qZWN0IG9iamVjdHMgc3RvcmVkIGluIGEgbGlzdFxubGV0IHByb2plY3RPYmplY3RMaXN0ID0gW107XG5cbi8vQ3JlYXRlIHRoZSBwcm9qZWN0IG9iamVjdHMgYW5kIHB1c2ggdGhlbSB0byB0aGUgYWJvdmUgbGlzdFxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdHMoKSB7XG4gICAgc3RvcmVQcm9qZWN0cy5nZXRQcm9qZWN0TGlzdCgpO1xuICAgIGNvbnN0IHByb2plY3RPYmplY3RMaXN0VGl0bGVzID0gW107XG4gICAgcHJvamVjdE9iamVjdExpc3QuZm9yRWFjaCgocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICBwcm9qZWN0T2JqZWN0TGlzdFRpdGxlcy5wdXNoKHByb2plY3RPYmplY3QudGl0bGUpO1xuICAgIH0pO1xuICAgIHN0b3JlUHJvamVjdHMucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAoIXByb2plY3RPYmplY3RMaXN0VGl0bGVzLmluY2x1ZGVzKHByb2plY3QpKSB7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0ID0gcHJvamVjdEZhY3RvcnkocHJvamVjdCk7XG4gICAgICAgICAgICByZXR1cm4gcHJvamVjdE9iamVjdExpc3QucHVzaChuZXdQcm9qZWN0KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vL1JlbW92ZSBwcm9qZWN0cyBmcm9tIHRoZSBsaXN0IGFib3ZlXG5mdW5jdGlvbiByZW1vdmVQcm9qZWN0KHByb2plY3QpIHtcbiAgICBpZiAocHJvamVjdE9iamVjdExpc3QubGVuZ3RoID4gMSkge1xuICAgICAgICBwcm9qZWN0T2JqZWN0TGlzdC5zcGxpY2UocHJvamVjdE9iamVjdExpc3QuaW5kZXhPZihwcm9qZWN0KSwgMSk7XG4gICAgfSBlbHNlIGlmIChwcm9qZWN0T2JqZWN0TGlzdC5sZW5ndGggPT0gMSkge1xuICAgICAgICBwcm9qZWN0T2JqZWN0TGlzdCA9IFtdO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgcHJvamVjdEZhY3RvcnksIHByb2plY3RPYmplY3RMaXN0LCBjcmVhdGVQcm9qZWN0cywgcmVtb3ZlUHJvamVjdCB9OyIsImltcG9ydCB7IHByb2plY3RPYmplY3RMaXN0IH0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xuXG5jb25zdCB0b2RvRmFjdG9yeSA9IChcbiAgICB0aXRsZSxcbiAgICBkdWVEYXRlLFxuICAgIHByaW9yaXR5LFxuICAgIG5vdGUgPSBcIk5vbmVcIixcbiAgICBkb25lU3RhdHVzID0gXCJJbmNvbXBsZXRlXCJcbikgPT4ge1xuICAgIGxldCB0b2RvSW5mbyA9IFt0aXRsZSwgZHVlRGF0ZSwgcHJpb3JpdHksIG5vdGUsIGRvbmVTdGF0dXNdO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgdGl0bGUsXG4gICAgICAgIGR1ZURhdGUsXG4gICAgICAgIHByaW9yaXR5LFxuICAgICAgICBub3RlLFxuICAgICAgICBkb25lU3RhdHVzLFxuICAgICAgICB0b2RvSW5mbyxcbiAgICB9O1xufTtcblxuZnVuY3Rpb24gY3JlYXRlVG9kb3MoKSB7XG4gICAgcHJvamVjdE9iamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAocHJvamVjdC5wcm9qZWN0VG9kb0xpc3RUaXRsZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3RUaXRsZXMuZm9yRWFjaCgodGl0bGUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsb2NhbFRvZG9zID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGl0bGUgKyBcIiBcIiArIHRpdGxlICsgXCIgdG9kbyBpbmZvXCJcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGxvY2FsVG9kb3MgIT0gXCJcIiAmJiBsb2NhbFRvZG9zICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvSW5mbyA9IGxvY2FsU3RvcmFnZVtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QudGl0bGUgKyBcIiBcIiArIHRpdGxlICsgXCIgdG9kbyBpbmZvXCJcbiAgICAgICAgICAgICAgICAgICAgXS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdUb2RvID0gdG9kb0ZhY3RvcnkoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSW5mb1swXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9JbmZvWzFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0luZm9bMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvSW5mb1szXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9JbmZvWzRdXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvamVjdFRvZG9UaXRsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdFRvZG9UaXRsZXMucHVzaCh0b2RvLnRpdGxlKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9qZWN0VG9kb1RpdGxlcy5pbmNsdWRlcyh0aXRsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QuYWRkVG9Qcm9qZWN0VG9kb0xpc3QobmV3VG9kbyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5leHBvcnQgeyB0b2RvRmFjdG9yeSwgY3JlYXRlVG9kb3MgfTsiLCJjb25zdCByZW5kZXJQYWdlID0gKCgpID0+IHtcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXG4gICAgY29uc3QgaGVhZGluZ0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaGVhZGluZ0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcImhlYWRpbmdDb250YWluZXJcIik7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgxXCIpO1xuICAgIGhlYWRpbmcudGV4dENvbnRlbnQgPSBcIlRvZG8gTGlzdFwiO1xuXG4gICAgaGVhZGluZ0NvbnRhaW5lci5hcHBlbmQoaGVhZGluZyk7XG4gICAgY29udGVudC5hcHBlbmQoaGVhZGluZ0NvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwcm9qZWN0QW5kVG9kb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdEFuZFRvZG9Db250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0QW5kVG9kb0NvbnRhaW5lclwiKTtcbiAgICBjb250ZW50LmFwcGVuZChwcm9qZWN0QW5kVG9kb0NvbnRhaW5lcik7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcHJvamVjdHMuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0c1wiKTtcblxuICAgIHByb2plY3RBbmRUb2RvQ29udGFpbmVyLmFwcGVuZChwcm9qZWN0cyk7XG5cbiAgICBjb25zdCBwcm9qZWN0c0xpc3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RzTGlzdENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RzTGlzdENvbnRhaW5lclwiKTtcblxuICAgIHByb2plY3RzLmFwcGVuZChwcm9qZWN0c0xpc3RDb250YWluZXIpO1xufSkoKTtcblxuZXhwb3J0IHsgcmVuZGVyUGFnZSB9OyIsImltcG9ydCB7XG4gICAgcHJvamVjdE9iamVjdExpc3QsXG4gICAgY3JlYXRlUHJvamVjdHMsXG4gICAgcmVtb3ZlUHJvamVjdCxcbn0gZnJvbSBcIi4vY3JlYXRlUHJvamVjdFwiO1xuaW1wb3J0IHsgcHJvamVjdExpc3QsIHN0b3JlUHJvamVjdHMsIHN0b3JlVG9kb3MgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5pbXBvcnQgeyBjcmVhdGVUb2RvcyB9IGZyb20gXCIuL2NyZWF0ZVRvZG9cIjtcbmltcG9ydCB7IHJlbmRlclRvRG9PYmplY3RzIH0gZnJvbSBcIi4vcmVuZGVyVG9kb1wiO1xuXG5jb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250ZW50XCIpO1xuXG4vL1JlbmRlciBhIHByb2plY3RcbmNvbnN0IHJlbmRlclByb2plY3QgPSAocHJvamVjdCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXG4gICAgcHJvamVjdERpdi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RcIik7XG5cbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICBwcm9qZWN0VGl0bGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9qZWN0VGl0bGVcIik7XG4gICAgcHJvamVjdFRpdGxlLmFwcGVuZChwcm9qZWN0LnRpdGxlKTtcblxuICAgIHByb2plY3REaXYuYXBwZW5kKHByb2plY3RUaXRsZSk7XG4gICAgcHJvamVjdHNMaXN0Q29udGFpbmVyLmFwcGVuZChwcm9qZWN0RGl2KTtcblxuICAgIGNvbnN0IHByb2plY3RSZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIHByb2plY3RSZW1vdmVCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcm9qZWN0UmVtb3ZlQnRuXCIpO1xuICAgIHByb2plY3RSZW1vdmVCdG4udGV4dENvbnRlbnQgPSBcIlhcIjtcbiAgICBwcm9qZWN0UmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCBwYWdlT3ZlcmxheSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHBhZ2VPdmVybGF5LnNldEF0dHJpYnV0ZShcImlkXCIsIFwicGFnZU92ZXJsYXlcIik7XG5cbiAgICAgICAgcGFnZU92ZXJsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBwYWdlT3ZlcmxheS5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9Qcm9qZWN0IGRlbGV0ZSBjb25maXJtYXRpb24gcHJvbXB0XG4gICAgICAgIGNvbnN0IHJlbW92ZVByb2plY3RDaGVja0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHJlbW92ZVByb2plY3RDaGVja0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICBcImlkXCIsXG4gICAgICAgICAgICBcInJlbW92ZVByb2plY3RDaGVja0NvbnRhaW5lclwiXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlUHJvamVjdENoZWNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICByZW1vdmVQcm9qZWN0Q2hlY2tUZXh0LnRleHRDb250ZW50ID1cbiAgICAgICAgICAgIFwiQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlbW92ZSB0aGlzIHByb2plY3Q/IFxcbiBBbGwgdG9kbyBpdGVtcyB3aWxsIGJlIGxvc3QuXCI7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlUHJvamVjdENoZWNrWWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgcmVtb3ZlUHJvamVjdENoZWNrWWVzLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicmVtb3ZlQ2hlY2tCdG5cIik7XG4gICAgICAgIHJlbW92ZVByb2plY3RDaGVja1llcy50ZXh0Q29udGVudCA9IFwiUmVtb3ZlXCI7XG4gICAgICAgIHJlbW92ZVByb2plY3RDaGVja1llcy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0LmZvckVhY2goKGkpID0+IHtcbiAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdC50aXRsZSArIFwiIFwiICsgaS50aXRsZSArIFwiIHRvZG8gaW5mb1wiXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0ocHJvamVjdC50aXRsZSArIFwiIHByb2plY3QgdG9kbyBsaXN0XCIpO1xuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgICAgIHN0b3JlUHJvamVjdHMucmVtb3ZlUHJvamVjdEZyb21MaXN0KHByb2plY3QpO1xuICAgICAgICAgICAgcGFnZU92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAgICAgICBwcm9qZWN0RGl2LnJlbW92ZSgpO1xuICAgICAgICAgICAgdG9kb0NvbnRhaW5lci5yZW1vdmUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVtb3ZlUHJvamVjdENoZWNrTm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICByZW1vdmVQcm9qZWN0Q2hlY2tOby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInJlbW92ZUNoZWNrQnRuXCIpO1xuICAgICAgICByZW1vdmVQcm9qZWN0Q2hlY2tOby50ZXh0Q29udGVudCA9IFwiQ2FuY2VsXCI7XG4gICAgICAgIHJlbW92ZVByb2plY3RDaGVja05vLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgcGFnZU92ZXJsYXkucmVtb3ZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJlbW92ZVByb2plY3RDaGVja0NvbnRhaW5lci5hcHBlbmQoXG4gICAgICAgICAgICByZW1vdmVQcm9qZWN0Q2hlY2tUZXh0LFxuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdENoZWNrWWVzLFxuICAgICAgICAgICAgcmVtb3ZlUHJvamVjdENoZWNrTm9cbiAgICAgICAgKTtcbiAgICAgICAgcGFnZU92ZXJsYXkuYXBwZW5kKHJlbW92ZVByb2plY3RDaGVja0NvbnRhaW5lcik7XG4gICAgICAgIGNvbnRlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBwYWdlT3ZlcmxheSk7XG4gICAgfSk7XG5cbiAgICBwcm9qZWN0RGl2LmFwcGVuZChwcm9qZWN0UmVtb3ZlQnRuKTtcblxuICAgIHByb2plY3REaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RvZG9Db250YWluZXJcIik7XG4gICAgICAgIGlmIChjb250ZW50LmNvbnRhaW5zKHRvZG9Db250YWluZXIpKSB7XG4gICAgICAgICAgICB0b2RvQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHN0b3JlVG9kb3MuZ2V0VG9kb0xpc3QoKTtcbiAgICAgICAgY3JlYXRlVG9kb3MoKTtcbiAgICAgICAgcmVuZGVyVG9Eb09iamVjdHMocHJvamVjdCk7XG4gICAgfSk7XG59O1xuXG4vL1JlbmRlcnMgYWxsIHByb2plY3RzXG5jb25zdCByZW5kZXJQcm9qZWN0TGlzdCA9ICgpID0+IHtcbiAgICBwcm9qZWN0T2JqZWN0TGlzdC5mb3JFYWNoKChsaXN0SXRlbSkgPT4ge1xuICAgICAgICByZW5kZXJQcm9qZWN0KGxpc3RJdGVtKTtcbiAgICB9KTtcbn07XG5cbmNvbnN0IHJlbmRlclByb2plY3RDcmVhdGVCdG4gPSAoKCkgPT4ge1xuICAgIGNvbnN0IHByb2plY3RDcmVhdGVCdG5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHByb2plY3RDcmVhdGVCdG5Db250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0Q3JlYXRlQnRuQ29udGFpbmVyXCIpO1xuXG4gICAgY29uc3QgcHJvamVjdENyZWF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgcHJvamVjdENyZWF0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInByb2plY3RDcmVhdGVCdG5cIik7XG4gICAgcHJvamVjdENyZWF0ZUJ0bi50ZXh0Q29udGVudCA9IFwiQ3JlYXRlIFByb2plY3RcIjtcbiAgICBwcm9qZWN0Q3JlYXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICBwcm9qZWN0Q3JlYXRlQnRuLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBjcmVhdGVQcm9qZWN0UG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjcmVhdGVQcm9qZWN0UG9wdXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjcmVhdGVQcm9qZWN0UG9wdXBcIik7XG4gICAgICAgIHByb2plY3RzLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgY3JlYXRlUHJvamVjdFBvcHVwKTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHByb2plY3RUaXRsZVRleHQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0VGl0bGVUZXh0XCIpO1xuICAgICAgICBwcm9qZWN0VGl0bGVUZXh0LnRleHRDb250ZW50ID0gXCJUaXRsZTpcIjtcbiAgICAgICAgY3JlYXRlUHJvamVjdFBvcHVwLmFwcGVuZChwcm9qZWN0VGl0bGVUZXh0KTtcblxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdFRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJwcm9qZWN0VGl0bGVJbnB1dFwiKTtcbiAgICAgICAgcHJvamVjdFRpdGxlSW5wdXQuc2V0QXR0cmlidXRlKFwicGxhY2Vob2xkZXJcIiwgXCJOZXcgUHJvamVjdFwiKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdFBvcHVwLmFwcGVuZChwcm9qZWN0VGl0bGVJbnB1dCk7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdEV4aXN0c0Vycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHByb2plY3RFeGlzdHNFcnJvci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInByb2plY3RFeGlzdHNFcnJvclwiKTtcbiAgICAgICAgcHJvamVjdEV4aXN0c0Vycm9yLnRleHRDb250ZW50ID0gXCJQcm9qZWN0IGFscmVhZHkgZXhpc3RzIVwiO1xuXG4gICAgICAgIGNvbnN0IG5vTmFtZUVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5vTmFtZUVycm9yLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibm9OYW1lRXJyb3JcIik7XG4gICAgICAgIG5vTmFtZUVycm9yLnRleHRDb250ZW50ID0gXCJFbnRlciBhIG5hbWUhXCI7XG5cbiAgICAgICAgY29uc3QgcHJvamVjdFN1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHByb2plY3RTdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcbiAgICAgICAgcHJvamVjdFN1Ym1pdEJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ0blwiKTtcbiAgICAgICAgcHJvamVjdFN1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TGlzdC5pbmNsdWRlcyhwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZVByb2plY3RQb3B1cC5jb250YWlucyhwcm9qZWN0RXhpc3RzRXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RQb3B1cC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFmdGVyZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0RXhpc3RzRXJyb3JcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlSW5wdXQudmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGNyZWF0ZVByb2plY3RQb3B1cC5pbnNlcnRBZGphY2VudEVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgIFwiYWZ0ZXJlbmRcIixcbiAgICAgICAgICAgICAgICAgICAgbm9OYW1lRXJyb3JcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocHJvamVjdFRpdGxlSW5wdXQudmFsdWUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHN0b3JlUHJvamVjdHMuYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0VGl0bGVJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgY3JlYXRlUHJvamVjdHMoKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVQcm9qZWN0UG9wdXAucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgcHJvamVjdFRpdGxlSW5wdXQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgcHJvamVjdFN1Ym1pdEJ0bi5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q3JlYXRlQnRuQ29udGFpbmVyLmFwcGVuZChwcm9qZWN0Q3JlYXRlQnRuKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0c0xpc3RDb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9qZWN0TGlzdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY3JlYXRlUHJvamVjdFBvcHVwLmFwcGVuZChwcm9qZWN0U3VibWl0QnRuKTtcbiAgICB9KTtcblxuICAgIHByb2plY3RDcmVhdGVCdG5Db250YWluZXIuYXBwZW5kKHByb2plY3RDcmVhdGVCdG4pO1xuICAgIHByb2plY3RzLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgcHJvamVjdENyZWF0ZUJ0bkNvbnRhaW5lcik7XG59KSgpO1xuXG5leHBvcnQgeyByZW5kZXJQcm9qZWN0TGlzdCB9OyIsImltcG9ydCB7IHRvZG9GYWN0b3J5LCBjcmVhdGVUb2RvcyB9IGZyb20gXCIuL2NyZWF0ZVRvZG9cIjtcbmltcG9ydCB7IHN0b3JlVG9kb3MgfSBmcm9tIFwiLi9zdG9yYWdlLmpzXCI7XG5cbmNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbnRlbnRcIik7XG5cbi8vUmVuZGVyIGFsbCB0b2RvcyBmb3IgYSBwcm9qZWN0XG5jb25zdCByZW5kZXJUb0RvT2JqZWN0cyA9IChwcm9qZWN0KSA9PiB7XG4gICAgbGV0IHRvZG9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRvZG9Db250YWluZXIuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJ0b2RvQ29udGFpbmVyXCIpO1xuXG4gICAgaWYgKHByb2plY3QucHJvamVjdFRvZG9MaXN0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3QuZm9yRWFjaCgoaSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdG9kbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBpZiAoaS5kb25lU3RhdHVzID09IFwiQ29tcGxldGVcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvQ29tcGxldGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmRvbmVTdGF0dXMgPT0gXCJJbmNvbXBsZXRlXCIgJiYgaS5wcmlvcml0eSA9PSBcIkhpZ2hcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvSGlnaFByaW9yaXR5XCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpLmRvbmVTdGF0dXMgPT0gXCJJbmNvbXBsZXRlXCIgJiYgaS5wcmlvcml0eSA9PSBcIk1lZGl1bVwiKSB7XG4gICAgICAgICAgICAgICAgdG9kby5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9NZWRpdW1Qcmlvcml0eVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaS5kb25lU3RhdHVzID09IFwiSW5jb21wbGV0ZVwiICYmIGkucHJpb3JpdHkgPT0gXCJMb3dcIikge1xuICAgICAgICAgICAgICAgIHRvZG8uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvTG93UHJpb3JpdHlcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IHRvZG9JbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgIHRvZG9JbmZvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb0luZm9cIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvZG9UaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgdG9kb1RpdGxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb1RpdGxlXCIpO1xuICAgICAgICAgICAgdG9kb1RpdGxlLmFwcGVuZChpLnRpdGxlKTtcblxuICAgICAgICAgICAgY29uc3QgZHVlRGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICBkdWVEYXRlQ29udGFpbmVyLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiZHVlRGF0ZUNvbnRhaW5lclwiKTtcblxuICAgICAgICAgICAgY29uc3QgdG9kb0R1ZURhdGVIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICB0b2RvRHVlRGF0ZUhlYWRpbmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvRHVlRGF0ZUhlYWRpbmdcIik7XG4gICAgICAgICAgICBpZiAoaS5kdWVEYXRlICE9IHVuZGVmaW5lZCAmJiBpLmR1ZURhdGUgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIHRvZG9EdWVEYXRlSGVhZGluZy50ZXh0Q29udGVudCA9IFwiRHVlIERhdGU6IFwiICsgaS5kdWVEYXRlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgdG9kb1ByaW9yaXR5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICBcImNsYXNzXCIsXG4gICAgICAgICAgICAgICAgXCJ0b2RvUHJpb3JpdHlDb250YWluZXJcIlxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgY29uc3QgcHJpb3JpdHlIZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICBwcmlvcml0eUhlYWRpbmcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwcmlvcml0eUhlYWRpbmdcIik7XG4gICAgICAgICAgICBwcmlvcml0eUhlYWRpbmcudGV4dENvbnRlbnQgPSBcIlByaW9yaXR5OiBcIiArIGkucHJpb3JpdHk7XG5cbiAgICAgICAgICAgIGNvbnN0IHRvZG9Ob3RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgICAgICB0b2RvTm90ZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9Ob3RlXCIpO1xuICAgICAgICAgICAgaWYgKGkubm90ZSAhPSB1bmRlZmluZWQgJiYgdG9kby5ub3RlICE9IFwiXCIpIHtcbiAgICAgICAgICAgICAgICB0b2RvTm90ZS50ZXh0Q29udGVudCA9IFwiTm90ZTogXFxuXCIgKyBpLm5vdGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGR1ZURhdGVDb250YWluZXIuYXBwZW5kKHRvZG9EdWVEYXRlSGVhZGluZyk7XG4gICAgICAgICAgICB0b2RvUHJpb3JpdHlDb250YWluZXIuYXBwZW5kKHByaW9yaXR5SGVhZGluZyk7XG4gICAgICAgICAgICB0b2RvSW5mby5hcHBlbmQoXG4gICAgICAgICAgICAgICAgdG9kb1RpdGxlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGVDb250YWluZXIsXG4gICAgICAgICAgICAgICAgdG9kb1ByaW9yaXR5Q29udGFpbmVyLFxuICAgICAgICAgICAgICAgIHRvZG9Ob3RlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdG9kby5hcHBlbmQodG9kb0luZm8pO1xuXG4gICAgICAgICAgICAvL1RvZG8gcmVtb3ZlIGZ1bmN0aW9uYWxpdHlcbiAgICAgICAgICAgIGNvbnN0IHRvZG9SZW1vdmVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgdG9kb1JlbW92ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9SZW1vdmVCdG5cIik7XG4gICAgICAgICAgICB0b2RvUmVtb3ZlQnRuLnRleHRDb250ZW50ID0gXCJYXCI7XG4gICAgICAgICAgICB0b2RvUmVtb3ZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIHByb2plY3QucmVtb3ZlRnJvbVByb2plY3RMaXN0KGkpO1xuICAgICAgICAgICAgICAgIHN0b3JlVG9kb3Muc2V0VG9kb0xpc3QocHJvamVjdCk7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGl0bGUgKyBcIiBcIiArIGkudGl0bGUgKyBcIiB0b2RvIGluZm9cIixcbiAgICAgICAgICAgICAgICAgICAgdG9kby50b2RvSW5mb1xuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2VbcHJvamVjdC50aXRsZSArIFwiIHByb2plY3QgdG9kbyBsaXN0XCJdLmxlbmd0aCA9PVxuICAgICAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdC50aXRsZSArIFwiIHByb2plY3QgdG9kbyBsaXN0XCJcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdG9kby5yZW1vdmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0b2RvLmFwcGVuZCh0b2RvUmVtb3ZlQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdG9kb0VkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICAgICAgdG9kb0VkaXRCdXR0b24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJidG5cIik7XG4gICAgICAgICAgICB0b2RvRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IFwiRWRpdFwiO1xuXG4gICAgICAgICAgICB0b2RvRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0b2RvRWRpdEJ1dHRvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlZGl0VG9kb1BvcHVwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgICAgICAgICBlZGl0VG9kb1BvcHVwLnNldEF0dHJpYnV0ZShcImlkXCIsIFwiZWRpdFRvZG9Qb3B1cFwiKTtcblxuICAgICAgICAgICAgICAgIHRvZG8uYXBwZW5kKGVkaXRUb2RvUG9wdXApO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb1RpdGxlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICAgICAgICAgIHRvZG9UaXRsZVRleHQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvVGl0bGVUZXh0XCIpO1xuICAgICAgICAgICAgICAgIHRvZG9UaXRsZVRleHQudGV4dENvbnRlbnQgPSBcIlRpdGxlOlwiO1xuICAgICAgICAgICAgICAgIGVkaXRUb2RvUG9wdXAuYXBwZW5kKHRvZG9UaXRsZVRleHQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb1RpdGxlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgdG9kb1RpdGxlSW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvVGl0bGVJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvVGl0bGVJbnB1dC52YWx1ZSA9IGkudGl0bGU7XG4gICAgICAgICAgICAgICAgZWRpdFRvZG9Qb3B1cC5hcHBlbmQodG9kb1RpdGxlSW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb0R1ZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvRHVlVGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZG9EdWVUZXh0XCIpO1xuICAgICAgICAgICAgICAgIHRvZG9EdWVUZXh0LnRleHRDb250ZW50ID0gXCJEdWU6XCI7XG4gICAgICAgICAgICAgICAgZWRpdFRvZG9Qb3B1cC5hcHBlbmQodG9kb0R1ZVRleHQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb0R1ZURhdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb0R1ZURhdGVJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJkYXRlXCIpO1xuICAgICAgICAgICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUgPSBpLmR1ZURhdGU7XG4gICAgICAgICAgICAgICAgZWRpdFRvZG9Qb3B1cC5hcHBlbmQodG9kb0R1ZURhdGVJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJ0b2RvUHJpb3JpdHlJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlMYWJlbC50ZXh0Q29udGVudCA9IFwiUHJpb3JpdHk6IFwiO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb1ByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2VsZWN0XCIpO1xuICAgICAgICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0b2RvUHJpb3JpdHlJbnB1dFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9Qcmlvcml0eUlucHV0XCIpO1xuXG4gICAgICAgICAgICAgICAgY29uc3QgdG9kb1ByaW9yaXR5TG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlMb3cuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJMb3dcIik7XG4gICAgICAgICAgICAgICAgdG9kb1ByaW9yaXR5TG93LnRleHRDb250ZW50ID0gXCJMb3dcIjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9Qcmlvcml0eU1lZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgICAgICAgdG9kb1ByaW9yaXR5TWVkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiTWVkaXVtXCIpO1xuICAgICAgICAgICAgICAgIHRvZG9Qcmlvcml0eU1lZC50ZXh0Q29udGVudCA9IFwiTWVkaXVtXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlIaWdoID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlIaWdoLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiSGlnaFwiKTtcbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlIaWdoLnRleHRDb250ZW50ID0gXCJIaWdoXCI7XG5cbiAgICAgICAgICAgICAgICB0b2RvUHJpb3JpdHlJbnB1dC5hcHBlbmQoXG4gICAgICAgICAgICAgICAgICAgIHRvZG9Qcmlvcml0eUhpZ2gsXG4gICAgICAgICAgICAgICAgICAgIHRvZG9Qcmlvcml0eU1lZCxcbiAgICAgICAgICAgICAgICAgICAgdG9kb1ByaW9yaXR5TG93XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIGVkaXRUb2RvUG9wdXAuYXBwZW5kKHRvZG9Qcmlvcml0eUxhYmVsLCB0b2RvUHJpb3JpdHlJbnB1dCk7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvTm90ZUlucHV0TGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG4gICAgICAgICAgICAgICAgdG9kb05vdGVJbnB1dExhYmVsLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb05vdGVJbnB1dExhYmVsXCIpO1xuICAgICAgICAgICAgICAgIHRvZG9Ob3RlSW5wdXRMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJ0b2RvTm90ZUlucHV0XCIpO1xuICAgICAgICAgICAgICAgIHRvZG9Ob3RlSW5wdXRMYWJlbC50ZXh0Q29udGVudCA9IFwiTm90ZTpcIjtcblxuICAgICAgICAgICAgICAgIGNvbnN0IHRvZG9Ob3RlSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgICAgICAgICAgICAgdG9kb05vdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9Ob3RlSW5wdXRcIik7XG5cbiAgICAgICAgICAgICAgICBlZGl0VG9kb1BvcHVwLmFwcGVuZCh0b2RvTm90ZUlucHV0TGFiZWwsIHRvZG9Ob3RlSW5wdXQpO1xuXG4gICAgICAgICAgICAgICAgY29uc3Qgbm9OYW1lRXJyb3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgICAgICAgICBub05hbWVFcnJvci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcIm5vTmFtZUVycm9yXCIpO1xuICAgICAgICAgICAgICAgIG5vTmFtZUVycm9yLnRleHRDb250ZW50ID0gXCJFbnRlciBhIG5hbWUhXCI7XG5cbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvU3VibWl0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgICAgICB0b2RvU3VibWl0QnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiYnRuXCIpO1xuICAgICAgICAgICAgICAgIHRvZG9TdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcbiAgICAgICAgICAgICAgICB0b2RvU3VibWl0QnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG9kb1RpdGxlSW5wdXQudmFsdWUgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFlZGl0VG9kb1BvcHVwLmNvbnRhaW5zKG5vTmFtZUVycm9yKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRUb2RvUG9wdXAuYXBwZW5kKG5vTmFtZUVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2RvVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIudG9kb1RpdGxlSW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWRpdGVkVG9kbyA9IHRvZG9GYWN0b3J5KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9UaXRsZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb05vdGVJbnB1dC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0LnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdC5pbmRleE9mKGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGVkVG9kb1xuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0VGl0bGVzLnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdFRpdGxlcy5pbmRleE9mKGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGVkVG9kby50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QudGl0bGUgKyBcIiBcIiArIGkudGl0bGUgKyBcIiB0b2RvIGluZm9cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY29udGFpbnModG9kb0NvbnRhaW5lcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2RvQ29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9yZVRvZG9zLnNldFRvZG9MaXN0KHByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlVG9kb3MoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbmRlclRvRG9PYmplY3RzKHByb2plY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0NvbXBsZXRlQnRuLmluc2VydEFkamFjZW50RWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImJlZm9yZWJlZ2luXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9kb0VkaXRCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlZGl0VG9kb1BvcHVwLmFwcGVuZCh0b2RvU3VibWl0QnRuKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0b2RvLmFwcGVuZCh0b2RvRWRpdEJ1dHRvbik7XG5cbiAgICAgICAgICAgIC8vVG9kbyBjb21wbGV0ZSBidXR0b25cblxuICAgICAgICAgICAgY29uc3QgdG9kb0NvbXBsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICAgICAgICAgIHRvZG9Db21wbGV0ZUJ0bi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcImJ0blwiKTtcbiAgICAgICAgICAgIHRvZG9Db21wbGV0ZUJ0bi50ZXh0Q29udGVudCA9IFwiQ29tcGxldGVcIjtcblxuICAgICAgICAgICAgdG9kb0NvbXBsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoaS5kb25lU3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJJbmNvbXBsZXRlXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV0ZVRvZG8gPSB0b2RvRmFjdG9yeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkuZHVlRGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLnByaW9yaXR5LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGkubm90ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIkNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb0NvbXBsZXRlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0LnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdC5pbmRleE9mKGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGxldGVUb2RvXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3RUaXRsZXMuc3BsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0VGl0bGVzLmluZGV4T2YoaSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZVRvZG8udGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiQ29tcGxldGVcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGluY29tcGxldGVUb2RvID0gdG9kb0ZhY3RvcnkoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaS50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLmR1ZURhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaS5wcmlvcml0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpLm5vdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJJbmNvbXBsZXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2RvLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0LnNwbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdC5pbmRleE9mKGkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jb21wbGV0ZVRvZG9cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdFRpdGxlcy5zcGxpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3RUaXRsZXMuaW5kZXhPZihpKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY29tcGxldGVUb2RvLnRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNvbnRhaW5zKHRvZG9Db250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXG4gICAgICAgICAgICAgICAgICAgIHByb2plY3QudGl0bGUgKyBcIiBcIiArIGkudGl0bGUgKyBcIiB0b2RvIGluZm9cIlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgc3RvcmVUb2Rvcy5zZXRUb2RvTGlzdChwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2RvcygpO1xuICAgICAgICAgICAgICAgIHJlbmRlclRvRG9PYmplY3RzKHByb2plY3QpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRvZG8uYXBwZW5kKHRvZG9Db21wbGV0ZUJ0bik7XG5cbiAgICAgICAgICAgIHRvZG9Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCB0b2RvKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9Ub2RvIGNyZWF0ZSBmdW5jdGlvbmFsaXR5XG4gICAgY29uc3QgdG9kb0NyZWF0ZUJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdG9kb0NyZWF0ZUJ0bkNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9DcmVhdGVCdG5Db250YWluZXJcIik7XG5cbiAgICBjb25zdCB0b2RvQ3JlYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgICB0b2RvQ3JlYXRlQnRuLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb0NyZWF0ZUJ0blwiKTtcbiAgICB0b2RvQ3JlYXRlQnRuLnRleHRDb250ZW50ID0gXCJOZXcgVG9kb1wiO1xuXG4gICAgdG9kb0NyZWF0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgdG9kb0NyZWF0ZUJ0bi5yZW1vdmUoKTtcblxuICAgICAgICBjb25zdCBjcmVhdGVUb2RvUG9wdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjcmVhdGVUb2RvUG9wdXAuc2V0QXR0cmlidXRlKFwiaWRcIiwgXCJjcmVhdGVUb2RvUG9wdXBcIik7XG4gICAgICAgIHRvZG9Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYWZ0ZXJiZWdpblwiLCBjcmVhdGVUb2RvUG9wdXApO1xuXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgdG9kb1RpdGxlVGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZG9UaXRsZVRleHRcIik7XG4gICAgICAgIHRvZG9UaXRsZVRleHQudGV4dENvbnRlbnQgPSBcIlRpdGxlOlwiO1xuICAgICAgICBjcmVhdGVUb2RvUG9wdXAuYXBwZW5kKHRvZG9UaXRsZVRleHQpO1xuXG4gICAgICAgIGNvbnN0IHRvZG9UaXRsZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICB0b2RvVGl0bGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9UaXRsZUlucHV0XCIpO1xuICAgICAgICBjcmVhdGVUb2RvUG9wdXAuYXBwZW5kKHRvZG9UaXRsZUlucHV0KTtcblxuICAgICAgICBjb25zdCB0b2RvRHVlVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICB0b2RvRHVlVGV4dC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBcInRvZG9EdWVUZXh0XCIpO1xuICAgICAgICB0b2RvRHVlVGV4dC50ZXh0Q29udGVudCA9IFwiRHVlOlwiO1xuICAgICAgICBjcmVhdGVUb2RvUG9wdXAuYXBwZW5kKHRvZG9EdWVUZXh0KTtcblxuICAgICAgICBjb25zdCB0b2RvRHVlRGF0ZUlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICB0b2RvRHVlRGF0ZUlucHV0LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwidG9kb0R1ZURhdGVJbnB1dFwiKTtcbiAgICAgICAgdG9kb0R1ZURhdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiZGF0ZVwiKTtcbiAgICAgICAgY3JlYXRlVG9kb1BvcHVwLmFwcGVuZCh0b2RvRHVlRGF0ZUlucHV0KTtcblxuICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcbiAgICAgICAgdG9kb1ByaW9yaXR5TGFiZWwuc2V0QXR0cmlidXRlKFwiZm9yXCIsIFwidG9kb1ByaW9yaXR5SW5wdXRcIik7XG4gICAgICAgIHRvZG9Qcmlvcml0eUxhYmVsLnRleHRDb250ZW50ID0gXCJQcmlvcml0eTpcIjtcblxuICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzZWxlY3RcIik7XG4gICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJ0b2RvUHJpb3JpdHlJbnB1dFwiKTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SW5wdXQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvUHJpb3JpdHlJbnB1dFwiKTtcblxuICAgICAgICBjb25zdCB0b2RvUHJpb3JpdHlMb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICB0b2RvUHJpb3JpdHlMb3cuc2V0QXR0cmlidXRlKFwidmFsdWVcIiwgXCJMb3dcIik7XG4gICAgICAgIHRvZG9Qcmlvcml0eUxvdy50ZXh0Q29udGVudCA9IFwiTG93XCI7XG5cbiAgICAgICAgY29uc3QgdG9kb1ByaW9yaXR5TWVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcbiAgICAgICAgdG9kb1ByaW9yaXR5TWVkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiTWVkaXVtXCIpO1xuICAgICAgICB0b2RvUHJpb3JpdHlNZWQudGV4dENvbnRlbnQgPSBcIk1lZGl1bVwiO1xuXG4gICAgICAgIGNvbnN0IHRvZG9Qcmlvcml0eUhpZ2ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpO1xuICAgICAgICB0b2RvUHJpb3JpdHlIaWdoLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsIFwiSGlnaFwiKTtcbiAgICAgICAgdG9kb1ByaW9yaXR5SGlnaC50ZXh0Q29udGVudCA9IFwiSGlnaFwiO1xuXG4gICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LmFwcGVuZChcbiAgICAgICAgICAgIHRvZG9Qcmlvcml0eUhpZ2gsXG4gICAgICAgICAgICB0b2RvUHJpb3JpdHlNZWQsXG4gICAgICAgICAgICB0b2RvUHJpb3JpdHlMb3dcbiAgICAgICAgKTtcblxuICAgICAgICBjcmVhdGVUb2RvUG9wdXAuYXBwZW5kKHRvZG9Qcmlvcml0eUxhYmVsLCB0b2RvUHJpb3JpdHlJbnB1dCk7XG5cbiAgICAgICAgY29uc3QgdG9kb05vdGVJbnB1dExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuICAgICAgICB0b2RvTm90ZUlucHV0TGFiZWwuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJ0b2RvTm90ZUlucHV0TGFiZWxcIik7XG4gICAgICAgIHRvZG9Ob3RlSW5wdXRMYWJlbC5zZXRBdHRyaWJ1dGUoXCJmb3JcIiwgXCJ0b2RvTm90ZUlucHV0XCIpO1xuICAgICAgICB0b2RvTm90ZUlucHV0TGFiZWwudGV4dENvbnRlbnQgPSBcIk5vdGU6XCI7XG5cbiAgICAgICAgY29uc3QgdG9kb05vdGVJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICAgICAgdG9kb05vdGVJbnB1dC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInRvZG9Ob3RlSW5wdXRcIik7XG5cbiAgICAgICAgY3JlYXRlVG9kb1BvcHVwLmFwcGVuZCh0b2RvTm90ZUlucHV0TGFiZWwsIHRvZG9Ob3RlSW5wdXQpO1xuXG4gICAgICAgIGNvbnN0IG5vTmFtZUVycm9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5vTmFtZUVycm9yLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwibm9OYW1lRXJyb3JcIik7XG4gICAgICAgIG5vTmFtZUVycm9yLnRleHRDb250ZW50ID0gXCJFbnRlciBhIG5hbWUhXCI7XG5cbiAgICAgICAgY29uc3QgdG9kb1N1Ym1pdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gICAgICAgIHRvZG9TdWJtaXRCdG4uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJidG5cIik7XG4gICAgICAgIHRvZG9TdWJtaXRCdG4udGV4dENvbnRlbnQgPSBcIlNhdmVcIjtcbiAgICAgICAgdG9kb1N1Ym1pdEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICh0b2RvVGl0bGVJbnB1dC52YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGVUb2RvUG9wdXAuY29udGFpbnMobm9OYW1lRXJyb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZVRvZG9Qb3B1cC5hcHBlbmQobm9OYW1lRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0b2RvVGl0bGVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgIFwiLnRvZG9UaXRsZUlucHV0XCJcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1RvZG8gPSB0b2RvRmFjdG9yeShcbiAgICAgICAgICAgICAgICAgICAgdG9kb1RpdGxlSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRvZG9EdWVEYXRlSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIHRvZG9Qcmlvcml0eUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICB0b2RvTm90ZUlucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdC5wdXNoKG5ld1RvZG8pO1xuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNvbnRhaW5zKHRvZG9Db250YWluZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvZG9Db250YWluZXIucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3RvcmVUb2Rvcy5zZXRUb2RvTGlzdChwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICBjcmVhdGVUb2RvcygpO1xuICAgICAgICAgICAgICAgIHByb2plY3QucHJvamVjdFRvZG9MaXN0VGl0bGVzLnB1c2godG9kb1RpdGxlSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJlbmRlclRvRG9PYmplY3RzKHByb2plY3QpO1xuICAgICAgICAgICAgICAgIHRvZG9DcmVhdGVCdG5Db250YWluZXIuYXBwZW5kKHRvZG9DcmVhdGVCdG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgY3JlYXRlVG9kb1BvcHVwLmFwcGVuZCh0b2RvU3VibWl0QnRuKTtcbiAgICB9KTtcbiAgICB0b2RvQ3JlYXRlQnRuQ29udGFpbmVyLmFwcGVuZCh0b2RvQ3JlYXRlQnRuKTtcbiAgICB0b2RvQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgdG9kb0NyZWF0ZUJ0bkNvbnRhaW5lcik7XG4gICAgcHJvamVjdEFuZFRvZG9Db250YWluZXIuYXBwZW5kKHRvZG9Db250YWluZXIpO1xufTtcbmV4cG9ydCB7IHJlbmRlclRvRG9PYmplY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdE9iamVjdExpc3QgfSBmcm9tIFwiLi9jcmVhdGVQcm9qZWN0XCI7XG5cbi8vS2VlcCBhIGxpc3Qgb2YgcHJvamVjdHMsIGFkZGVkIHRvIGxvY2FsU3RvcmFnZVxuY29uc3QgcHJvamVjdExpc3QgPSBbXTtcblxuLy9DcmVhdGUgdGhlIGRlZmF1bHQgcHJvamVjdCBpZiBubyBvdGhlcnMgYXJlIHByZXNlbnRcbmlmIChsb2NhbFN0b3JhZ2UubGVuZ3RoID09IDApIHtcbiAgICBwcm9qZWN0TGlzdC5wdXNoKFwiRGVmYXVsdCBQcm9qZWN0XCIpO1xufVxuXG5jb25zdCBzdG9yZVByb2plY3RzID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBzZXRQcm9qZWN0TGlzdCgpIHtcbiAgICAgICAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKHByb2plY3QgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdExpc3RcIiwgcHJvamVjdExpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQcm9qZWN0TGlzdCgpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgc2V0UHJvamVjdExpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JlZFByb2plY3RMaXN0ID0gbG9jYWxTdG9yYWdlW1wicHJvamVjdExpc3RcIl0uc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgc3RvcmVkUHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghcHJvamVjdExpc3QuaW5jbHVkZXMocHJvamVjdCkgfHwgcHJvamVjdExpc3QubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vQWRkIGFuZCByZW1vdmUgcHJvamVjdHMgdG8gdGhlIHByb2plY3QgbGlzdCBzbyB0aGV5IGNhbiBiZSBzYXZlZCBpbiBsb2NhbFN0b3JhZ2VcbiAgICBjb25zdCBhZGRQcm9qZWN0VG9MaXN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgZ2V0UHJvamVjdExpc3QoKTtcbiAgICAgICAgcHJvamVjdExpc3QucHVzaChwcm9qZWN0KTtcbiAgICAgICAgc2V0UHJvamVjdExpc3QoKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlUHJvamVjdEZyb21MaXN0ID0gKHByb2plY3QpID0+IHtcbiAgICAgICAgZ2V0UHJvamVjdExpc3QoKTtcbiAgICAgICAgaWYgKHByb2plY3RMaXN0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LnNwbGljZShwcm9qZWN0TGlzdC5pbmRleE9mKHByb2plY3QudGl0bGUpLCAxKTtcbiAgICAgICAgICAgIHNldFByb2plY3RMaXN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvamVjdExpc3QubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LnBvcCgpO1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJwcm9qZWN0TGlzdFwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwcm9qZWN0TGlzdCxcbiAgICAgICAgc2V0UHJvamVjdExpc3QsXG4gICAgICAgIGdldFByb2plY3RMaXN0LFxuICAgICAgICBhZGRQcm9qZWN0VG9MaXN0LFxuICAgICAgICByZW1vdmVQcm9qZWN0RnJvbUxpc3QsXG4gICAgfTtcbn0pKCk7XG5cbmNvbnN0IHN0b3JlVG9kb3MgPSAoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIHNldFRvZG9MaXN0KHByb2plY3QpIHtcbiAgICAgICAgY29uc3Qgc3RvcmVkUHJvamVjdFRvZG9MaXN0ID0gW107XG5cbiAgICAgICAgcHJvamVjdC5wcm9qZWN0VG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAgICAgICAgICAgcHJvamVjdC50aXRsZSArIFwiIFwiICsgdG9kby50aXRsZSArIFwiIHRvZG8gaW5mb1wiLFxuICAgICAgICAgICAgICAgIHRvZG8udG9kb0luZm9cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBzdG9yZWRQcm9qZWN0VG9kb0xpc3QucHVzaCh0b2RvLnRpdGxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuICAgICAgICAgICAgcHJvamVjdC50aXRsZSArIFwiIHByb2plY3QgdG9kbyBsaXN0XCIsXG4gICAgICAgICAgICBzdG9yZWRQcm9qZWN0VG9kb0xpc3RcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUb2RvTGlzdCgpIHtcbiAgICAgICAgcHJvamVjdE9iamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5nZXRJdGVtKHByb2plY3QudGl0bGUgKyBcIiBwcm9qZWN0IHRvZG8gbGlzdFwiKSAhPVxuICAgICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHN0b3JlZFByb2plY3RUb2RvTGlzdFRpdGxlcyA9IGxvY2FsU3RvcmFnZVxuICAgICAgICAgICAgICAgICAgICAuZ2V0SXRlbShwcm9qZWN0LnRpdGxlICsgXCIgcHJvamVjdCB0b2RvIGxpc3RcIilcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KFwiLFwiKTtcblxuICAgICAgICAgICAgICAgIHN0b3JlZFByb2plY3RUb2RvTGlzdFRpdGxlcy5mb3JFYWNoKCh0b2RvVGl0bGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwcm9qZWN0LnByb2plY3RUb2RvTGlzdFRpdGxlcy5pbmNsdWRlcyh0b2RvVGl0bGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LnByb2plY3RUb2RvTGlzdFRpdGxlcy5wdXNoKHRvZG9UaXRsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgc2V0VG9kb0xpc3QsIGdldFRvZG9MaXN0IH07XG59KSgpO1xuXG5leHBvcnQgeyBwcm9qZWN0TGlzdCwgc3RvcmVQcm9qZWN0cywgc3RvcmVUb2RvcyB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==