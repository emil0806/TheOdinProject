import { projectObjectList } from "./createProject";

// Keep a list of projects, added to localStorage
const projectList = [];

// Create the default project if no others are present
if (localStorage.length == 0) {
    projectList.push("Default Project");
}

// Stores the projects 
const storeProjects = (() => {
    // Sets the project list, by going through is and setting localstorage for each project
    function setProjectList() {
        projectList.forEach((project) => {
            if (project != "") {
                localStorage.setItem("projectList", projectList);
            }
        });
    }
    // Gets project list
    function getProjectList() {
        // If localstorage is 0 then call setProjectList
        if (localStorage.length == 0) {
            setProjectList();
        } else {
            // If not 0 then go through the stored project and make sure they are in th elist of projects
            const storedProjectList = localStorage["projectList"].split(",");
            storedProjectList.forEach((project) => {
                if (!projectList.includes(project) || projectList.length == 0) {
                    projectList.push(project);
                }
            });
        }
    }

    // Add and remove projects to the project list so they can be saved in localStorage
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

// Store the todos 
const storeTodos = (() => {
    // Sets up a todo list in localstorage
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
    // Gets the todo list in local storage
    function getTodoList() {
        projectObjectList.forEach((project) => {
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

export { projectList, storeProjects, storeTodos };