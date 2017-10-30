import React, {Component} from 'react';
import TodoListByProject from '../TodoListByProject';

class Project extends Component {

    clearComplete = (projectId) => {
        let completeTodos = [];
        this.props.todos.forEach((todo, i) => {
            if(Number(todo.status) === 101) {
                completeTodos.push(todo.id);
            }
        })
        this.props.removeTodos(completeTodos);
    }

    render() {
        return (
            <div className="project">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="project-header">
                            <h3>Project: {this.props.title}</h3>
                            <button onClick={()=>{this.clearComplete(this.props.id)}}>Clear Complete</button>
                        </div>
                    </div>
                </div>
                
                <TodoListByProject  todos={this.props.todos}
                                    getTitleById = {this.props.getTitleById}
                                    status={this.props.status}
                                    labels={this.props.labels}
                                    updateTask={this.props.updateTask}
                                    project={this.props.id}
                                    />
            </div>
        )
    }
}

export default Project;