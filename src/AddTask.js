import React, { Component } from 'react';

import './AddTask.css';

class AddTask extends Component {
  componentDidUpdate(){
    if (!this.props.addMode) {
      let me = this;
      this.props.tasks.forEach(function(item){
        if (item.id === me.props.editRow){
          me.refs.titleInput.value = item.title;
          me.refs.descriptionInput.value = item.description;
        }
      })
    }
  }

	render() {
    return (
      <form className="AddTask-form" ref="addForm" onSubmit={event => this.props.addTask(event, this)}>
        <fieldset className="AddTask-fields">
          <legend className="AddTask-legend">{this.props.title}</legend>
          <div className="AddTask-section">
            <label className="AddTask-label" htmlFor="title">Заголовок задачи:&nbsp;</label>
            <input className="AddTask-input" ref="titleInput" type="text" id="title" maxLength="25"/>
          </div>
          <div className="AddTask-section">
            <label className="AddTask-label" htmlFor="description">Описание задачи:</label>
          </div>
          <div className="AddTask-section">
            <textarea className="AddTask-input" ref="descriptionInput" id="description" maxLength="100" cols="30" rows="4"/>
          </div>
        </fieldset>
        <div className="AddTask-section">
          <input className="AddTask-btn" type="submit" value="Добавить"/>
        </div>
        <div className="AddTask-section">
          <input className="AddTask-btn" type="reset" value="Очистить поля"/>
        </div>
      </form>
    );
  }
}

export default AddTask;