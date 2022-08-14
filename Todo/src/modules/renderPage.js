// Rendering page by creating container and header
const renderPage = (() => {
  let content = document.createElement("div");
  content.setAttribute("id", "content");

  let headingContainer = document.createElement("div");
  headingContainer.setAttribute("id", "headingContainer");

  let heading = document.createElement("h1");
  heading.textContent = "Todo List";
  heading.id = "heading";

  let underHeading = document.createElement("h4");
  underHeading.textContent = "Let's get shit done!";
  underHeading.id = "underHeading";

  headingContainer.appendChild(heading);
  headingContainer.appendChild(underHeading);
  content.appendChild(headingContainer);

  let projectAndTodoContainer = document.createElement("div");
  projectAndTodoContainer.setAttribute("id", "projectAndTodoContainer");
  content.appendChild(projectAndTodoContainer);

  let projects = document.createElement("div");
  projects.setAttribute("id", "projects");

  projectAndTodoContainer.append(projects);

  let projectsListContainer = document.createElement("div");
  projectsListContainer.setAttribute("id", "projectsListContainer");

  projects.appendChild(projectsListContainer);

  document.body.appendChild(content);
})();

export { renderPage };
