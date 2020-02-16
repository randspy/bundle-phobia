import fetchBundles from '../shared/fetch-bundles/fetch-bundles';
import fromApi from '../shared/from-api/from-api';

export function withEffects(store) {
  store.on('packageName').subscribe(packageName => {
    if (!store.get('bundles').length) {
      store.set('loading')(true);

      fetchBundles(packageName).then(
        result => {
          setResult(result);
        },
        () => {
          setErrorState();
        }
      );
    }
  });
  return store;

  function setResult(result) {
    const processedData = fromApi(result);
    if (processedData.length) {
      store.set('bundles')(processedData);
      store.set('bundleStats')(processedData[processedData.length - 1]);
      store.set('error')(false);
    } else {
      store.set('error')(true);
    }
    store.set('loading')(false);
  }

  function setErrorState() {
    store.set('error')(true);
    store.set('loading')(false);
    store.set('bundles')([]);
  }
}
