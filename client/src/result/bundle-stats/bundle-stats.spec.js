import React from 'react';
import { shallow } from 'enzyme';
import BundleStats from './bundle-stats';

describe('BundleStats', () => {
  test('should wire component', () => {
    const wrapper = shallow(<BundleStats />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should display minified size in KBs', () => {
    const wrapper = shallow(<BundleStats minified={99 * 1024} />);
    expect(wrapper.find('div.bundle-stats--minified').text()).toEqual('99kB');
  });

  test('should display gzip size in KBs', () => {
    const wrapper = shallow(<BundleStats gzip={88 * 1024} />);
    expect(wrapper.find('div.bundle-stats--gzip').text()).toEqual('88kB');
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <BundleStats minified={99 * 1024} gzip={88 * 1024} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
