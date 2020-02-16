import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Search from './search';
import Loader from '../loader/loader';
import SelectPackage from './select-package/select-package';
import PackageBom from './package-bom/package-bom';
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
    const dataFromOnChange = { name: 'react' };
    const returnData = new PackageBom({ package: dataFromOnChange });
    const mockedFunction = fetchPackages.mockResolvedValue(returnData);
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onChange')(dataFromOnChange);

    setTimeout(() => {
      expect(wrapper.find(SelectPackage).props().options).toEqual(returnData);
      expect(mockedFunction).toHaveBeenCalledWith(dataFromOnChange);
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

    const dataFromOnChange = { name: 'react', version: '16.2.1' };
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onSelect')(dataFromOnChange);

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

  test('should render correctly', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});
