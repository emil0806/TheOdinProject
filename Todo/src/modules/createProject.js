import { storeProjects, projectList } from "./storage.js";

// Project factory creates object with array of project and functions for adding todo and removing
const projectFactory = (title) => {
    // List of todo in a project
    const projectTodoList = [];

    // List of todo titles
    const projectTodoListTitles = [];

    // Function to add todo to a project
    function addToProjectTodoList(todoObject) {
        projectTodoList.push(todoObject);
    }

    // Function to remove todo from project
    function removeFromProjectList(todoObject) {
        projectTodoList.splice(projectTodoList.indexOf(todoObject), 1);
    }

    // Removing a project from list of projects
    const removeProjectFromList = (project) => {
        projectList.splice(projectList.indexOf(project), 1);
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
    // Get the list of stored projects
    storeProjects.getProjectList();
    // Create array of project titles
    const projectObjectListTitles = [];
    // Loop through list of projects and push title of each project to array of titles
    projectObjectList.forEach((projectObject) => {
        projectObjectListTitles.push(projectObject.title);
    });
    // Loop through list of project stored and for each project check if it includes the title of project,
    // if not then call projectFactory and create new project Object, and push the new one to list of projects
    storeProjects.projectList.forEach((project) => {
        if (!projectObjectListTitles.includes(project)) {
            const newProject = projectFactory(project);
            return projectObjectList.push(newProject);
        }
    });
}

// Remove projects from the list above
function removeProject(project) {
    if (projectObjectList.length > 1) {
        projectObjectList.splice(projectObjectList.indexOf(project), 1);
    } else if (projectObjectList.length == 1) {
        projectObjectList = [];
    }
}

export { projectFactory, projectObjectList, createProjects, removeProject };