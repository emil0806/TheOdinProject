import React, { Component } from "react";
import Info from "./components/info";
import Education from "./components/education";
import Experience from "./components/experience";
import InfoCv from "./components/infoCV";
import EducationCV from "./components/educationCV";
import ExperienceCV from "./components/experienceCV";
import uniqid from "uniqid";

class App extends Component {
  constructor(props) {
    super(props);

    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.onInfoSubmit = this.onInfoSubmit.bind(this);
    this.onInfoEdit = this.onInfoEdit.bind(this);

    this.handleEducationChange = this.handleEducationChange.bind(this);
    this.onEducationSubmit = this.onEducationSubmit.bind(this);
    this.onEducationEdit = this.onEducationEdit.bind(this);
    this.onEducationEditSave = this.onEducationEditSave.bind(this);
    this.nextEducationEdit = this.nextEducationEdit.bind(this);
    this.prevEducationEdit = this.prevEducationEdit.bind(this);

    this.handleExperienceChange = this.handleExperienceChange.bind(this);
    this.onExperienceSubmit = this.onExperienceSubmit.bind(this);
    this.onExperienceEdit = this.onExperienceEdit.bind(this);
    this.onExperienceEditSave = this.onExperienceEditSave.bind(this);
    this.nextExperienceEdit = this.nextExperienceEdit.bind(this);
    this.prevExperienceEdit = this.prevExperienceEdit.bind(this);

    this.state = {
      edits: { info: false, education: false, experience: false },
      info: {
        firstName: { temp: "", saved: "" },
        lastName: { temp: "", saved: "" },
        email: { temp: "", saved: "" },
        phone: { temp: "", saved: "" },
        completed: false,
      },
      education: {
        schoolName: "",
        titleOfStudy: "",
        dateOfGraduation: "",
        id: uniqid(),
      },
      educationHistory: [],
      educationCounter: 0,
      experience: {
        title: "",
        company: "",
        tasks: "",
        start: "",
        end: "",
        id: uniqid(),
      },
      experienceHistory: [],
      experienceCounter: 0,
    };
  }

  handleInfoChange(event) {
    const name = event.target.name;
    let revisedInput = this.state.info;
    switch (name) {
      case "firstName":
        revisedInput.firstName.temp = event.target.value;
        break;
      case "lastName":
        revisedInput.lastName.temp = event.target.value;
        break;
      case "email":
        revisedInput.email.temp = event.target.value;
        break;
      case "phone":
        revisedInput.phone.temp = event.target.value;
        break;
      default:
        console.log("default");
    }
    this.setState({
      info: revisedInput,
    });
  }

  onInfoSubmit(event) {
    event.preventDefault();
    let edits = this.state.edits;
    edits.info = false;
    let savedInfo = this.state.info;
    savedInfo.firstName.saved = this.state.info.firstName.temp;
    savedInfo.firstName.temp = "";
    savedInfo.lastName.saved = this.state.info.lastName.temp;
    savedInfo.lastName.temp = "";
    savedInfo.email.saved = this.state.info.email.temp;
    savedInfo.email.temp = "";
    savedInfo.phone.saved = this.state.info.phone.temp;
    savedInfo.phone.temp = "";
    savedInfo.completed = true;

    this.setState({
      edits: edits,
      info: savedInfo,
    });
  }

  onInfoEdit(event) {
    event.preventDefault();
    let edits = this.state.edits;
    edits.info = true;

    let savedInfo = this.state.info;
    savedInfo.firstName.temp = this.state.info.firstName.saved;
    savedInfo.lastName.temp = this.state.info.lastName.saved;
    savedInfo.email.temp = this.state.info.email.saved;
    savedInfo.phone.temp = this.state.info.phone.saved;
    savedInfo.completed = false;

    this.setState({
      edits: edits,
      info: savedInfo,
    });
  }

  onEducationSubmit(event) {
    event.preventDefault();
    this.setState({
      educationHistory: this.state.educationHistory.concat(
        this.state.education
      ),
      education: {
        schoolName: "",
        titleOfStudy: "",
        dateOfGraduation: "",
        id: uniqid(),
      },
    });
  }

  onEducationEdit(event) {
    event.preventDefault();

    if (this.state.educationHistory.length > 0) {
      let edits = this.state.edits;

      edits.education = true;

      this.setState({ edits: edits }, () => {
        const inst = this.state.educationHistory[this.state.educationCounter];
        this.setState({
          education: {
            schoolName: inst.schoolName,
            titleOfStudy: inst.titleOfStudy,
            dateOfGraduation: inst.dateOfGraduation,
            id: inst.id,
          },
        });
      });
    }
  }

  nextEducationEdit(event) {
    event.preventDefault();

    if (this.state.educationCounter < this.state.educationHistory.length - 1) {
      this.setState(
        { educationCounter: this.state.educationCounter + 1 },
        () => {
          const role = this.state.educationHistory[this.state.educationCounter];
          this.setState({
            education: {
              schoolName: role.schoolName,
              titleOfStudy: role.titleOfStudy,
              dateOfGraduation: role.dateOfGraduation,
              id: role.id,
            },
          });
        }
      );
    }
  }

  prevEducationEdit(event) {
    event.preventDefault();
    if (this.state.educationCounter >= 1) {
      this.setState(
        { educationCounter: this.state.educationCounter - 1 },
        () => {
          const role = this.state.educationHistory[this.state.educationCounter];
          this.setState({
            education: {
              schoolName: role.schoolName,
              titleOfStudy: role.titleOfStudy,
              dateOfGraduation: role.dateOfGraduation,
              id: role.id,
            },
          });
        }
      );
    }
  }

  onEducationEditSave(event) {
    event.preventDefault();
    let edits = this.state.edits;
    edits.education = false;
    const editedEducation = this.state.education;
    const revisedHistory = this.state.educationHistory;
    revisedHistory.splice(this.state.educationCounter, 1, editedEducation);
    this.setState({
      edits: edits,
      educationHistory: revisedHistory,
      education: {
        schoolName: "",
        titleOfStudy: "",
        dateOfGraduation: "",
        id: "",
      },
    });
  }

  handleEducationChange(event) {
    const name = event.target.name;
    let revisedInput = this.state.education;

    switch (name) {
      case "schoolName":
        revisedInput.schoolName = event.target.value;
        break;
      case "titleOfStudy":
        revisedInput.titleOfStudy = event.target.value;
        break;
      case "dateOfGraduation":
        revisedInput.dateOfGraduation = event.target.value;
        break;
      default:
        console.log("default problem");
    }
    this.setState({
      education: revisedInput,
    });
  }

  onExperienceSubmit(event) {
    event.preventDefault();
    this.setState({
      experienceHistory: this.state.experienceHistory.concat(
        this.state.experience
      ),
      experience: {
        title: "",
        company: "",
        tasks: "",
        start: "",
        end: "",
        id: uniqid(),
      },
    });
  }

  onExperienceEdit(event) {
    event.preventDefault();
    if (this.state.experienceHistory.length > 0) {
      let edits = this.state.edits;

      edits.experience = true;

      this.setState({ edits: edits }, () => {
        const role = this.state.experienceHistory[this.state.experienceCounter];
        this.setState({
          experience: {
            title: role.title,
            company: role.company,
            start: role.start,
            end: role.end,
            id: role.id,
          },
        });
      });
    }
  }

  handleExperienceChange(event) {
    const name = event.target.name;
    let revisedInputs = this.state.experience;

    switch (name) {
      case "title":
        revisedInputs.title = event.target.value;
        break;
      case "company":
        revisedInputs.company = event.target.value;
        break;
      case "tasks":
        revisedInputs.tasks = event.target.value;
        break;
      case "start":
        revisedInputs.start = event.target.value;
        break;
      case "end":
        revisedInputs.end = event.target.value;
        break;
      default:
        console.log("default problem");
    }

    this.setState({
      experience: revisedInputs,
    });
  }

  onExperienceEditSave(event) {
    event.preventDefault();
    let edits = this.state.edits;
    edits.experience = false;
    const editedExperience = this.state.experience;
    const revisedHistory = this.state.experienceHistory;
    revisedHistory.splice(this.state.experienceCounter, 1, editedExperience);
    this.setState({
      edits: edits,
      experienceHistory: revisedHistory,
      experience: {
        title: "",
        company: "",
        tasks: "",
        start: "",
        end: "",
        id: "",
      },
    });
  }

  nextExperienceEdit(event) {
    event.preventDefault();
    if (
      this.state.experienceCounter <
      this.state.experienceHistory.length - 1
    ) {
      this.setState(
        { experienceCounter: this.state.experienceCounter + 1 },
        () => {
          const role =
            this.state.experienceHistory[this.state.experienceCounter];
          this.setState({
            experience: {
              title: role.title,
              company: role.company,
              tasks: role.tasks,
              start: role.start,
              end: role.end,
              id: role.id,
            },
          });
        }
      );
    }
  }

  prevExperienceEdit(event) {
    event.preventDefault();
    if (this.state.experienceCounter >= 1) {
      this.setState(
        { experienceCounter: this.state.experienceCounter - 1 },
        () => {
          const role =
            this.state.experienceHistory[this.state.experienceCounter];
          this.setState({
            experience: {
              title: role.title,
              company: role.company,
              tasks: role.tasks,
              start: role.start,
              end: role.end,
              id: role.id,
            },
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="container">
        <div className="creator">
          <h1 className="header">CV Creator</h1>
          <h3 className="subHeader">Personal Information</h3>
          <Info
            submitting={this.onInfoSubmit}
            changing={this.handleInfoChange}
            editActive={this.state.edits.info}
            current={this.state.info}
            editing={this.onInfoEdit}
          />
          <h3 className="subHeader">Educational Experience</h3>
          <Education
            submitting={this.onEducationSubmit}
            changing={this.handleEducationChange}
            editActive={this.state.edits.education}
            current={this.state.education}
            editing={this.onEducationEdit}
            length={this.state.educationHistory.length}
            nextEdit={this.nextEducationEdit}
            prevEdit={this.prevEducationEdit}
            saveEdit={this.onEducationEditSave}
          />
          <h3 className="subHeader">Practical Experience</h3>
          <Experience
            submitting={this.onExperienceSubmit}
            changing={this.handleExperienceChange}
            editActive={this.state.edits.experience}
            current={this.state.experience}
            editing={this.onExperienceEdit}
            length={this.state.experienceHistory.length}
            nextEdit={this.nextExperienceEdit}
            prevEdit={this.prevExperienceEdit}
            saveEdit={this.onExperienceEditSave}
          />
        </div>
        <div className="cv">
          <InfoCv current={this.state.info} />
          <EducationCV roles={this.state.educationHistory} />
          <ExperienceCV roles={this.state.experienceHistory} />
        </div>
      </div>
    );
  }
}

export default App;
