import React, { useState } from 'react';
import styled from 'styled-components';
import { PLACEMENTS_MAPPING } from 'config/constants';
import Snackbar from './Snackbar';

export default {
  title: 'Snackbar',
  component: Snackbar,
  argTypes: {
    children: {
      control: 'text',
      description: 'Snackbar content',
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
      defaultValue: Snackbar.defaultProps.animation,
      table: {
        defaultValue: {
          summary: JSON.stringify(Snackbar.defaultProps.animation),
        },
      },
    },
    placement: {
      control: { type: 'select', options: Object.keys(PLACEMENTS_MAPPING) },
      description: 'Snackbar placement',
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
      description: 'Timeout (ms) in which snackbar should disappear',
      defaultValue: 3000,
      table: {
        defaultValue: { summary: 3000 },
      },
    },
    className: {
      control: 'text',
      description: 'Snackbar className',
    },
    zIndex: {
      control: 'number',
      description: 'Snackbar z-index',
      defaultValue: 1000,
      table: {
        defaultValue: { summary: 1000 },
      },
    },
    onClose: {
      action: 'onClose',
      description: 'Handler, called on snackbar close',
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
`;

export function Playground({ children, ...props }) {
  const [isSnackbarShown, setSnackbarShown] = useState(false);

  return (
    <div>
      <button onClick={() => setSnackbarShown(true)}>Show</button>
      {isSnackbarShown && (
        <Snackbar {...props} onClose={() => setSnackbarShown(false)}>
          <Content>{children}</Content>
        </Snackbar>
      )}
    </div>
  );
}

Playground.args = {
  children: 'Hi!',
};
