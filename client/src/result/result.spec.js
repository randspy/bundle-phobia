import React from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Result from './result';
import BundleStats from './bundle-stats/bundle-stats';
import Graph from './graph/graph';
import Loader from '../loader/loader';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import useQuery from './services/use-query/use-query';
import BundleStore from '../store/bundle.store';

jest.mock('./services/use-query/use-query');
jest.mock('../store/bundle.store');

let setter = null;
let getter = null;

beforeEach(() => {
  getter = jest.fn(value => {
    if (value === 'bundleStats') {
      return { minified: 0, gzip: 0 };
    }
    if (value === 'bundles') {
      return [];
    }
    return false;
  });

  setter = jest.fn();

  BundleStore.useStore.mockImplementation(() => {
    return {
      get: getter,
      set: setter
    };
  });
});

describe('Result', () => {
  test('should wire component', () => {
    const wrapper = shallow(<Result />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should get bundle data', () => {
    getter.mockImplementation(value => {
      if (value === 'bundleStats') {
        return { minified: 34, gzip: 22 };
      }
      if (value === 'bundles') {
        return [{}];
      }
      return false;
    });
    const wrapper = shallow(<Result />);
    expect(
      wrapper.containsMatchingElement(<BundleStats minified={34} gzip={22} />)
    ).toEqual(true);
    expect(wrapper.containsMatchingElement(<Graph bundles={[{}]} />)).toEqual(
      true
    );
  });

  test('should set package name from the query', () => {
    useQuery.mockReturnValue({
      name: 'react'
    });
    let setterReturn = jest.fn(() => {});
    setter.mockImplementation(() => setterReturn);
    getter.mockImplementation(value => {
      if (value === 'bundleStats') {
        return { minified: 0, gzip: 0 };
      }
      if (value === 'bundles') {
        return [];
      }
      return false;
    });

    let wrapper = null;
    act(() => {
      wrapper = mount(
        <Router>
          <Result />
        </Router>
      );
    });

    expect(setter).toHaveBeenCalledWith('packageName');
    expect(setterReturn).toHaveBeenCalledWith('react');

    expect(setter).toHaveBeenCalledTimes(1);
    expect(setterReturn).toHaveBeenCalledTimes(1);
  });

  test('should clean bundles', () => {
    let setterReturn = jest.fn(() => {});
    setter.mockImplementation(() => setterReturn);

    const wrapper = shallow(<Result />);
    wrapper.find('.result--back-button').simulate('click');
    wrapper.update();

    expect(setter).toHaveBeenCalledWith('bundles');
    expect(setterReturn).toHaveBeenCalledWith([]);

    expect(setter).toHaveBeenCalledTimes(1);
    expect(setterReturn).toHaveBeenCalledTimes(1);
  });

  test('should be in the loading state', () => {
    getter.mockImplementation(value => {
      return true;
    });

    const wrapper = shallow(<Result />);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  test('should redirect to home page for error', () => {
    getter.mockImplementation(value => {
      if (value === 'error') {
        return true;
      }

      return false;
    });

    const wrapper = shallow(<Result />);
    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Result />);
    expect(wrapper).toMatchSnapshot();
  });
});
