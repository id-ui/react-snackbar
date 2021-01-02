# Snackbar React Component

[![NPM](https://img.shields.io/npm/v/@idui/react-snackbar.svg)](https://www.npmjs.com/package/@idui/react-snackbar/)
[![Size](https://img.shields.io/bundlephobia/min/@idui/react-snackbar)](https://www.npmjs.com/package/@idui/react-snackbar)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Coverage Status](https://coveralls.io/repos/github/id-ui/react-snackbar/badge.svg?branch=main)](https://coveralls.io/github/id-ui/react-snackbar?branch=main)
[![LICENSE](https://img.shields.io/github/license/id-ui/react-snackbar)](https://github.com/id-ui/react-snackbar/blob/main/LICENSE)

- [Docs](https://id-ui.github.io/react-snackbar/?path=/docs/snackbar--playground)
- [Playground](https://id-ui.github.io/react-snackbar/?path=/story/snackbar--playground)

## Install

```bash
npm install --save @idui/react-snackbar
```

```bash
yarn add @idui/react-snackbar
```


### See props in [Docs](https://id-ui.github.io/react-snackbar/?path=/docs/snackbar--playground)


### Snackbar

- [Live example](https://id-ui.github.io/react-snackbar/?path=/story/snackbar--playground)

```jsx
import React from 'react'
import { Snackbar } from '@idui/react-snackbar'

function Example() {
    const [isSnackbarShown, setSnackbarShown] = useState(false);

    return (
        <div>
            <button onClick={() => setSnackbarShown(true)}>Show</button>
            {isSnackbarShown && (
                <Snackbar onClose={() => setSnackbarShown(false)}>
                    <Content>{children}</Content>
                </Snackbar>
            )}
        </div>
    );
}

const Content = styled.div`
  min-width: 30rem;
  max-width: 60rem;
  border-radius: 0.5rem;
  background-color: #14113c;
  box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.09),
    0 0.4rem 1.2rem rgba(0, 0, 0, 0.05), 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
  color: #ffffff;
  padding: 1.4rem;
`;
```

### SnackbarGroup

- [Live example](https://id-ui.github.io/react-snackbar/?path=/story/snackbar-group--playground)

```jsx
import React from 'react'
import { Snackbar } from '@idui/react-snackbar'

function Example() {
    const [items, setItems] = useState([]);

    const addItem = useCallback(() => {
        setItems([...items, { id: Math.round(Math.random() * 1000) }]);
    }, [items]);

    const removeItem = useCallback(
        (itemId) => {
            if (itemId) {
                setItems(items.filter((item) => itemId !== item.id));
            } else {
                setItems(items.slice(1));
            }
        },
        [items]
    );

    return (
        <div>
            <button onClick={addItem}>Add Item</button>
            <button onClick={() => removeItem()}>Remove Item</button>
            <SnackbarGroup
                {...props}
                onClose={removeItem}
                items={items}
                renderItem={({ data, close }) => (
                    <Content>
                        <div>№ {data.id}</div>
                        <button onClick={close}>Close</button>
                    </Content>
                )}
            />
        </div>
    );
}

const Content = styled.div`
  min-width: 30rem;
  max-width: 60rem;
  border-radius: 0.5rem;
  background-color: #14113c;
  box-shadow: 0 0.4rem 0.5rem rgba(0, 0, 0, 0.09),
    0 0.4rem 1.2rem rgba(0, 0, 0, 0.05), 0 0.2rem 0.6rem rgba(0, 0, 0, 0.1);
  color: #ffffff;
  padding: 1.4rem;
  margin-bottom: 0.5rem;
  button {
    margin-top: 1rem;
  }
`;
```

### See more details in [storybook](https://id-ui.github.io/react-snackbar/?path=/docs/snackbar--playground)

## License

MIT © [kaprisa57@gmail.com](https://github.com/id-ui)