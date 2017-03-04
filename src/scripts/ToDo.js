import React from 'react'

export const ToDoList = React.createClass({
  getInitialState: function(){
    return {
      tasksToComplete: [],
    }
  },

  _updateTasksList: function(taskName){
    let copyOfItems = this.state.tasksToComplete.map(function(copy){return copy})
      let copyOfItemsMinus = copyOfItems.filter(function(someStr){
  					if(taskName !== someStr){
  						return true
  					} else {
  						return false
  					}
  				})
  				this.setState({
  					tasksToComplete: copyOfItemsMinus
          })
      },

  _handleSubmit: function(evt){
    evt.preventDefault()
    let userTask = this.refs.taskInput.value
    let copyOfItems = this.state.tasksToComplete.map(function(copy){return copy})
    copyOfItems.push(userTask)
     this.setState({
       tasksToComplete : copyOfItems
     })
     this.refs.taskInput.value = ''
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
    let jsxComponents = arrayOfTasks.map(function(singleStr, i){
      return (
          <SingleItem key={i}
          data = {singleStr}
            _updateTasksListCB = {component.props._updateTasksListCB}
          />
        )
        })
        return jsxComponents
    },

  render: function(){
    return(
       <div className="page-body">
         {this._createListItems(this.props.taskListArr)}
       </div>
    )
  }
})

const SingleItem = React.createClass({

    _handleDelete: function(){
      let singleStr = this.props.data
      this.props._updateTasksListCB(singleStr)
    },

    render: function(){
      return (
        <div className="single-task">
          <div className="btn-checkbox">
            <input type="checkbox" value="None" id="todo_checkbox" name="check"/>
            <label for="todo_checkbox"></label><span>{this.props.data}</span>
          </div>
          <div className="btn-delete">
            <i onClick={this._handleDelete} className="fa fa-times" aria-hidden="true"></i>
          </div>
        </div>
      )
    }
})
