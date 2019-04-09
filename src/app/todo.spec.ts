import {Todo} from './todo'

describe('Class: Todo Class', () => {
    it('should have a title', () => {
        const todo: Todo = new Todo('Buy Bread')
        expect(todo.title).toBeDefined()
        expect(todo.title).toBe('Buy Bread')
        expect(todo.title).not.toBe('')
        expect(todo.title).toEqual(jasmine.any(String))
    })

    it('should have a random id', () => {
        const first: Todo = new Todo('Buy Bread')
        const second: Todo = new Todo('Buy Bread')
        expect(first.id).toBeDefined()
        expect(first.id).toEqual(jasmine.any(String))
        expect(first.title).not.toBe('')
        expect(second.title).not.toBe('')
        expect(first.id).not.toBe(second.id)
    })

    it('should have a completed property', () => {
        const todo: Todo = new Todo('Buy Bread')
        expect(todo.completed).toBeDefined()
        expect(todo.completed).toEqual(jasmine.any(Boolean))
        expect(todo.completed).toBe(false)
    })
})