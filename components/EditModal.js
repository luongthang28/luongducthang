import React, { Component } from 'react';
import {
    AppRegistry,
    FlatList,
    StySheet,
    Text,
    View,
    Image,
    Alert,
    Platform,
    TouchableHightlight,
    Dimensions,
    TextInput
} from 'react-native';
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import flatListData from '../data/flatListData';

var screen = Dimensions.get('window');
export default class EditModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            editName:'',
            editMota:''
        };
    }
    showEditModal = (edittingName, flatListItem) => {
        this.setState({
            key: edittingName.key,
            editName: edittingName.name,
            editMota: edittingName.mota,
            flatListItem: flatListItem
        });
        this.refs.myModal.open();
    }
    generaKey = (numberOfCharacters) =>{                                                       //hàm random string key
        return require('random-string')({length: numberOfCharacters});
    }
    render() {
        return (
            <Modal
                ref={"myModal"}
                style={{
                    justifyContent: 'center',
                    borderRadius: Platform.OS === 'android' ? 30 : 0,
                    shadowRadius: 10,                                                           //bóng đổ
                    width: screen.width -80,                                                    // rộng ngoài -80
                    height: 300,
                    marginTop: 200
                }}
                position='ceter'
                backdrop={true}
                onClosed= { () => {
                    // alert("Modal close");
                }}
            >
                <Text 
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginTop: 10
                    }}>Hồ sơ</Text>
                <TextInput 
                    style= {{
                        height:40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        marginBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({editName: text})}
                    placeholder="Tên"
                    value= {this.state.editName}
                />
                <TextInput 
                    style= {{
                        height:40,
                        borderBottomColor: 'gray',
                        marginLeft: 30,
                        marginRight: 30,
                        marginTop: 20,
                        marginBottom: 10,
                        marginBottomWidth: 1
                    }}
                    onChangeText={(text) => this.setState({editMota: text})}
                    placeholder="Mô tả"
                    value= {this.state.editMota}
                />
                <Button
                    style={{ fontSize: 18, color: 'blue' }}
                    containerStyle={{
                      padding: 8,
                      marginLeft: 70,
                      marginRight: 70,
                      height: 40,
                      borderRadius: 6,
                      backgroundColor: 'mediumseagreen'
                    }}
                    onPress ={ () => {
                        if (this.state.editName.length == 0 || this.state.editMota.length ==0 ) {
                            alert("Hãy nhập tên và Mô tả");
                            return;
                        }
                        var foundIndex = flatListData.findIndex(item => this.state.key == item.key);                //tìm ra key cần update có key = key phần tử trong mảng
                        if (foundIndex < 0) {
                            return;
                        }
                        flatListData[foundIndex].name = this.state.editName;
                        flatListData[foundIndex].mota = this.state.editMota;
                        this.state.flatListItem.refreshFlatListItem();
                        this.refs.myModal.close();
                    }}
                    >
                        Lưu
                </Button>
            </Modal>
        )
    };
}

