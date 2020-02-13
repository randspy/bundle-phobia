import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import JestMockPromise from 'jest-mock-promise';
import Result from './result';
import BundleStats from './bundle-stats/bundle-stats';
import { BrowserRouter as Router } from 'react-router-dom';
import fetchBundles from './services/fetch-bundles/fetch-bundles';
import useQuery from './services/use-query/use-query';

jest.mock('./services/use-query/use-query');
jest.mock('./services/fetch-bundles/fetch-bundles');

describe('Result', () => {
  test('should wire component', () => {
    const wrapper = shallow(<Result />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should contain BundleStats with default values', () => {
    const wrapper = shallow(<Result />);
    expect(
      wrapper.containsMatchingElement(<BundleStats minified={0} gzip={0} />)
    ).toEqual(true);
  });

  test('should display fetched bundles', () => {
    useQuery.mockReturnValue({
      name: 'react',
      version: '16.3.3'
    });

    fetchBundles.mockReturnValue(
      new JestMockPromise(resolve => {
        resolve({
          '16.1.1': {
            minified: 2048,
            gzip: 1024
          }
        });
      })
    );
    let wrapper = null;
    act(() => {
      wrapper = mount(
        <Router>
          <Result />
        </Router>
      );
    });

    wrapper.update();
    expect(wrapper.find('.bundle-stats--minified').text()).toEqual('2kB');
    expect(wrapper.find('.bundle-stats--gzip').text()).toEqual('1kB');
    expect(fetchBundles).toHaveBeenCalledWith('react', '16.3.3');
  });

  test('should do nothing for empty bundle object', () => {
    useQuery.mockReturnValue({
      name: 'react',
      version: '16.3.3'
    });

    fetchBundles.mockReturnValue(
      new JestMockPromise(resolve => {
        resolve({});
      })
    );
    let wrapper = null;
    act(() => {
      wrapper = mount(
        <Router>
          <Result />
        </Router>
      );
    });

    wrapper.update();
    expect(wrapper.find('.bundle-stats--minified').text()).toEqual('0kB');
    expect(wrapper.find('.bundle-stats--gzip').text()).toEqual('0kB');
    expect(fetchBundles).toHaveBeenCalledWith('react', '16.3.3');
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Result />);
    expect(wrapper).toMatchSnapshot();
  });
});
