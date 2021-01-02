import styled, { css } from 'styled-components';
import { prop, switchProp } from 'styled-tools';
import { motion } from 'framer-motion';

export const Container = styled(motion.div)`
  position: absolute;
  z-index: ${prop('zIndex')};
  ${switchProp('placement', {
    top: css`
      top: ${prop('distanceToContainer')};
      left: 50%;
      transform: translateX(-50%);
    `,
    topRight: css`
      top: ${prop('distanceToContainer')};
      right: ${prop('distanceToContainer')};
    `,
    topLeft: css`
      top: ${prop('distanceToContainer')};
      left: ${prop('distanceToContainer')};
    `,
    bottom: css`
      bottom: ${prop('distanceToContainer')};
      left: 50%;
      transform: translateX(-50%);
    `,
    bottomRight: css`
      bottom: ${prop('distanceToContainer')};
      right: ${prop('distanceToContainer')};
    `,
    bottomLeft: css`
      bottom: ${prop('distanceToContainer')};
      left: ${prop('distanceToContainer')};
    `,
    left: css`
      left: ${prop('distanceToContainer')};
      top: 50%;
      transform: translateY(-50%);
    `,
    right: css`
      right: ${prop('distanceToContainer')};
      top: 50%;
      transform: translateY(-50%);
    `,
  })};
`;
