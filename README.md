# React WebComponent Slots - Web Component-Style slots for React Components

Improved typescript and rationalized code for better usage for future development. Also fixes problem regarding state management that doesn't want to update the slotted component.

### Inspired by [starkraving/slotted-react-component](https://github.com/starkraving/slotted-react-component)

This is typical way how to use "slot" in React, components passed as props and will act as "named slots" and it's children will act as the "default slot".

```jsx
<MyComponent
  title={<h1>My Component Title</h1>}
  description={<p>Some descriptive text</p>}
>
  <p>General content inside the module</p>
</MyComponent>
```

However, I don't like mixing props (properties) that should define **how a component should be**, not **what the component will also render**. Component should be placed inside another component, not passed by props. So, this is how you use it.

```jsx
<my-component>
  <h1 slot="title">My Component Title</h1>
  <p slot="description">Some descriptive text</p>
  <p>General content inside the module</p>
</my-component>
```

The `useSlot` hook brings support for this style of syntax into your React components, making it extremely easy to not only
set up a component that takes content in multiple locations in the template, but also to implement that component in your codebase.

## How to use
Add the package to your React app:

```bash
npm i react-use-slots
```

Add the hook to whatever component is going to use it:

```bash
import useSlot from 'react-use-slots';
```

Then, use the hook in your component by calling function `{slot()}` component in your render function that will render your main component's children in named locations within the component template.

```jsx
const MyDialog = ({children}) => {
  const [slot] = useSlot(children);

  return (
    <dialog>
      <header>
        // you could also pass plain text for default renders
        {slot('header', <>Default component</>)}
      </header>
      <main>
        {slot()}
      </main>
    </dialog>
  )
};

export default MyDialog;
```

As you can see from the above example:

* You can define default content in a named Slot which will be rendered if the slot is not used
* The default location doesn't require a name attribute

Now, in any Component that uses this slotted Component, you can put all the JSX into the main children instead of having to use named props:

```jsx
<MyDialog>
  <span slot='title'>
    This text will be shown instead of "Default Dialog Title"
  </span>
  <p>
    Any children without a "slot" prop will automatically 
    get collected into the default location
  </p>
  <p>
    You can even have multiple children,
    and they'll all get collected into
    the proper Slot for rendering
  </p>
</MyDialog>
```

## Advanced Example

### Conditional Rendering

`useSlot` includes a function you can use to test the existence of a named slot, which allows for conditional rendering:

```jsx
const MyDialog = ({children}) => {
  const [slot, hasSlot] = useSlot(children);

  return (
    <dialog>
      <heading>
                {slot('header', <>Default component</>)}
      </heading>
      <main>
        {slot()}
      </main>
      {
        // the footer won't render unless there's at least
        // one child with a slot prop of 'buttons'
        hasSlot('buttons') && <footer>
          {slot('buttons')}
        </footer>
      }
    </dialog>
  )
};

export default MyDialog;
```
