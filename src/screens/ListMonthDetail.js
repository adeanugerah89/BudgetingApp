import {
  Body,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React, {Component} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {removeMonthBudgetItem} from '../actions/monthActions';
import ListMonthDetailUnits from '../components/ListMonthDetailUnits';

class ListMonthDetail extends Component {
  removeItem = (id, itemId) => this.props.removeMonthBudgetItem(id, itemId);

  gotToListItem = () => {
    this.props.navigation.navigate('ListMonth');
  };

  addMoreItem = () => {
    const item = this.props.navigation.getParam('item');
    this.props.navigation.navigate('Form', {item});
  };

  renderItemList = () => {
    const item = this.props.navigation.getParam('item');
    const month = this.props.monthes.monthList.find(
      (val) => val.id === item.id,
    );
    if (!month) {
      return <Text>No data found</Text>;
    }
    return <ListMonthDetailUnits removeItem={this.removeItem} month={month} />;
  };

  render() {
    const item = this.props.navigation.getParam('item');
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>{item.date}</Title>
          </Body>
          <Right />
        </Header>
        <ScrollView>
          <Content padder>{this.renderItemList()}</Content>
          <View
            style={{
              marginVertical: 20,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => this.gotToListItem()}
              style={{marginHorizontal: 20}}>
              <Icon
                type="FontAwesome"
                name="reply"
                style={{fontSize: 25, color: 'blue'}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.addMoreItem()}
              style={{marginHorizontal: 20}}>
              <Icon
                type="FontAwesome"
                name="plus"
                style={{fontSize: 25, color: 'blue'}}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({monthes}) => ({
  monthes,
});

export default connect(mapStateToProps, {removeMonthBudgetItem})(
  ListMonthDetail,
);
