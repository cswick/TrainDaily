import React, { Component } from 'react';
import { Dimensions, Text, PixelRatio, View, TouchableHighlight} from 'react-native';
import TodoModel from './TodoModel';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';
import Icon from  'react-native-vector-icons/MaterialIcons';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import AddItemModal from './AddItemModal';

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
    this.refresh = this.refresh.bind(this);
    this.addItem = this.addItem.bind(this);
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
    this.setState({
      dataList: dataList
    });
  }

  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  addItem() {
    this.setState({modalVisible: true})
  }

  render() {
    const data = [
      {
      name: 'Color Levels',
      id: '0',
      children: [{
        name: 'Orange',
        id: '10',
      }, {
        name: 'Blue',
        id: '11',
      }, {
        name: 'Green',
        id: '12',
      }, {
        name: 'Gold',
        id: '13',
      }, {
        name: 'Brown',
        id: '14',
      }, {
        name: 'Red',
        id: '15',
      }, {
        name: 'Black',
        id: '16'
      }]
    },
    {
    name: 'Weapons',
    id: '1',
    children: [
      {
        name: 'Knife',
        id: '17'
      }, {
        name: 'Staff',
        id: '18'
      }, {
        name: 'Karambit',
        id: '19'
      }, {
        name: 'Short Stick',
        id: '20'
      }, {
        name: 'Straight Sword',
        id: '21'
      }, {
        name: 'Broad Sword',
        id: '22'
      }, {
        name: 'Fan',
        id: '23'
      }, {
        name: 'Double Blades',
        id: '24'
      }, {
        name: 'Double Bowie Knives',
        id: '25'
    }]
  }
  ]

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
          <View style={{alignContent: 'center', paddingHorizontal: 20}}>
            <SectionedMultiSelect
            items={data}
            uniqueKey = 'id'
            subKey='children'
            selectText='Refresh Filter'
            showDropDowns={true}
            readOnlyHeadings={true}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={this.state.selectedItems}
            showCancelButton={false}
            styles={{
              chipText: {
                width: Dimensions.get('screen').width - 90 ,
              },
              container: {

              },
              cancelButton: {
                backgroundColor: 'red',
  
              },
              button: {
                paddingTop: 40,
                width: 340,
                paddingBottom: 40,
                backgroundColor: 'lightgrey'
              },
              confirmText: {
                padding: 10,
                color: 'black',
              }
            }}
            />

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
          <Icon.Button name='refresh' style={{backgroundColor: '#F8F8F8'}} color='#C5C8C9' onPress={this.refresh} />
          {typePicker}
          <AddItemModal modalVisible={this.state.modalVisible} />
        </View>
    )
  }
};

module.exports = ListView;