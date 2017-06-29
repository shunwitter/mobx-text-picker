// @flow

import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import MobxTextPickerOptions from './MobxTextPickerOptions';
import closeCircleImage from '../../images/closeCircle@3x.png';

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    width: '100%',
  },
  inputStyle: {
    flex: 1,
    backgroundColor: '#fff',
    height: 36,
    padding: 8,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '300',
  },
  modalStyle: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
    padding: 20,
    paddingTop: 40,
  },
  itemContainerStyle: {
    flex: 1,
  },
  closeButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 70,
    padding: 10,
  },
});

export type Props = {
  resource:     *,
  fieldName:    string,
  placeholder?: string,
  style?:       { [string]: string },
};

type State = {
  isModalVisible: boolean,
};

@observer
class MobxTextPicker extends Component {

  props: Props;
  state: State;

  static defaultProps = {
    placeholder:  '',
    style:        {},
  }

  constructor(props: Props) {
    super(props);
    this.state = { isModalVisible: false };
  }

  toggleModal(visible: boolean): void {
    this.setState({ isModalVisible: visible });
  }

  @autobind handleSelect(fieldName: string, index: number, selected: boolean): void {
    this.props.resource[`${fieldName}Update`](index, selected);
  }

  renderModal(): ReactElement<Modal> {
    const { modalStyle, itemContainerStyle, closeButtonStyle } = styles;
    const { resource, fieldName } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={this.state.isModalVisible}
      >
        <View style={modalStyle}>
          <ScrollView style={itemContainerStyle}>
            <MobxTextPickerOptions
              {...this.props}
              options={resource.store[fieldName].options}
              handleSelect={this.handleSelect}
            />
          </ScrollView>
          <View style={closeButtonStyle}>
            <TouchableOpacity onPress={() => { this.toggleModal(false); }}>
              <Image width="50" height="50" source={closeCircleImage} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  render(): ReactElement<View> {
    const { containerStyle, inputStyle } = styles;
    const { resource, fieldName, placeholder, style } = this.props;

    return (
      <View style={containerStyle}>
        <TextInput
          style={[inputStyle, style]}
          placeholder={placeholder}
          onFocus={() => { this.toggleModal(true); }}
          value={resource[`${fieldName}SelectedLabelInString`]}
        />
        {this.renderModal()}
      </View>
    );
  }
}

export default MobxTextPicker;
