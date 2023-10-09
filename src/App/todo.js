import React from 'react';
import './todo.css';

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({ inputText: event.target.value });
  };

  handleAddTodo = () => {
    if (this.state.inputText !== '') {
      const newTodo = {
        text: this.state.inputText,
        completed: false,
        id: Date.now(),
      };
      this.setState({
        todos: [...this.state.todos, newTodo],
        inputText: '',
      });
    }
  };

  handleCompleteTodo = (id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: true };
      } else {
        return todo;
      }
    });
    this.setState({ todos: updatedTodos });
  };

  handleReset = () => {
    this.setState({ todos: [], inputText: '' });
  };

  render() {
    const activeTodos = this.state.todos.filter((todo) => !todo.completed);
    const completedTodos = this.state.todos.filter((todo) => todo.completed);

    return (
      <div className="container">
        <h1 className='to'>My Todo App</h1>
        <div className="input-container">
          <input
            type="text"
            placeholder="Enter a todo"
            value={this.state.inputText}
            onChange={this.handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                this.handleAddTodo();
              }
            }}
          />
          <button className='add' onClick={this.handleAddTodo}>Add</button>
        </div>
        {activeTodos.length > 0 && (
          <>
            <h2 className='act'>Active Todos</h2>
            {activeTodos.map((todo) => (
              <div
                key={todo.id}
                className="todo-card"
                onClick={() => this.handleCompleteTodo(todo.id)}
              >
                {todo.text}
              </div>
            ))}
          </>
        )}
        {completedTodos.length > 0 && (
          <>
            <h2 className='com'>Completed Todos</h2>
            {completedTodos.map((todo) => (
              <div key={todo.id} className="todo-card completed">
                {todo.text}
              </div>
            ))}
          </>
        )}
        {this.state.todos.length > 0 && (
          <button className="reset-button" onClick={this.handleReset}>
            Reset
          </button>
        )}
      </div>
    );
  }
}

export default  TodoApp

