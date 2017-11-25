import React, { Component } from 'react';

import './TableTask.css';

import DeleteSvg from './static/delete.svg';
import EditSvg from './static/edit.svg'

class TableTasks extends Component {
	compare(a,b) {
    if (a.title < b.title)
      return 1;
    if (a.title > b.title)
      return -1;
    return 0;
  }

	render() {
		let tasks = this.props.tasks.sort(this.compare);
    return (
      <table className="Tasks">
        <caption className="Tasks-caption">Список задач</caption>
        <thead className="Tasks-head">
				  <tr className="Tasks-header">
				    <th className="Tasks-header-item">Название задачи</th>
				    <th className="Tasks-header-item">Описание задачи</th>
				  </tr>
				</thead>
        <tbody className="Tasks-body">
          {tasks.map(task => (
            <tr className="Tasks-task" key={task.id}>
              <td className="Tasks-item">{task.title}</td>
              <td className="Tasks-item">{task.description}</td>
              <td className="Tasks-item Tasks-item_checked">
              	<input data-id={task.id} type="checkbox" checked={task.finished} onChange={event => this.props.markFinish(event)}/>
            	</td>
              <td className="Tasks-item Tasks-item_edit">
              	<img data-id={task.id} className="Tasks-edit" src={EditSvg} alt="edit" onClick={event => this.props.chooseEditTask(event)}/>
            	</td>
              <td className="Tasks-item Tasks-item_delete">
              	<img data-id={task.id} className="Tasks-delete" src={DeleteSvg} alt="delete" onClick={event => this.props.removeTask(event)}/>
            	</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default TableTasks;