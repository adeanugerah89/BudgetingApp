import {Container, Content, Icon, Input, Item} from 'native-base';
import React, {Component} from 'react';
import {Picker, TouchableOpacity, View} from 'react-native';
import 'react-native-get-random-values';
import {connect} from 'react-redux';
import {v4 as uuidv4} from 'uuid';
import {addNewLineinMonthBudget} from '../actions/monthActions';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemType: 'income',
      itemName: '',
      itemPrice: '',
      validation: '',
    };
  }

  isNumber = (text) => {
    if (isNaN(text)) {
      return this.setState({
        validation: 'This input accepts only numbers!',
      });
    }
    this.setState({itemPrice: text});
  };

  onButtonPress = () => {
    if (!this.state.itemName || !this.state.itemPrice) {
      return this.setState({validation: 'Both fields are required!'});
    }

    const payload = {
      id: uuidv4(),
      itemName: this.state.itemName,
      itemPrice: this.state.itemPrice,
      itemType: this.state.itemType,
    };

    const item = this.props.navigation.getParam('item');
    this.props.addNewLineinMonthBudget(item.id, payload);
    this.setState({
      itemName: '',
      itemPrice: '',
      itemType: '',
      validation: '',
    });
  };

  gotToListItem = () => {
    const item = this.props.navigation.getParam('item');
    this.props.navigation.navigate('ListMonthDetail', {item});
  };

  handleTypePicker = (val) => {
    this.setState({
      itemType: val,
    });
  };

  render() {
    return (
      <Container>
        <Content padder>
          <Item rounded style={{marginVertical: 5}}>
            <Input
              placeholder="nama item"
              value={this.state.itemName}
              onChangeText={(text) => this.setState({itemName: text})}
            />
          </Item>
          <Item rounded style={{marginVertical: 5}}>
            <Input
              placeholder={this.state.validation || 'biaya'}
              value={this.state.itemPrice}
              onChangeText={this.isNumber}
            />
          </Item>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="ios-arrow-down" />}
              style={{height: 50, width: 150}}
              selectedValue={this.state.itemType}
              onValueChange={(val) => this.handleTypePicker(val)}>
              <Picker.Item value="income" label="Income" />
              <Picker.Item value="expense" label="Expense" />
            </Picker>
            <TouchableOpacity onPress={() => this.onButtonPress()}>
              <Icon
                type="FontAwesome"
                name="check"
                style={{fontSize: 25, color: 'blue'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.gotToListItem()}>
              <Icon
                type="FontAwesome"
                name="reply"
                style={{fontSize: 25, color: 'blue'}}
              />
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(null, {addNewLineinMonthBudget})(Form);
