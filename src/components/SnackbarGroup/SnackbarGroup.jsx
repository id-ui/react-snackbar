import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { Container } from 'config/styled';
import { PLACEMENTS_MAPPING } from 'config/constants';

function Item({ timeout, onClose, id, animation, render, data, ...props }) {
  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        onClose(id);
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeout, onClose, id]);

  return (
    <motion.div {...props} {...animation}>
      {render({ close: () => onClose(id), data })}
    </motion.div>
  );
}

function SnackbarGroup({
  items,
  renderItem,
  getContainer,
  renderOnPlace,
  className,
  placement,
  distanceToContainer,
  idKey,
  ...itemProps
}) {
  const container = getContainer();

  const content = (
    <AnimateSharedLayout>
      <AnimatePresence initial={false}>
        {items.map((item) => (
          <Item
            key={item[idKey]}
            layoutId={item[idKey]}
            id={item[idKey]}
            render={item.render || renderItem}
            data={item}
            {...itemProps}
          />
        ))}
      </AnimatePresence>
    </AnimateSharedLayout>
  );

  if (renderOnPlace) {
    return content;
  }

  return (
    container &&
    createPortal(
      <Container
        className={className}
        placement={placement}
        distanceToContainer={distanceToContainer}
      >
        {content}
      </Container>,
      container
    )
  );
}

SnackbarGroup.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      render: PropTypes.func,
    })
  ),
  renderItem: PropTypes.func,
  getContainer: PropTypes.func,
  renderOnPlace: PropTypes.bool,
  animation: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    exit: PropTypes.object,
    transition: PropTypes.object,
  }),
  placement: PropTypes.oneOf(Object.keys(PLACEMENTS_MAPPING)),
  timeout: PropTypes.number,
  className: PropTypes.string,
  distanceToContainer: PropTypes.string,
  zIndex: PropTypes.number,
  onClose: PropTypes.func,
  idKey: PropTypes.string,
};

SnackbarGroup.defaultProps = {
  getContainer: () => document.body,
  animation: {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
    transition: {
      delay: 0,
      duration: 0.5,
    },
  },
  placement: 'topRight',
  timeout: 3000,
  renderOnPlace: false,
  distanceToContainer: '20px',
  zIndex: 1000,
  onClose: () => {},
  idKey: 'id',
  renderItem: ({ data }) => data.id,
  items: [],
};

export default SnackbarGroup;
