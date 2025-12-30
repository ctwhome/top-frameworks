<script lang="ts">
	import { co, z } from 'jazz-tools';

	export const Person = co.map({
		name: z.string(),
		age: z.number()
	});

	let person = Person.create({
		name: 'Jesse',
		age: 32
	});
</script>

<div class="container mx-auto px-4">
	<h1 class="mb-3 text-xl">Learn Page</h1>
	<pre class="mb-10 text-xs">{JSON.stringify(person, null, 2)}</pre>

	<p>{person.name} is {person.age} years old.</p>
	<button class="btn" onclick={() => (person = person.$jazz.set({ age: person.age + 1 }))}>
		Have a birthday
	</button>
</div>
