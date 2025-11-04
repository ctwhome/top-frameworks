## Development Notes

- all utility clasdrs from daisyui inline.
- use unplugin icons for icons.
- prefer fnuctional style instead of Classes.

## Usage

### Stores and shared data

When working with persistent data (between browser refresh) use `import { persisted } from 'svelte-persisted-store';` (Using https://github.com/joshnuss/svelte-persisted-store with the format:
)

For svelte runes, data that doesn't need to persist, with files \*.svelte.ts, use this function approach instead of classes:

```.svelte.ts
let count = $state([]);

 export function getCounter() {

  function increment() {
    count += 1
  }
  function decrement() {
	  count -= 1
  }

  return {
    get count() {
      return count;
    },
    increment,
    decrement
  };
}
```

## Notes on writting code

- No need to keep backwards compatibility, this is a lab project, so not in production.
