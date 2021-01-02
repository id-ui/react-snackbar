import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import Snackbar from 'components/Snackbar';

const closeAnimationDuration =
  Snackbar.defaultProps.animation.transition.duration * 1000 + 100;

describe('Snackbar', () => {
  it('accessible', async () => {
    const { container } = render(
      <Snackbar>
        <div>Hi!</div>
      </Snackbar>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders children and hides after timeout expiration', async () => {
    const timeout = 200;
    const { getByText, queryByText } = render(
      <Snackbar timeout={timeout}>
        <div>Hi!</div>
      </Snackbar>
    );
    expect(getByText('Hi!')).toBeInTheDocument();
    await waitFor(() => expect(queryByText('Hi!')).not.toBeInTheDocument(), {
      timeout: timeout + closeAnimationDuration,
    });
  });

  it('does not hide if no timeout', async () => {
    const { getByText } = render(
      <Snackbar timeout={0}>
        <div>Hi!</div>
      </Snackbar>
    );
    expect(getByText('Hi!')).toBeInTheDocument();
    await waitFor(() => expect(getByText('Hi!')).toBeInTheDocument(), {
      timeout: closeAnimationDuration,
    });
  });

  it('renders children function and closes from children', async () => {
    const closeAnimationDuration = 500;
    const { getByText, queryByText } = render(
      <Snackbar
        animation={{
          ...Snackbar.defaultProps.animation,
          exit: { opacity: 0, duration: closeAnimationDuration / 1000 },
        }}
      >
        {({ close }) => (
          <div>
            <span>Hi!</span>
            <button onClick={close}>close</button>
          </div>
        )}
      </Snackbar>
    );
    expect(getByText('Hi!')).toBeInTheDocument();
    const button = getByText('close');
    user.click(button);
    await waitFor(() => expect(queryByText('Hi!')).not.toBeInTheDocument(), {
      timeout: closeAnimationDuration,
    });
  });

  it('renders on place', async () => {
    const timeout = 200;
    const { getByText, queryByText } = render(
      <Snackbar
        timeout={timeout}
        renderOnPlace
        animation={{
          ...Snackbar.defaultProps.animation,
          exit: { opacity: 0, duration: undefined },
          transition: undefined,
        }}
      >
        <div>Hi!</div>
      </Snackbar>
    );
    expect(getByText('Hi!')).toBeInTheDocument();
    await waitFor(() => expect(queryByText('Hi!')).not.toBeInTheDocument(), {
      timeout: timeout + 1000,
    });
  });
});
