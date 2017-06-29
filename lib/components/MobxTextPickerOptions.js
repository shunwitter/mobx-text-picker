// @flow

import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

import type { Props } from './MobxTextPicker';
import type { OptionProps } from '../stores/MobxTextPickerStoreBase';
import colors from './colors';
import itemCheckIconImage from '../images/itemCheckIcon@3x.png';

const styles = StyleSheet.create({
  itemStyle: {
    flexDirection: 'row',
    height: 40,
  },
  itemButtonWrapStyle: {
    flex: 1,
  },
  itemButtonStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  itemButtonTextStyle: {
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    fontWeight: '300',
  },
  itemButtonTextStyleActive: {
    color: colors.blue,
  },
  itemIconStyle: {
    width: 50,
    paddingRight: 10,
  },
});

type ChildProps = {
  handleSelect: Function,
}


function renderItem(
  props: Props & ChildProps,
  option: OptionProps,
  index: number): ReactElement<*> {
  const {
    itemStyle,
    itemButtonWrapStyle, itemButtonStyle, itemButtonTextStyle, itemButtonTextStyleActive,
    itemIconStyle } = styles;

  const style = option.selected ?
    [itemButtonTextStyle, itemButtonTextStyleActive] : [itemButtonTextStyle];

  return (
    <View key={option.key} style={itemStyle}>
      <View style={itemButtonWrapStyle}>
        <TouchableOpacity
          style={itemButtonStyle}
          onPress={() => { props.handleSelect(props.fieldName, index, !option.selected); }}
        >
          <Text style={style}>{option.label ? option.label : option.value}</Text>
        </TouchableOpacity>
      </View>
      <View style={itemIconStyle}>
        { option.selected ?
          <Image width="40" height="40" source={itemCheckIconImage} />
          :
          null }
      </View>
    </View>
  );
}

const MobxTextPickerOptions = (props: Props & ChildProps): ReactElement<View> => {
  const itemElements: Array<ReactElement<*>> = [];
  props.options.forEach((option, index) => {
    itemElements.push(renderItem(props, option, index));
  });

  return (
    <View>
      {itemElements}
    </View>
  );
};

export default MobxTextPickerOptions;
