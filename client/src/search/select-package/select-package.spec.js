import React from 'react';
import { shallow } from 'enzyme';
import SelectPackage from './select-package';
import ReactSelect from 'react-select';

describe('SelectPackage', () => {
  test('should wire component', () => {
    const wrapper = shallow(<SelectPackage options={[]} />);
    expect(wrapper.exists()).toBe(true);
  });

  test('should contain ReactSelect', () => {
    const wrapper = shallow(<SelectPackage options={[]} />);
    expect(wrapper.containsMatchingElement(<ReactSelect />)).toEqual(true);
  });

  test('options should be mapped to structure recognized by library', () => {
    const wrapper = shallow(<SelectPackage options={[{ name: 'react' }]} />);
    expect(
      wrapper
        .find(ReactSelect)
        .first()
        .getElement().props.options
    ).toEqual([{ label: 'react', value: 'react', item: { name: 'react' } }]);
  });

  test('should call onChange prop when user input change', () => {
    const props = {
      options: [],
      onChange: () => false
    };
    const onChangeSpy = jest.spyOn(props, 'onChange');
    const wrapper = shallow(<SelectPackage {...props} />);
    wrapper.find(ReactSelect).prop('onInputChange')('r');
    wrapper.find(ReactSelect).prop('onInputChange')('re');
    wrapper.find(ReactSelect).prop('onInputChange')('rea');

    expect(onChangeSpy).toHaveBeenCalledWith('r');
    expect(onChangeSpy).toHaveBeenCalledWith('re');
    expect(onChangeSpy).toHaveBeenCalledWith('rea');
    expect(onChangeSpy).toHaveBeenCalledTimes(3);
  });

  test('should call onSelect prop when user input change', () => {
    const props = {
      options: [],
      onSelect: () => false
    };
    const dataFromOnChange = {
      label: 'react',
      value: 'react',
      item: { name: 'react' }
    };
    const onSelectSpy = jest.spyOn(props, 'onSelect');
    const wrapper = shallow(<SelectPackage {...props} />);
    wrapper.find(ReactSelect).prop('onChange')(dataFromOnChange);

    expect(onSelectSpy).toHaveBeenCalledWith({ name: 'react' });
    expect(onSelectSpy).toHaveBeenCalledTimes(1);
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <SelectPackage
        options={[]}
        onSelect={() => false}
        onChange={() => false}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
