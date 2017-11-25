import React, { Component } from 'react';

import TableTasks from './TableTasks.js';
import AddTask from './AddTask.js'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.fillStore();

    this.addTitle = "Форма добавления новой задачи";
    this.editTitle = "Форма едактирования";

    this.addTask = this.addTask.bind(this);
    this.chooseEditTask = this.chooseEditTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.markFinish = this.markFinish.bind(this);
    this.removeTask = this.removeTask.bind(this);
  }

  fillStore(me){
    let initialData = {
          add: true,
          editRow: null,
          lastId: 0,
          tasks: []
        };
    if (localStorage){
      if (localStorage.length > 0){
        initialData = {
          add: JSON.parse(localStorage.getItem("add")),
          editRow: JSON.parse(localStorage.getItem("editRow")),
          lastId: JSON.parse(localStorage.getItem("lastId")),
          tasks: JSON.parse(localStorage.getItem("tasks")),
        };
      } else {
        localStorage.setItem("add", initialData.add);
        localStorage.setItem("editRow", initialData.editRow);
        localStorage.setItem("lastId", initialData.lastId);
        localStorage.setItem("tasks",  JSON.stringify(initialData.tasks));
      }
    } else {
      alert("Невозможно сохранить в localStorage");
    }
    return initialData;
  }

  changeTasks(tasks){
    localStorage.setItem("tasks",  JSON.stringify(tasks));
  }

  changeAdd(add){
    localStorage.setItem("add", add);
  }

  changeEditRow(editRow){
    localStorage.setItem("editRow", editRow);
  }

  clearLocalStorage(event){
    event.preventDefault();
    localStorage.clear();
    window.location.reload()
  }

  addTaskInLocalStorage(data){
    localStorage.setItem("lastId", data.lastId);
    this.changeTasks(data.tasks);
  }

  chooseEditTaskInLocalStorage(data){
    this.changeAdd(data.add);
    this.changeEditRow(data.editRow);
  }

  editTaskInLocalStorage(data){
    this.changeAdd(data.add);
    this.changeEditRow(data.editRow);
    this.changeTasks(data.tasks);
  }

  markFinishInLocalStorage(data){
    this.changeTasks(data.tasks);
  }

  removeTaskInLocalStorage(data){
    this.changeTasks(data.tasks);
  }

  addTask(event, form){
    event.preventDefault();
    let titleInput = form.refs.titleInput.value,
      descriptionInput = form.refs.descriptionInput.value;
    if (titleInput && descriptionInput && this.state.add) {
      this.setState(prevState => {
          let tasks = prevState.tasks.concat({
              id: prevState.lastId + 1,
              title: titleInput,
              description: descriptionInput,
              finished: false}
              ),
          lastId = prevState.lastId + 1,
          data = {
            tasks: tasks,
            lastId: lastId
          };
          this.addTaskInLocalStorage(data);
          return data
        }
      )
      form.refs.addForm.reset();
    }
  }

  chooseEditTask(event){
    let rowId = event.target.dataset["id"],
      data = {add: false, editRow: Number(rowId)};
    this.setState(data);
    this.chooseEditTaskInLocalStorage(data);
  }

  editTask(event, form){
    event.preventDefault();
    let me = this,
      titleInput = form.refs.titleInput.value,
      descriptionInput = form.refs.descriptionInput.value,
      updated = me.state.tasks.map(task => {
        if (task.id === me.state.editRow){
          return {id: task.id, title: titleInput, description: descriptionInput, finished: task.finished};
        }
        return {id: task.id, title: task.title, description: task.description, finished: task.finished};
      }),
      data = {add: true, editRow: null, tasks: updated};
    this.setState(data);
    this.editTaskInLocalStorage(data);
    form.refs.addForm.reset();
  }

  markFinish(event){
    let me = this,
      rowId = Number(event.target.dataset["id"]),
      updated = me.state.tasks.map(task => {
        if (task.id === rowId){
          let finished = (task.finished ? false : true);
          return {id: task.id, title: task.title, description: task.description, finished: finished};
        }
        return {id: task.id, title: task.title, description: task.description, finished: task.finished};
      }),
      data = {tasks: updated};
    this.setState(data);
    this.markFinishInLocalStorage(data);
  }

  removeTask(event) {
    let rowId = Number(event.target.dataset["id"]),
      updated = this.state.tasks.filter(task => {
        if (task.id !== rowId){
          return {id: task.id, title: task.title, description: task.description, finished: task.finished};
        }        
      }),
      data = {tasks: updated};
    this.setState(data);
    this.removeTaskInLocalStorage(data);

  }

  render() {
    if (this.state.add) {
      return (
        <div className="App">
          <div className="App-addtask">
            <AddTask addTask={this.addTask}
                     addMode={this.state.add}
            title={this.addTitle}/>
          </div>
          <div>
            <button onClick={event => this.clearLocalStorage(event)}>Очистить localStorage</button>
          </div>
          <div className="App-tasks">
            <TableTasks tasks={this.state.tasks}
                        chooseEditTask={this.chooseEditTask}
                        markFinish={this.markFinish}
                        removeTask={this.removeTask}/>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="App-addtask App-addtask_edit">
            <AddTask addTask={this.editTask}
                     addMode={this.state.add}
                     editRow={this.state.editRow}
                     tasks={this.state.tasks}
            title={this.editTitle}/>
          </div>
        </div>
      );
    }
  }

}

export default App;
