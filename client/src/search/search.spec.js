import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Search from './search';
import Loader from '../loader/loader';
import SelectPackage from './select-package/select-package';
import fetchPackages from './fetchPackages/fetchPackages';
import BundleStore from '../store/bundle.store';

jest.mock('./fetchPackages/fetchPackages');
jest.mock('../store/bundle.store');

let setter = null;
let getter = null;

beforeEach(() => {
  getter = jest.fn(() => false);
  setter = jest.fn();

  BundleStore.useStore.mockImplementation(() => {
    return {
      get: getter,
      set: setter
    };
  });
});

describe('Search', () => {
  test('should wire component', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should contain SelectPackage', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper.containsMatchingElement(<SelectPackage />)).toEqual(true);
  });

  test('should set options drop down list based on input', done => {
    const options = { name: 'react' };
    const mockedFunction = fetchPackages.mockResolvedValue([options]);
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onChange')(options);

    setTimeout(() => {
      expect(wrapper.find(SelectPackage).props().options).toEqual([options]);
      expect(mockedFunction).toHaveBeenCalledWith(options);
      done();
    });
  });

  test('should select package name', () => {
    let setterReturn = jest.fn(() => {});
    setter.mockImplementation(() => setterReturn);
    getter.mockImplementation(value => {
      if (value === 'bundles') {
        return [];
      }
      return false;
    });

    const options = { name: 'react', version: '16.2.1' };
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onSelect')(options);

    expect(setter).toHaveBeenCalledWith('packageName');
    expect(setterReturn).toHaveBeenCalledWith('react');

    expect(setter).toHaveBeenCalledTimes(1);
    expect(setterReturn).toHaveBeenCalledTimes(1);
  });

  test('should redirect to result page when bundles are present', () => {
    getter.mockImplementation(value => {
      if (value === 'bundles') {
        return [{}];
      }
      if (value === 'packageName') {
        return 'react';
      }
      return false;
    });

    const wrapper = shallow(<Search />);
    expect(wrapper.find(Redirect).props().to).toEqual('/result?name=react');
  });

  test('should be in the loading state', () => {
    getter.mockImplementation(value => {
      if (value === 'loading') {
        return true;
      }

      return [];
    });

    const wrapper = shallow(<Search />);
    expect(wrapper.find(Loader)).toHaveLength(1);
  });

  test('should display error message', () => {
    getter.mockImplementation(value => {
      if (value === 'error') {
        return true;
      }
      if (value === 'loading') {
        return false;
      }

      return [];
    });

    const wrapper = shallow(<Search />);
    expect(wrapper.find('.search--error').text()).toEqual(
      'Internal server error. Could not process specified package.'
    );
  });

  test('should render correctly', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});
