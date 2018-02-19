import React, {Component} from 'react';
import {TouchableHighlight, View, Text} from 'react-native';
import CheckBox from './CheckBox';
import TodoService from './TodoService';

class ListViewItem extends Component {
  constructor(props) {
    super(props);
    this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
    this.state = {
      data: this.props.data
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      data: props.data
    })
  }

  _onCheckBoxPressed() {
    var data = this.state.data;
    TodoService.update(data, () => {
      data.completed = !data.completed;
    });
    this.setState({
       data: data
    });

    this.props.onCompletedChange();
  }

  getTypeColor() {
      if (this.state.data.completed) {
          return '#C5CBC9';
      } else {
          switch (this.state.data.type) {
              case 'Orange':
                return '#FF8C00';
              break;

              case 'Blue':
                return '#0000FF';
              break; 

              case 'Green':
                return '#008000';
              break;

              case 'Gold':
                return '#D4AF37';
              break;

              case 'Brown':
                return '#802b00';
              break;

              default:
              return '#000';
          }
      }
  }

  render() {
    let data = this.state.data;
    let color = data.completed ? '#C5C8C9' : '#000';
    let textDecorationLine = data.completed ? 'line-through' : 'none';
    return (
      <TouchableHighlight underlayColor={'#eee'} style={{paddingTop: 6, paddingBottom: 6, backgroundColor: "#F8F8F8", borderBottomWidth:1, borderColor: '#eee'}} {...this.props.sortHandlers}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CheckBox data={data} color= {this.getTypeColor()} onCheckBoxPressed={this._onCheckBoxPressed}></CheckBox>
          <Text style={{fontSize:18, color: this.getTypeColor(), textDecorationLine: textDecorationLine}}>{data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}

module.exports = ListViewItem;