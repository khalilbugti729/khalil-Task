import DropDownPicker, {ItemType} from 'react-native-dropdown-picker';
import React, {useState} from 'react';
import {CUSTOM_THEME} from '../util/CUSTOM_THEME';
import {StyleSheet} from 'react-native';

interface LicenceType {
  label: string;
  value: string;
}

interface DropDownInputProps {
  data: LicenceType[];
  getValue: (value: string | undefined) => void;
  intialvalue?: string;
}

const DropDownInput = ({data, getValue, intialvalue}: DropDownInputProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(intialvalue ? intialvalue : data[0].value);

  const selectValuehandeler = (item: ItemType<string>) => {
    getValue(item.value);
  };

  return (
    <DropDownPicker
      style={styles.dropdownStyle}
      open={open}
      value={value}
      items={data}
      setOpen={setOpen}
      setValue={setValue}
      onSelectItem={selectValuehandeler}
    />
  );
};

export default DropDownInput;
const styles = StyleSheet.create({
  dropdownStyle: {
    backgroundColor: CUSTOM_THEME.GREY_COLOR,
    borderWidth: 0,
  },
});
