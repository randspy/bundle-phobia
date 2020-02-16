import fetchBundles from '../shared/fetch-bundles/fetch-bundles';
import fromApi from '../shared/from-api/from-api';

export function withEffects(store) {
  store.on('packageName').subscribe(packageName => {
    if (!store.get('bundles').length) {
      store.set('loading')(true);
      fetchBundles(packageName).then(result => {
        const data = fromApi(result);
        if (data.length) {
          store.set('bundles')(data);
          store.set('bundleStats')(data[data.length - 1]);
        }
        store.set('loading')(false);
      });
    }
  });
  return store;
}
