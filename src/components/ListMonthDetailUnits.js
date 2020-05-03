import {Body, Card, CardItem, Icon, Text} from 'native-base';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

export default function ListMonthDetailUnits({month, removeItem}) {
  let income = [];
  let expense = [];

  for (let val of month.budget) {
    if (val.itemType == 'income') {
      income.push(
        <Card key={val.id} style={{borderRadius: 10}}>
          <CardItem bordered style={{borderRadius: 10}}>
            <Body>
              <Text style={{fontWeight: 'bold'}}>{val.itemName}</Text>
              <Text style={{color: 'red', marginTop: 5}}>
                Nominal: Rp.{val.itemPrice}
              </Text>
            </Body>
            <TouchableOpacity onPress={() => removeItem(month.id, val.id)}>
              <Icon
                type="MaterialIcons"
                name="delete"
                style={{fontSize: 25, color: 'red', marginHorizontal: 5}}
              />
            </TouchableOpacity>
          </CardItem>
        </Card>,
      );
    }

    if (val.itemType == 'expense') {
      expense.push(
        <Card key={val.id} style={{borderRadius: 10}}>
          <CardItem bordered style={{borderRadius: 10}}>
            <Body>
              <Text style={{fontWeight: 'bold'}}>{val.itemName}</Text>
              <Text style={{color: 'red', marginTop: 5}}>
                Nominal: Rp.{val.itemPrice}
              </Text>
            </Body>
            <TouchableOpacity onPress={() => removeItem(month.id, val.id)}>
              <Icon
                type="MaterialIcons"
                name="delete"
                style={{fontSize: 25, color: 'red', marginHorizontal: 5}}
              />
            </TouchableOpacity>
          </CardItem>
        </Card>,
      );
    }
  }

  return (
    <View style={styles.container}>
      {income.length ? <Text style={styles.txt}>Pemasukan:</Text> : null}
      {income}
      {expense.length ? <Text style={styles.txt}>Pengeluaran:</Text> : null}
      {expense}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  txt: {
    fontSize: 20,
    color: '#777',
    marginLeft: 50,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
