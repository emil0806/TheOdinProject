import { renderPage } from "./modules/renderPage.js";
import { todoFactory } from "./modules/createTodo.js";
import { projectFactory, createProjects } from "./modules/createProject.js";
import { renderToDoObjects } from "./modules/renderTodo.js";
import { projectList, storeProjects, storeTodos } from "./modules/storage.js";
import { renderProjectList } from "./modules/renderProjects";
import "./css/styles.css";
import "./css/reset.css";

const createDefaultProject = (() => {
  storeProjects.getProjectList();
  storeProjects.setProjectList();
  createProjects();
  renderProjectList();
})();
