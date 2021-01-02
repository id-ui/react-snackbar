import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { withPropsTable } from 'storybook-addon-react-docgen';
import { PLACEMENTS_MAPPING } from 'config/constants';
import SnackbarGroup from './SnackbarGroup';

export default {
  title: 'SnackbarGroup',
  component: SnackbarGroup,
  argTypes: {
    items: {
      disable: true,
      description:
        'SnackbarGroup children config. Each item should have prop with key="idKey" from props, idKey="id" by default. Item can have prop "render", which accepts { close, data }, where data is item itself and close is function for closing snackbar',
    },
    renderItem: {
      disable: true,
      description:
        'Function for rendering item, accepts { data, close }, where data is item from items and close is function for closing snackbar',
      table: {
        defaultValue: { summary: '({ data }) => data.id' },
      },
    },
    idKey: {
      control: 'text',
      description: 'property of item from items with unique value',
      defaultValue: 'id',
      table: {
        defaultValue: { summary: 'id' },
      },
    },
    getContainer: {
      disable: true,
      description: 'Function, that should return snackbar container',
      table: {
        defaultValue: { summary: '() => document.body' },
      },
    },
    renderOnPlace: {
      control: 'boolean',
      description:
        'render snackbar on place (do not use portal). Placement setting not applied in this case.',
      defaultValue: false,
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    animation: {
      control: 'object',
      description: 'framer-motion animation props for snackbar opening/closing',
      defaultValue: SnackbarGroup.defaultProps.animation,
      table: {
        defaultValue: {
          summary: JSON.stringify(SnackbarGroup.defaultProps.animation),
        },
      },
    },
    placement: {
      control: { type: 'select', options: Object.keys(PLACEMENTS_MAPPING) },
      description: 'SnackbarGroup placement',
      defaultValue: 'topRight',
      table: {
        defaultValue: { summary: 'topRight' },
      },
    },
    distanceToContainer: {
      control: 'text',
      description: 'Distance from snackbar to container bounds',
      defaultValue: '20px',
      table: {
        defaultValue: { summary: '20px' },
      },
    },
    timeout: {
      control: 'number',
      description:
        'Timeout (ms) in which snackbar should disappear automatically',
      defaultValue: 3000,
      table: {
        defaultValue: { summary: 3000 },
      },
    },
    className: {
      control: 'text',
      description: 'SnackbarGroup className',
    },
    zIndex: {
      control: 'number',
      description: 'SnackbarGroup z-index',
      defaultValue: 1000,
      table: {
        defaultValue: { summary: 1000 },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Event, fired when snackbar closed',
    },
  },
  decorators: [withPropsTable],
  parameters: {
    props: {
      propTablesInclude: [SnackbarGroup],
    },
  },
};

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

export function Playground(props) {
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
      <button onClick={addItem} style={{ marginRight: '1rem' }}>
        Add Item
      </button>
      <button onClick={() => removeItem()}>Remove Item</button>
      <SnackbarGroup
        {...props}
        onClose={removeItem}
        items={items}
        renderItem={({ data }) => (
          <Content>
            <div>№ {data.id}</div>
          </Content>
        )}
      />
    </div>
  );
}

export function CloseByChildren(props) {
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
      <button onClick={addItem} style={{ marginRight: '1rem' }}>
        Add Item
      </button>
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

CloseByChildren.args = {
  timeout: 0,
};
