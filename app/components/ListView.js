import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Picker} from 'react-native';
import TodoModel from './TodoModel';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';
import Icon from  'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-material-dropdown';

let dataList = TodoService.findIncomplete();
var dataListOrder = getOrder(dataList);

function getOrder(list) {
  return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
  Utils.move(dataListOrder, parseInt(fromIndex), parseInt(toIndex));
  if (listView.forceUpdate) listView.forceUpdate();
}

class ListView extends Component {
  constructor(props) {
    super(props);
    this.updateDataList = this.updateDataList.bind(this);
    this._onCompletedChange = this._onCompletedChange.bind(this);
    this.state = {
      dataList: dataList
    }
  }

  updateDataList(dataList) {
    dataListOrder = getOrder(dataList);
    this.setState({
      dataList: dataList
    });
  }

  _onCompletedChange() {
    if (this.forceUpdate) this.forceUpdate();
  }

  refresh(filter) {
    if(filter != "all") {
      dataList = TodoService.findIncomplete();
    }
    else {
      dataList = TodoService.filterRecords(filter); 
    }
  }

  render() {
    let data = [{
      value: 'Orange',
    }, {
      value: 'Blue',
    }, {
      value: 'Green',
    }, {
      value: 'Gold',
    }, {
      value: 'Brown',
    }, {
      value: 'Red',
    }, {
      value: 'Black',
    }];
    let listView = (<View></View>);
    if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref='listView'
          style={{flex: 1}}
          data={this.state.dataList}
          order={dataListOrder}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} onCompletedChange={this._onCompletedChange}/>}
        />
      );
      typePicker = (
        <View style={{flexDirection: 'row', justifyContent: 'center', flex: 1}}>
          <View style={{flex: 1}}>
            <Dropdown label='Filter' data={data} dropdownOffset={{top:-40, left: 0}} style={{flex: 1}} onChangeText={this.refresh(selectedItem)}/>
          </View>
          <View style={{alignContent: 'center'}}>
            <Icon.Button name='refresh' style={{backgroundColor: '#F8F8F8'}} color='#C5C8C9' />
          </View>
        </View>
      );
      selectedType = (
        <Text style={{fontSize: 30, alignSelf: 'center', color: 'red'}}>{this.state.type}</Text>
      );
    }

    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          {/* <OmniBox
            data={Array.from(dataList)}
            updateDataList={this.updateDataList}/> */}
          {listView}
          {typePicker}
        </View>
    )
  }
};

module.exports = ListView;