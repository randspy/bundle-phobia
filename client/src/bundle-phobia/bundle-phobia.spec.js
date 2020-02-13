import React from 'react';
import { shallow } from 'enzyme';
import BundlePhobia from './bundle-phobia';

describe('BundlePhobia', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<BundlePhobia />);
    expect(wrapper).toMatchSnapshot();
  });
});
