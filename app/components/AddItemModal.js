import React, { Component } from 'react';
import {Modal, Text, TextInput, View, TouchableHighlight} from 'react-native';
import Icon from  'react-native-vector-icons/MaterialIcons';
import { Button } from 'react-native-elements';

class AddItemModal extends Component {
    state = {
      modalVisible: false,
      itemTitle: 'Enter Title',
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
             <Button title='Save Item' backgroundColor='#9e42f4'/>
                <TouchableHighlight
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}>
                  <Text>Hide Modal</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
  
          <TouchableHighlight
            onPress={() => {
              this.setModalVisible(true);
            }}>
            <Icon name='add' style={{margin: 10, padding: 10, backgroundColor: '#F8F8F8'}} color='#9e42f4'>ADD NEW ITEM</Icon>
          </TouchableHighlight>
        </View>
      );
    }
  }

  module.exports = AddItemModal;