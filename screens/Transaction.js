import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as permissions from "expo-permissions";
import {BarCodeScanner} from expo; "expo-barcode-Scanner"
export default class TransactionScreen extends Component {
  constructor(){
    super(props);
    this.state={
      domState: "normal",
      hasCameraPermissions:null,
      scanned: false,
      scannedData: ""
    }
  }
  getCameraPermissions = async domState =>{
    const {status} = await permissions.askAsync(Permission.CAMERA);
    this.setState({
      hasCameraPermissions:status === "granted",
      domState: domState, scan: false
    })
  }
  handleBarCodeScan = async({type, data})=>{
    this.setState({
      scanned: true,
      scannedData: data,
      domState: "normal",
    })
  }
  render() {
      const{domState, hasCameraPermissions, scannedData, scanned}= this.state;
      if(domState==="scanner"){
        return(
          <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarCodeScan}
          style = {styleSheet.absoluteFillObject}></BarCodeScanner>
        )
      }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{hasCameraPermissions? scannedData: "request for camera permissions"}</Text>
        <TouchableOpacity style = {[styles.button,{marginTop: 25}]}
        onPress={()=>this.getCameraPermissions("Scanner")}>
          <Text style={styles.text}>Transaction Screen</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5653D4"
  },
  text: {
    color: "#ffff",
    fontSize: 30
  }
});
