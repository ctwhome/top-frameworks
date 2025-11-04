interface Todo {
	id: string;
	title: string;
	completed: boolean;
	user_id: string;
	created_at: string;
	updated_at: string;
}

interface TodoState {
	todos: Todo[];
	loading: boolean;
	error: string | null;
}

let state = $state<TodoState>({
	todos: [],
	loading: true,
	error: null
});

export function getTodoStore() {
	async function fetchTodos() {
		state.loading = true;
		try {
			const response = await fetch('/api/todos');
			if (!response.ok) throw new Error('Failed to fetch todos');
			const data = await response.json();
			state.todos = data;
			state.error = null;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'An error occurred';
		} finally {
			state.loading = false;
		}
	}

	async function addTodo(title: string) {
		try {
			const response = await fetch('/api/todos', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ title })
			});
			if (!response.ok) throw new Error('Failed to add todo');
			const data = await response.json();

			state.todos = [data, ...state.todos];
			state.error = null;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'An error occurred';
		}
	}

	async function toggleTodo(id: string, completed: boolean) {
		try {
			const response = await fetch(`/api/todos/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ completed })
			});
			if (!response.ok) throw new Error('Failed to update todo');
			const data = await response.json();

			state.todos = state.todos.map((todo) => (todo.id === id ? data : todo));
			state.error = null;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'An error occurred';
		}
	}

	async function deleteTodo(id: string) {
		try {
			const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
			if (!response.ok) throw new Error('Failed to delete todo');
			state.todos = state.todos.filter((todo) => todo.id !== id);
			state.error = null;
		} catch (error) {
			state.error = error instanceof Error ? error.message : 'An error occurred';
		}
	}

	return {
		get todos() {
			return state.todos;
		},
		get loading() {
			return state.loading;
		},
		get error() {
			return state.error;
		},
		fetchTodos,
		addTodo,
		toggleTodo,
		deleteTodo
	};
}
