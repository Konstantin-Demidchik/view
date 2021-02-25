import {
  compose,
  withProps,
} from 'recompose';

import HeaderView from './HeaderView';

export default compose(
  withProps(() => ({
    theme: 'default',
  })),
)(HeaderView);
