import React from 'react';
import ReactSelect from 'react-select';

export default function SelectPackage(props) {
  function onInputChanged(value, { action }) {
    if (action === 'input-change') {
      props.onChange(value);
    }
  }

  return (
    <div className="select">
      <ReactSelect
        options={props.options.map(item => ({
          label: item.name,
          value: item.name,
          item: item
        }))}
        onChange={value => props.onSelect(value.item)}
        onInputChange={onInputChanged}
        autoFocus={true}
      />
    </div>
  );
}
