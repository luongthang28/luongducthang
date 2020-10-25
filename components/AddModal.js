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
export default class AddModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            newName:'',
            newMota:''
        };
    }
    showAddModal = () => {
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
                    }}>Hồ sơ mới</Text>
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
                    onChangeText={(text) => this.setState({newName: text})}
                    placeholder="Tên mới"
                    value= {this.state.newName}
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
                    onChangeText={(text) => this.setState({newMota: text})}
                    placeholder="Mô tả mới"
                    value= {this.state.newMota}
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
                        if (this.state.newName.length == 0 || this.state.newMota.length ==0 ) {
                            Alert.alert(
                                "Thông báo",
                                "Hãy nhập tên và Mô tả");
                            return;
                        }
                        const newkey = this.generaKey(10);
                        const newName ={
                            key: newkey,
                            name: this.state.newName,
                            imageUrl: "https://banbuonlinhphukiendienthoai.com/wp-content/uploads/2018/09/phu-kien-moi-ve-ngay-19-8-2018.jpg",
                            mota: this.state.newMota
                        };
                        flatListData.push(newName);
                        this.props.parentFlatList.refreshFlatList1(newkey);
                        this.refs.myModal.close();
                    }}
                    >
                        Lưu
                </Button>
            </Modal>
        )
    };
}

