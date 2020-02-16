import { createConnectedStore } from 'undux';
import { withEffects } from './bundle.effects';

const initialState = {
  loading: false,
  packageName: '',
  bundles: [],
  bundleStats: {
    minified: 0,
    gzip: 0
  },
  error: false
};

export default createConnectedStore(initialState, withEffects);
