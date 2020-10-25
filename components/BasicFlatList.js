import React, {Component} from 'react';
import {
  AppRegistry,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Platform,
  TouchableHighlight,
} from 'react-native';
import flatListData from '../data/flatListData';
import Swipeout from 'react-native-swipeout';
import AddModal from './AddModal';
import EditModal from './EditModal';

class FlatListItem extends Component {
  constructor(props) {
    super(props);
    this.state -
      {
        activeRowKey: null, 
        numberOfRefresh: 0,
      };
  }
  refreshFlatListItem = () => {
    this.setState((prevState) => {
      return {
        numberOfRefresh: prevState.numberOfRefresh + 1,
      };
    });
  };
  render() {
    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {
        if (this.state.activeRowKey != null) {
          //nếu key khác null thì mới = null
          this.setState({activeRowKey: null});
        }
      },
      onOpen: (secId, rowId, direction) => {
        this.setState({activeRowKey: this.props.item.key}); //trỏ đến key trong flatlistdata
      },
      right: [
        {
          onPress: () => {
            // alert('asd');
            this.props.parentFlatList.refs.editModal.showEditModal(
              flatListData[this.props.index],
              this,
            );
          },
          text: 'Sửa',
          type: 'primary',
        },
        {
          onPress: () => {
            const deletingRow = this.state.activeRowKey;
            Alert.alert(
              'Thông Báo',
              'Bạn có muốn xóa?',
              [
                {
                  text: 'Không',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'Có',
                  onPress: () => {
                    flatListData.splice(this.props.index, 1); //đã chạy refresh flatlist
                    this.props.parentFlatList.refreshFlatList(deletingRow);
                  },
                },
              ],
              {cancelable: true},
            );
          },
          text: 'Delete',
          type: 'delete',
        },
      ],
      rowId: this.props.item.index,
      sectionId: 1,
    };
    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen': 'tomato'
              backgroundColor: 'mediumseagreen',
            }}>
            <Image
              source={{uri: this.props.item.imageUrl}}
              style={{width: 100, height: 100, margin: 5}}
            />
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
              }}>
              <Text style={styles.FlatListItem}>{this.props.item.name}</Text>
              <Text style={styles.FlatListItem}>{this.props.item.mota}</Text>
            </View>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: 'white',
            }}
          />
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  FlatListItem: {
    color: 'white',
    padding: 10,
    fontSize: 16,
  },
});

export default class BasicFlatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteRowKey: null, //lưu lại key của object mình xóa
    };
    this._onPressAdd = this._onPressAdd.bind(this); //this _onPressAdd chính là this của BasicFlatList
  }
  refreshFlatList = (activeKey) => {
    //thay đổi state của flatlist
    this.setState((prevState) => {
      return {
        deleteRowKey: activeKey,
      };
    });
    // this.refs.flatList.scrollToEnd ();
  };
  refreshFlatList1 = (activeKey) => {
    //thay đổi state của flatlist
    this.setState((prevState) => {
      return {
        deleteRowKey: activeKey,
      };
    });
    this.refs.flatList.scrollToEnd();
  };
  _onPressAdd() {
    // alert("Bạn đã thêm item");
    this.refs.addModal.showAddModal();
  }
  render() {
    return (
      <View style={{flex: 1, marginTop: 22, Platform: 0}}>
        <View
          style={{
            backgroundColor: 'tomato',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 64,
          }}>
          <TouchableHighlight
            style={{marginRight: 10}}
            underlayColor="tomato"
            onPress={this._onPressAdd}>
            <Image
              style={{width: 35, height: 35}}
              source={require('../data/iconadd.png')}
            />
          </TouchableHighlight>
        </View>
        <FlatList
          ref={'flatList'}
          data={flatListData}
          renderItem={({item, index}) => {
            // console.log(`Item = ${JSON.stringify(item)}, index = ${index}`);
            return (
              <FlatListItem item={item} index={index} parentFlatList={this} />
            );
          }}
        />
        <AddModal ref={'addModal'} parentFlatList={this} />
        <EditModal ref={'editModal'} parentFlatList={this} />
      </View>
    );
  }
}


