# react-accumulated-hook

This hook is useful for periodically saving form data without pressing submit button.

# Getting started

## Install

```
yarn add react-accumulated-hook
or
npm install react-accumulated-hook
```

## Usage

Try the following code to test
```
import { useAccumulated } from 'react-accumulated-hook'

...

const [fields, accumulatedChanges, setField] = useAccumulated({
  timeout: 2000,
  initialData: { name: '', email: '' },
  action: (accumulatedData) => {
    console.log('accumulatedData', accumulatedData)
  },
})

...

return (
  <>
    <p>While you modifying form data without delays of 2 seconds there is nothing happened.</p>
    <p>If you didn't modify form 2 seconds there is new unsaved data appears in console.</p>
    <p>It's useful for periodically saving form data without pressing submit button.</p>
    <label>
      Name:
      <input value={fields.name} onChange={(event) => { setField('name', event.target.value) }}/>
    </label>
    <br/>
    <label>
      Email:
      <input value={fields.email} onChange={(event) => { setField('email', event.target.value) }}/>
    </label>
    <br/>
    {!!accumulatedChanges && (
      <p>Unsaved changes: {JSON.stringify(accumulatedChanges)} will be passed to action after 2 seconds.</p>
    )}
  </>
)
```
