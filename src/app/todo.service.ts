import { Injectable } from "@angular/core"
import { Todo } from "./todo"
import { BehaviorSubject, Observable } from 'rxjs'
import { take } from 'rxjs/operators'


@Injectable()
export class TodoService {
  todos:  BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  observable: Observable<Todo[]> =  this.todos.asObservable();

  getTodos(): Observable<Todo[]> {
    try {
      const todos: Todo[] = JSON.parse(localStorage.getItem('todos'))
      if(!todos) {
        return this.todos
      }
      this.todos.pipe(take(1)).subscribe(() => {
        return this.todos.next(todos)
      })
      return this.todos;
    } catch(err) {
      console.log('have no local storage')
    }
  }

  addTodo(todo: Todo): TodoService {
    this.todos.pipe(take(1)).subscribe(todos => {
      const updatedTodos = [todo, ...todos]
      this.updateLocalStorage(updatedTodos)
      return this.todos.next(updatedTodos)
    })
    return this
  }

  deleteTodoById(id): TodoService {
    this.todos.pipe(take(1)).subscribe(todos => {
      const filteredTodos = todos.filter(t => t.id !== id)
      this.updateLocalStorage(filteredTodos)
      return this.todos.next(filteredTodos)
    })
    return this
  }

 
  updateTodo(id, title): void {
    this.todos.pipe(take(1)).subscribe((todos) => {
      const todo = todos.find(t => t.id === id)
      if(todo) {
        todo.title = title
        const newTodos = todos.map(t => (t.id === id ? todo : t))
        this.updateLocalStorage(newTodos)
        return this.todos.next(newTodos)
      }
    })
  }

  toggleTodoComplete(id): void {
    this.todos.pipe(take(1)).subscribe((todos) => {
      const todo = todos.find(t => t.id === id)
      if(todo) {
        todo.completed = !todo.completed
        const newTodos = todos.map(t => (t.id === id ? todo : t))
        this.updateLocalStorage(newTodos)
        return this.todos.next(newTodos)
      }
    })
  }

  updateLocalStorage(todos):void {
    this.todos.subscribe(t => {
      setTimeout(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
      }, 300)
      })
  }
}
