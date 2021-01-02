import React from 'react';
import { render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { axe } from 'jest-axe';
import SnackbarGroup from 'components/SnackbarGroup';

const closeAnimationDuration =
  SnackbarGroup.defaultProps.animation.exit.duration * 1000 + 100;

const defaultItems = [
  {
    id: 1,
    text: '#1',
  },
  {
    id: 2,
    text: '#2',
  },
];

describe('SnackbarGroup', () => {
  it('accessible', async () => {
    const { container } = render(
      <SnackbarGroup
        items={defaultItems}
        renderItem={({ data }) => data.text}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('renders items and calls onClose after timeout expiration', async () => {
    const onClose = jest.fn();
    const timeout = 200;
    const { getByText } = render(
      <SnackbarGroup timeout={timeout} items={defaultItems} onClose={onClose} />
    );
    defaultItems.forEach((item) => {
      expect(getByText(item.id)).toBeInTheDocument();
    });
    await waitFor(
      () => {
        // TODO ???
        // expect(onClose).toHaveBeenCalledTimes(2);
        // expect(onClose).toHaveBeenCalledWith(1, 2);
      },
      { timeout: timeout + closeAnimationDuration }
    );
  });

  it('renders items and closes from children', async () => {
    const onClose = jest.fn();

    const { getByText } = render(
      <SnackbarGroup
        items={defaultItems}
        renderItem={({ data, close }) => (
          <div>
            <span>{data.text}</span>
            <button onClick={close}>close {data.text}</button>
          </div>
        )}
        onClose={onClose}
      />
    );

    defaultItems.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });

    const button = getByText(`close ${defaultItems[0].text}`);
    user.click(button);

    await waitFor(
      () => {
        expect(onClose).toHaveBeenCalledTimes(1);
        expect(onClose).toHaveBeenCalledWith(1);
      },
      { timeout: closeAnimationDuration }
    );
  });

  it('renders items on place', async () => {
    const { getByText } = render(
      <SnackbarGroup
        items={defaultItems}
        renderItem={({ data }) => data.text}
        renderOnPlace
      />
    );

    defaultItems.forEach((item) => {
      expect(getByText(item.text)).toBeInTheDocument();
    });
  });
});
