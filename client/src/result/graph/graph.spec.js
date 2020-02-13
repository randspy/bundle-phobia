import React from 'react';
import { shallow } from 'enzyme';
import Graph from './graph';

describe('Graph', () => {
  test('should wire component', () => {
    const wrapper = shallow(<Graph bundles={[]} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <Graph
        bundles={[
          {
            name: 'react',
            version: '14.5.3',
            minified: 20024,
            minifiedPercentage: '33%',
            gzip: 10000,
            gzipPercentage: '17%'
          }
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
