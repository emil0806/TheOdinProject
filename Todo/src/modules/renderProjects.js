import {
    projectObjectList,
    createProjects,
    removeProject,
} from "./createProject";
import { projectList, storeProjects, storeTodos } from "./storage.js";
import { createTodos } from "./createTodo";
import { renderToDoObjects } from "./renderTodo";

// Gets content container by id
const content = document.getElementById("content");

// Render a project
const renderProject = (project) => {
    // Create div for project
    const projectDiv = document.createElement("div");

    projectDiv.setAttribute("class", "project");
    projectDiv.setAttribute("tabindex", "-1")

    // Creates title for project and sets it equal to title from object
    const projectTitle = document.createElement("p");
    projectTitle.setAttribute("class", "projectTitle");
    projectTitle.append(project.title);

    projectDiv.append(projectTitle);
    projectsListContainer.append(projectDiv);

    // Create remove button, so project can be removed later
    const projectRemoveBtn = document.createElement("button");
    projectRemoveBtn.setAttribute("class", "projectRemoveBtn");
    projectRemoveBtn.textContent = "X";
    // Add eventlistener so when remove button is clicked it creates a page overlay
    projectRemoveBtn.addEventListener("click", (e) => {
        const pageOverlay = document.createElement("div");
        pageOverlay.setAttribute("id", "pageOverlay");
        // If you click on the page overlay it will remove itself
        pageOverlay.addEventListener("click", (e) => {
            pageOverlay.remove();
        });

        // Project delete confirmation prompt
        const removeProjectCheckContainer = document.createElement("div");
        removeProjectCheckContainer.setAttribute(
            "id",
            "removeProjectCheckContainer"
        );
            // Adding text to ask user if they are sure they want to remove project
        const removeProjectCheckText = document.createElement("p");
        removeProjectCheckText.textContent =
            "Are you sure you want to remove this project? \n All todo items will be lost.";
            // Adding button for removing project
        const removeProjectCheckYes = document.createElement("button");
        removeProjectCheckYes.setAttribute("class", "removeCheckBtn");
        removeProjectCheckYes.textContent = "Remove";
        // Adding event listener which removes project from page and local storage
        removeProjectCheckYes.addEventListener("click", (e) => {
            project.projectTodoList.forEach((i) => {
                localStorage.removeItem(
                    project.title + " " + i.title + " todo info"
                );
            });
            localStorage.removeItem(project.title + " project todo list");
            removeProject(project);
            storeProjects.removeProjectFromList(project);
            pageOverlay.remove();
            projectDiv.remove();
            todoContainer.remove();
        });
        // Creating button for cancel project remove
        const removeProjectCheckNo = document.createElement("button");
        removeProjectCheckNo.setAttribute("class", "cancelCheckBtn");
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
    // Event listener for clicking on project, which opens todo container and render the todo
    projectDiv.addEventListener("click", (e) => {
        const todoContainer = document.querySelector("#todoContainer");
        if (content.contains(todoContainer)) {
            todoContainer.remove();
        }
        storeTodos.getTodoList();
        createTodos();
        renderToDoObjects(project);
    });
};

// Renders all projects
const renderProjectList = () => {
    projectObjectList.forEach((listItem) => {
        renderProject(listItem);
    });
};

// Render project create button
// Creating a container first
const renderProjectCreateBtn = (() => {
    const projectCreateBtnContainer = document.createElement("div");
    projectCreateBtnContainer.setAttribute("id", "projectCreateBtnContainer");
    // Adding a button to the div
    const projectCreateBtn = document.createElement("button");
    projectCreateBtn.setAttribute("id", "projectCreateBtn");
    projectCreateBtn.textContent = "Create Project";
    // Adding event listener for the button 
    projectCreateBtn.addEventListener("click", (e) => {
        projectCreateBtn.remove();
        // Create pop up div for project and inserting it
        const createProjectPopup = document.createElement("div");
        createProjectPopup.setAttribute("id", "createProjectPopup");
        projects.insertAdjacentElement("afterbegin", createProjectPopup);
        // Create title text for new project
        const projectTitleText = document.createElement("p");
        projectTitleText.setAttribute("id", "projectTitleText");
        projectTitleText.textContent = "Title: ";
        createProjectPopup.append(projectTitleText);
        // Input field for new project
        const projectTitleInput = document.createElement("input");
        projectTitleInput.setAttribute("id", "projectTitleInput");
        projectTitleInput.setAttribute("placeholder", "New Project");
        createProjectPopup.append(projectTitleInput);
        // Error if project already exist
        const projectExistsError = document.createElement("p");
        projectExistsError.setAttribute("class", "projectExistsError");
        projectExistsError.textContent = "Project already exists!";

        // Error if no title is written
        const noNameError = document.createElement("p");
        noNameError.setAttribute("class", "noNameError");
        noNameError.textContent = "Enter a name!";
        // Adding submit button 
        const projectSubmitBtn = document.createElement("button");
        projectSubmitBtn.textContent = "Save";
        projectSubmitBtn.setAttribute("class", "btn");
        // Adding eventlistener for submit button
        projectSubmitBtn.addEventListener("click", (e) => {
            // Check if project is already in the list fof projects
            if (projectList.includes(projectTitleInput.value)) {
                // If error for project not already is there, then insert it
                if (!createProjectPopup.contains(projectExistsError)) {
                    createProjectPopup.insertAdjacentElement(
                        "afterend",
                        projectExistsError
                    );
                    return;
                }
                // Insert no name error if title is empty
            } else if (projectTitleInput.value == "") {
                createProjectPopup.insertAdjacentElement(
                    "afterend",
                    noNameError
                );
                return;
                // If title is not empty then create project and insert it
            } else if (projectTitleInput.value != "") {
                storeProjects.addProjectToList(projectTitleInput.value);
                createProjects();
                createProjectPopup.remove();
                projectTitleInput.remove();
                projectSubmitBtn.remove();
                noNameError.remove();
                projectExistsError.remove();
                projectCreateBtnContainer.append(projectCreateBtn);
                projectsListContainer.innerHTML = "";
                renderProjectList();
            }
        });
        createProjectPopup.append(projectSubmitBtn);
        // Append cancel button, if user change mind 
        const projectCancelBtn = document.createElement("button")
        projectCancelBtn.textContent = "Cancel"
        projectCancelBtn.setAttribute("class", "btn")
        projectCancelBtn.setAttribute("id", "projectCancelButton")
        // Adding eventlistener for when cancel button is clicked
        projectCancelBtn.addEventListener("click", (e) => {
            createProjectPopup.remove();
            projectTitleInput.remove();
            projectSubmitBtn.remove();
            noNameError.remove();
            projectExistsError.remove();
            projectCreateBtnContainer.append(projectCreateBtn);
            projectsListContainer.innerHTML = "";
            renderProjectList();
        });
        createProjectPopup.append(projectCancelBtn)
    });

    projectCreateBtnContainer.append(projectCreateBtn);
    projects.insertAdjacentElement("afterbegin", projectCreateBtnContainer);
})();

export { renderProjectList };