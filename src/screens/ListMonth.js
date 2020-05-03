import {
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Header,
  Icon,
  Left,
  Right,
  Text,
  Title,
} from 'native-base';
import React, { Component } from 'react';
import { Picker, ScrollView, TouchableOpacity, View } from 'react-native';
import 'react-native-get-random-values';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addMonth, counts, removeMonth } from '../actions/monthActions';

class ListMonth extends Component {
  state = {
    monthName: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    selectedMonth: '',
    balance: 0,
  };

  componentDidUpdate(prevProps) {
    const { monthes } = this.props;
    let prevPropsData = prevProps.monthes;
    let balance = 0;
    if (monthes.monthList != prevPropsData.monthList) {
      if (monthes.monthList) {
        for (let val of monthes.monthList) {
          let countsItem = counts(val.budget);
          balance += countsItem.balance;
        }
      }
      this.setState({ balance });
    }
  }

  handleMonthPicker = (val) => {
    if (val == 'Month') {
      return;
    }
    const id = uuidv4();
    const yyyy = new Date().getFullYear();
    const date = `${val}, ${yyyy}`;
    this.props.addMonth(date, id);
    this.setState({
      selectedMonth: val,
    });
  };

  addMoreItem = (item) => this.props.navigation.navigate('Form', { item });

  showList = (item) =>
    this.props.navigation.navigate('ListMonthDetail', { item });

  renderList = () => {
    if (!this.props.monthes.monthList.length) {
      return (
        <View
          style={{
            marginTop: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            type='FontAwesome'
            name='dropbox'
            style={{ fontSize: 80, color: '#bdc3c7' }}
          />
        </View>
      );
    }
    return this.props.monthes.monthList.map((item) => {
      let countsItem = counts(item.budget);
      return (
        <Card key={item.id} style={{ borderRadius: 10 }}>
          <CardItem header bordered style={{ borderRadius: 10 }}>
            <Left>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {item.date}
              </Text>
            </Left>
            <Right>
              <View style={{ flexDirection: 'row-reverse' }}>
                <TouchableOpacity
                  onPress={() => this.props.removeMonth(item.id)}>
                  <Icon
                    type='MaterialIcons'
                    name='delete'
                    style={{ fontSize: 25, color: 'red', marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.addMoreItem(item)}>
                  <Icon
                    type='MaterialIcons'
                    name='add'
                    style={{ fontSize: 25, color: 'blue', marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.showList(item)}>
                  <Icon
                    type='MaterialIcons'
                    name='list'
                    style={{
                      fontSize: 25,
                      color: 'green',
                      marginHorizontal: 5,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Right>
          </CardItem>
          <CardItem bordered style={{ borderRadius: 10 }}>
            <Body>
              <Text>Pemasukan: Rp.{countsItem.incomes}</Text>
              <Text style={{ color: 'red', marginTop: 5 }}>
                Pengeluaran: Rp.{countsItem.expense} / {countsItem.percent}%
              </Text>
            </Body>
          </CardItem>
        </Card>
      );
    });
  };

  render() {
    const { monthName, selectedMonth } = this.state;

    const monthNameComponent = monthName.map((val, idx) => {
      return <Picker.Item key={idx} value={val} label={val} />;
    });

    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Budgeting Apps</Title>
          </Body>
          <Right />
        </Header>
        <Picker
          mode='dropdown'
          iosIcon={<Icon name='ios-arrow-down' />}
          style={{ height: 50, width: 150 }}
          selectedValue={selectedMonth}
          onValueChange={(val) => this.handleMonthPicker(val)}>
          <Picker.Item value='Month' label='Month' />
          {monthNameComponent}
        </Picker>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Saldo: Rp.{this.state.balance}
            </Text>
          </View>
          <Content padder>{this.renderList()}</Content>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({ monthes }) => ({
  monthes,
});

export default connect(mapStateToProps, { addMonth, removeMonth })(ListMonth);
