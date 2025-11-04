/**
 * Jazz Schema Definitions for Todo Application
 *
 * This file defines the collaborative data structures (CoValues) for the todo app.
 * All data is automatically synced in real-time across devices and persisted to Jazz Cloud.
 */

import { co, z } from 'jazz-tools';

/**
 * Subtask - A nested task within a todo item
 */
export const Subtask = co.map({
	title: z.string(),
	completed: z.boolean()
});

export type Subtask = co.loaded<typeof Subtask>;

/**
 * SubtaskList - A collaborative list of subtasks
 */
export const SubtaskList = co.list(Subtask);

export type SubtaskList = co.loaded<typeof SubtaskList>;

/**
 * Todo - Main todo item with all features
 *
 * Features:
 * - Title and completion status
 * - Priority levels (low, medium, high)
 * - Optional due date
 * - Optional category/tag
 * - Nested subtasks
 * - Creation timestamp
 */
export const Todo = co.map({
	title: z.string(),
	completed: z.boolean(),
	priority: z.literal(['low', 'medium', 'high']),
	dueDate: z.optional(z.date()),
	category: z.optional(z.string()),
	createdAt: z.date(),
	get subtasks() {
		return co.optional(SubtaskList);
	}
});

export type Todo = co.loaded<typeof Todo>;

/**
 * TodoList - A collaborative list of all todos
 */
export const TodoList = co.list(Todo);

export type TodoList = co.loaded<typeof TodoList>;

/**
 * TodoAccountRoot - Root data structure for user's account
 * Contains the main todos list
 */
export const TodoAccountRoot = co.map({
	get todos() {
		return TodoList;
	}
});

export type TodoAccountRoot = co.loaded<typeof TodoAccountRoot>;

/**
 * TodoAccount - User account with profile and todo data
 *
 * This extends Jazz's Account type with our custom root structure.
 * Migration ensures the todos list is created when user first logs in.
 */
export const TodoAccount = co
	.account({
		root: TodoAccountRoot,
		profile: co.profile({
			name: z.string()
		})
	})
	.withMigration((account) => {
		// Initialize root with empty todos list on first login
		if (!account.$jazz.has('root')) {
			account.$jazz.set('root', {
				todos: []
			});
		}
	});

export type TodoAccount = co.loaded<typeof TodoAccount>;
