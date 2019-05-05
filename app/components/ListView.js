import React, { Component } from 'react';
import { Dimensions, Text, PixelRatio, View, TouchableHighlight} from 'react-native';
import TodoModel from './TodoModel';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import TodoService from './TodoService';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { Button, Icon } from 'react-native-elements';
import AddItemModal from './AddItemModal';
import firebase from 'react-native-firebase';

// let dataList = TodoService.findIncomplete();
// var dataListOrder = getOrder(techniques);

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
    this.ref = firebase.firestore().collection('techniques')
    this.state = {
      loading: true,
      techniques: []
    }
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const techniques = [];
    querySnapshot.forEach((tech) => {
        const { title, type, completed, createdAt, updatedAt} = tech.data();

        techniques.push({
          key: tech.id,
          tech,
          title,
          type,
          completed,
          createdAt,
          updatedAt
        });
    });

    this.setState({
      techniques,
      loading: false,
    })
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
    if(this.state.loading) {
      return null;
    }
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
        name: 'Blade',
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
        name: 'Iron Fan',
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
  // if (this.state.dataList.length) {
      listView = (
        <SortableListView
          ref='listView'
          style={{flex: 1}}
          data={this.state.techniques}
          onRowMoved={e => moveOrderItem(this, e.from, e.to)}
          renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} onCompletedChange={this._onCompletedChange}/>}
        />
      );
      typePicker = (
          <View>
            <Icon
            onPress={this.refresh}
            name= 'refresh' 
            reverse/>
            <SectionedMultiSelect
            items={data}
            uniqueKey = 'id'
            subKey='children'
            selectText='Filter'
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

    return (
        <View style={{flex: 1, marginLeft: 10, marginRight: 10}}>
          {/* <OmniBox
            data={Array.from(dataList)}
            updateDataList={this.updateDataList}/> */}
          {listView}
          {typePicker}
          <AddItemModal modalVisible={this.state.modalVisible} />
        </View>
    )
  }
};

module.exports = ListView;