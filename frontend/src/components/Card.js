import { mode } from '@chakra-ui/theme-tools';

const Card = {
  baseStyle: (props) => ({
    p: '20px',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    position: 'relative',
    borderRadius: '20px',
    minWidth: '0px',
    wordWrap: 'break-word',
    bg: mode('#ffffff', 'navy.800')(props),
    boxShadow: mode(
      '14px 17px 40px 4px rgba(112, 144, 176, 0.08)',
      'unset',
    )(props),
    backgroundClip: 'border-box',
  }),
};

export default Card;