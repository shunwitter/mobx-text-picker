# MobxTextPicker

![mobx-text-picker](https://user-images.githubusercontent.com/3123900/27695829-f90c2bf4-5d2a-11e7-9c61-e5fbbe0d5f3b.gif)

# Usage

```js:ObservableSearchStore.js
// @flow

import { observable } from 'mobx';
import { MobxTextPickerStoreBase } from 'mobx-text-picker';
import type { FieldProps } from 'mobx-text-picker';

class ObservableSearchStore extends MobxTextPickerStoreBase {

  @observable store: {
    area: FieldProps,
  } = {
    area: {
      multiple: false,
      options: [
        { key: 1, value: 'syd', label: 'Sydney' },
        { key: 2, value: 'mel', label: 'Melborne' },
        { key: 3, value: 'crn', label: 'Cairns' },
      ],
    },
    // etc...
  };

}

export default ObservableSearchStore;
```



```js:JobSearch.js
// @flow

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { inject, observer } from 'mobx-react/native';
import MobxTextPicker from 'mobx-text-picker';
import React, { Component } from 'react';

import ObservableSearchStore from '../stores/ObservableSearchStore';

@inject('searchStore')
@observer
class JobSearch extends Component {

  handlePress() {
    // do something
  }

  render() {
    return (
      <View>
        <MobxTextPicker
          placeholder="Area"
          resource={this.props.searchStore}
          fieldName="area"
        />
        // etc...
      </View>
    );
  }
}

export default JobSearch;
```
