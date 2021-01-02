import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Container } from 'config/styled';
import { PLACEMENTS_MAPPING } from 'config/constants';

function Snackbar({
  children: renderChildren,
  getContainer,
  renderOnPlace,
  timeout,
  onClose,
  animation,
  ...containerProps
}) {
  const [isOpen, setOpen] = useState(false);

  const close = useCallback(() => {
    setOpen(false);

    setTimeout(() => {
      onClose();
    }, ((animation.exit && animation.exit.duration) || (animation.transition && animation.transition.duration) || 1) * 1000);
  }, [animation.transition, animation.exit, onClose]);

  useEffect(() => {
    setOpen(true);
    if (timeout) {
      const timer = setTimeout(() => {
        close();
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [timeout, close]);

  const container = getContainer();

  const children =
    typeof renderChildren === 'function'
      ? renderChildren({ close })
      : renderChildren;

  if (renderOnPlace) {
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div {...containerProps} {...animation} key="snackbar">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    container &&
    createPortal(
      <AnimatePresence>
        {isOpen && (
          <Container {...containerProps} {...animation} key="snackbar">
            {children}
          </Container>
        )}
      </AnimatePresence>,
      container
    )
  );
}

Snackbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
    PropTypes.elementType,
  ]),
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
};

Snackbar.defaultProps = {
  getContainer: () => document.body,
  animation: {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
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
};

export default Snackbar;
