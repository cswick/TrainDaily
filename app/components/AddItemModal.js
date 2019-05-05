import React, { Component } from 'react';
import {Modal, Text, View, TouchableHighlight} from 'react-native';
import { Button, ButtonGroup, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';

class AddItemModal extends Component {
    state = {
      modalVisible: false,
      itemTitle: 'Enter Title',
      selected: [0],
    };
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }
  
    render() {
      return (
        <View style={{marginTop: 22}}>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{marginTop: 22}}>
              <View>
              <Input placeholder='Item Title'/>
              <ButtonGroup
                selectedBackgroundColor='#FF8C00'
                selectMultiple
                onPress={selected => {
                  this.setState({ selected });
                }}
                selectedIndex={this.state.selected}
                buttons={['Hello', 'Goodbye', 'Hi', 'Bye']}
                containerStyle={{height: 30}} />
                <Button
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                  raised
                  icon={{name: 'save'}}
                  title='Save Item' />
              </View>
            </View>
          </Modal>
  
          <Button
            onPress={() => {
              this.setModalVisible(true);
            }}
            raised
            icon={{name: 'add'}}
            title='Add new item' />
        </View>
      );
    }
  }

  module.exports = AddItemModal;