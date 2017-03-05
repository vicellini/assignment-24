import React from 'react';
import moment from 'moment';

export const ToDoList = React.createClass({
  getInitialState: function(){
    return {
      tasksToComplete: [],
    }
  },

  _updateTasksList: function(taskName){
    let copyOfItems = this.state.tasksToComplete.map(function(copy){return copy})
      let copyOfItemsMinus = copyOfItems.filter(function(someObj){
  					if(taskName !== someObj.task){
  						return true
  					} else {
  						return false
  					}
  				})
  				this.setState({
  					tasksToComplete: copyOfItemsMinus
          })
    },

  _convertDate: function(dateStr){
    let formatDate = moment(dateStr, ['YYYY-MM-DD']).format("MMM Do, YYYY")
    return formatDate
  },

  _handleSubmit: function(evt){
    evt.preventDefault()
    let userTask = {
      task: this.refs.taskInput.value,
      date: this._convertDate(this.refs.dateInput.value),
      critical: this.refs.isCritical.checked,
    }
    let copyOfItems = this.state.tasksToComplete.map(function(copy){return copy})
    copyOfItems.push(userTask)
     this.setState({
       tasksToComplete : copyOfItems
     })
     this.refs.taskInput.value = ''
     this.refs.dateInput.value = ''
     this.refs.isCritical.checked = false
  },

 render: function (){
   console.log(this.state.tasksToComplete)
   return(
   <div className="container">
      <h1>Todo List</h1>
      <div className="list-content">
        <form className="task-form" onSubmit={this._handleSubmit}>
          <input ref="taskInput" type="text" name="task"/>
          <button className="btn-submit" type="submit"><i className="fa fa-plus" aria-hidden="true"></i></button>
          <br/>
          <input ref="dateInput" className="input-date" type="date"/>
          <br/>
          <label for="critical_checkbox" className="crit-box">
            <input ref="isCritical" type="checkbox" value="None" id="critical_checkbox" name="check"/>
            <span>Critical?</span>
          </label>
        </form>
      <hr/>
        <ToDoListItem
         taskListArr={this.state.tasksToComplete}
         _updateTasksListCB={this._updateTasksList}
       />
    </div>
   </div>
   )
  }

})

const ToDoListItem = React.createClass({
  _createListItems: function(arrayOfTasks){
    let component = this
    let jsxComponents = arrayOfTasks.map(function(singleObj, i){
      return (
          <SingleItem key={i}
            data = {singleObj}
            _updateTasksListCB = {component.props._updateTasksListCB}
          />
        )
        })
        return jsxComponents
    },

  render: function(){
    return(
       <div className="allTasks">
         {this._createListItems(this.props.taskListArr)}
       </div>
    )
  }
})

const SingleItem = React.createClass({

    _handleDelete: function(){
      let singleStr = this.props.data.task
      this.props._updateTasksListCB(singleStr)
    },

    _isCritical: function(critVal){
      if(critVal === true){
        return 'is-important'
      }else{
        return ''
      }
    },

    render: function(){

      let taskClassName = `${this._isCritical(this.props.data.critical)} single-task`
      return (
        <div className={taskClassName}>
            <div className="btn-checkbox">
              <div>
                <input type="checkbox" value="None" id="todo_checkbox" name="check"/>
                <label for="todo_checkbox"></label><span>{this.props.data.task}</span>
              </div>
              <div className="extra-info">
                <span>{this.props.data.date}</span>
              </div>
            </div>
            <div className="btn-delete">
              <i onClick={this._handleDelete} className="fa fa-times" aria-hidden="true"></i>
            </div>
        </div>
      )
    }
})
