import React, { Component } from 'react';
//import './App.css';
import Filter from '../Filter';
import Projects from '../Projects';
import AddTodo from '../AddTodo';
import ProjectList from '../ProjectList';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: props.todos,
      projects: props.projects,
      status: props.status,
      labels: props.labels
    }
  }

  getNextId = (arrName => arrName[arrName.length-1].id+1);

  addNewTask = (todo) => {
    let labels = [];
    this.state.labels.forEach((label, i) =>{
      console.log(todo.label.value)
      console.log(label.id)
      if(Number(todo.label.value) === label.id){
        labels[i] = {
          id: todo.label.value,
          ischecked: true
        } 
      } else {
        labels[i] = {
          id: todo.label.value,
          ischecked: false
        } 
      }
    })
    let newTodo = {
      id: this.getNextId(this.state.todos),
      title: todo.title.value,
      description: todo.description.value,
      status: Number(todo.status.value),
      project: Number(todo.project.value),
      labels: labels
    }
    this.state.todos.push(newTodo)
    this.setState(this.state.todos)
  }

  updateTask = (task, id) => {
    this.state.todos.forEach((todo, i) => {
      if(todo.id === id) {
        this.state.todos[i].title = task.title.value;
        this.state.todos[i].description = task.description.value;
        this.state.todos[i].status = task.status.value;
        //set labels
        task.labels.forEach((label, j) => {
          this.state.todos[i].labels[j].ischecked = task.labels[j].checked
        })
        this.setState(this.state.todos);
      }
    })
  }

  getTitleById = (name, id) => {
    return this.props[name].find((key, index) => {
        return key.id === id;
    });
  }

  removeTodos = (todoIdArray) => {
    todoIdArray.forEach((id, i) => {
      this.state.todos.forEach((todo, index) => {
        if(id === todo.id) {
          this.state.todos.splice(index, 1);
        }
      })
    })
    this.setState(this.state.todos);
  }


  getTodoStats = () => {
    let stats = {
      total:0,
      active:0,
      complete:0
    };
    this.state.todos.forEach((todo, i) => {
      stats.total++;
      switch(Number(todo.status)) {
        case 100:
          stats.active++;
          break;
        case 101:
          stats.complete++;
          break;
      }
    })
    return stats;
  }

  render() {
    let stats = this.getTodoStats()
    return (
      <div>
        <div className="row">
          <div className="col-sm-12 stats">
              <div className="stats">
                <span>Total Tasks: {stats.total}</span>
                <span>Active: {stats.active}</span>
                <span>Complete: {stats.complete}</span>
              </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <AddTodo projects={this.state.projects}  status={this.state.status}  labels={this.state.labels} addNewTask={this.addNewTask} />
          </div>
        </div>
        <Filter getTitleById = {this.getTitleById}
                removeTodos={this.removeTodos}
                status={this.state.status}
                updateTask={this.updateTask}
                todos={this.state.todos}
                projects={this.state.projects}
                labels={this.state.labels}
                />
        <Projects projects={this.state.projects} />
      </div>
    );
  }
}

export default App;
