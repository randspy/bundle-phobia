import React from 'react';
import { shallow } from 'enzyme';
import Loader from './loader';

describe('Loader', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
