// @flow

import _ from 'lodash';
import { action, computed, extendObservable, observable } from 'mobx';

export type TextOptionProps = {
  key:        string | number,
  value:      string,
  label?:     string,
  selected?:  boolean,
};

export type FieldProps = {
  multiple?: boolean,
  options: Array<{
    key:        number | string,
    value:      string,
    label?:     string,
    selected?:  boolean,
  }>,
};


class MobxTextPickerStoreBase {

  @observable store: *;

  constructor() {
    Object.keys(this.store).forEach((key) => {
      this.initField(key);
    });
  }

  initField(fieldName: string) {
    extendObservable(this, {

      // @computed areaSelected
      // => [{ option(selected) }, { option(selected) }]

      [`${fieldName}Selected`]: computed((): Array<TextOptionProps> => (
        _.filter(this.store[fieldName].options.toJS(), option => (option.selected))
      )),

      // @computed areaSelectedValueInString
      // => 'sydney, melborne'

      [`${fieldName}SelectedValueInString`]: computed((): string => (
        // $FlowIgnore
        this[`${fieldName}Selected`].map(option => option.value).join(', ')
      )),

      // @computed areaSelectedLabelInString
      // => 'Sydney Area, Melborne Area'

      [`${fieldName}SelectedLabelInString`]: computed((): string => (
        // $FlowIgnore
        this[`${fieldName}Selected`].map(option => (option.label ? option.label : option.value)).join(', ')
      )),

      // @action areaUpdate(index, selected)

      [`${fieldName}Update`]: action((index: number, selected: boolean): void => {
        const options  = this.store[fieldName].options.toJS();
        const multiple = this.store[fieldName].multiple;
        this.store[fieldName].options = options.map((option, i) => {
          let s = option.selected;
          if (i === index) {
            s = selected;
          }
          if (i !== index && !multiple) {
            s = false;
          }
          return { ...option, selected: s };
        });
      }),

    });
  }
}

export default MobxTextPickerStoreBase;
