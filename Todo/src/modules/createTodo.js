import { projectObjectList } from "./createProject";

// Todo factory which creates a todo object with the correct data
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
// Function for creating a todo
function createTodos() {
    // Looping through the list of project objects and making sure that each todo is in localstorage
    projectObjectList.forEach((project) => {
        if (project.projectTodoListTitles.length > 0) {
            project.projectTodoListTitles.forEach((title) => {
                const localTodos = localStorage.getItem(
                    project.title + " " + title + " todo info"
                );
                    // If todo is not in local storage then call todoFactory and create knew todo
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
                        // Push todo to list of todo titles
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

export { todoFactory, createTodos };