import { of } from 'rxjs';
import fetchBundles from '../shared/fetch-bundles/fetch-bundles';
import { withEffects } from './bundle.effects';

jest.mock('../shared/fetch-bundles/fetch-bundles');

let store;
let setter;

beforeEach(() => {
  setter = jest.fn();
  store = {
    on: jest.fn(() => of('name')),
    get: jest.fn(),
    set: jest.fn(() => setter)
  };
  fetchBundles.mockReset();
});

function flushPromises() {
  return new Promise(resolve => setImmediate(resolve));
}

describe('withEffects', () => {
  test('should do nothing for already fetch bundles', () => {
    store.get.mockReturnValueOnce([{}]);

    withEffects(store);
    expect(store.get).toHaveBeenCalledWith('bundles');
    expect(fetchBundles).toHaveBeenCalledTimes(0);
  });

  test('should fetch bundles', async () => {
    store.get.mockReturnValueOnce([]);
    fetchBundles.mockResolvedValue({
      '16.1.1': {
        minified: 2048,
        gzip: 1024
      }
    });

    const result = {
      gzip: 1024,
      gzipPercentage: '50%',
      minified: 2048,
      minifiedPercentage: '100%',
      version: '16.1.1'
    };
    withEffects(store);
    await flushPromises();

    expect(store.get).toHaveBeenCalledWith('bundles');
    expect(fetchBundles).toHaveBeenCalledTimes(1);

    expect(store.set).toHaveBeenNthCalledWith(1, 'loading');
    expect(setter).toHaveBeenNthCalledWith(1, true);

    expect(store.set).toHaveBeenNthCalledWith(2, 'bundles');
    expect(setter).toHaveBeenNthCalledWith(2, [result]);

    expect(store.set).toHaveBeenNthCalledWith(3, 'bundleStats');
    expect(setter).toHaveBeenNthCalledWith(3, result);

    expect(store.set).toHaveBeenNthCalledWith(4, 'error');
    expect(setter).toHaveBeenNthCalledWith(4, false);

    expect(store.set).toHaveBeenNthCalledWith(5, 'loading');
    expect(setter).toHaveBeenNthCalledWith(5, false);

    expect(store.set).toHaveBeenCalledTimes(5);
    expect(setter).toHaveBeenCalledTimes(5);
  });

  test('should fetch empty bundles', async () => {
    store.get.mockReturnValueOnce([]);
    fetchBundles.mockResolvedValue({});

    withEffects(store);
    await flushPromises();

    expect(store.get).toHaveBeenCalledWith('bundles');
    expect(fetchBundles).toHaveBeenCalledTimes(1);

    expect(store.set).toHaveBeenNthCalledWith(1, 'loading');
    expect(setter).toHaveBeenNthCalledWith(1, true);

    expect(store.set).toHaveBeenNthCalledWith(2, 'error');
    expect(setter).toHaveBeenNthCalledWith(2, true);

    expect(store.set).toHaveBeenNthCalledWith(3, 'loading');
    expect(setter).toHaveBeenNthCalledWith(3, false);

    expect(store.set).toHaveBeenCalledTimes(3);
  });

  test('should set error', async () => {
    store.get.mockReturnValueOnce([]);
    fetchBundles.mockRejectedValue({});

    withEffects(store);
    await flushPromises();

    expect(store.set).toHaveBeenCalledWith('error');
    expect(setter).toHaveBeenCalledWith(true);

    expect(store.set).toHaveBeenCalledWith('loading');
    expect(setter).toHaveBeenCalledWith(false);

    expect(store.set).toHaveBeenCalledWith('bundles');
    expect(setter).toHaveBeenCalledWith([]);
  });
});
