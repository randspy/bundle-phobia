import React from 'react';
import { shallow } from 'enzyme';
import { Redirect } from 'react-router-dom';
import Search from './search';
import SelectPackage from './select-package/select-package';
import PackageBom from './package-bom/package-bom';
import fetchPackages from './fetchPackages/fetchPackages';

jest.mock('./fetchPackages/fetchPackages');

function mockPromise(value) {
  return fetchPackages.mockImplementation(() => {
    return Promise.resolve(value);
  });
}

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
    const mockedFunction = mockPromise(returnData);
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onChange')(dataFromOnChange);

    setTimeout(() => {
      expect(wrapper.find(SelectPackage).props().options).toEqual(returnData);
      expect(mockedFunction).toHaveBeenCalledWith(dataFromOnChange);
      done();
    });
  });

  test('should redirect to result page when package is selected', () => {
    const dataFromOnChange = { name: 'react', version: '16.2.1' };
    const wrapper = shallow(<Search />);
    wrapper.find(SelectPackage).prop('onSelect')(dataFromOnChange);
    expect(wrapper.find(Redirect).props().to).toEqual(
      '/result?name=react&version=16.2.1'
    );
  });

  it('should render correctly', () => {
    const wrapper = shallow(<Search />);
    expect(wrapper).toMatchSnapshot();
  });
});
