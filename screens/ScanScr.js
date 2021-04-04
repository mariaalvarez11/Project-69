import React from 'react';
import { Text, View, TouchableOpacity,Image, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends React.Component {
    constructor(){
      super();
      this.state = {
        hasCameraPerms: null,
        scanned: false,
        scannedData: '',
        btnState: 'normal'
      }
    }

    getCameraPerms =async()=>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPerms: status === "granted",
        btnState: 'clicked',
        scanned: false
      });
    }

    handleBarCodeScanned = async({type, data})=>{
      this.setState({
        scanned: true,
        scannedData: data,
        btnState: 'normal'
      });
    }

    render() {
      const hasCameraPerms = this.state.hasCameraPerms;
      const scanned = this.state.scanned;
      const btnState = this.state.btnState;

      if (btnState === "clicked" && hasCameraPerms){
        return(
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
        );
      }

      else if (btnState === "normal"){
        return(
          <View style={styles.container}>
             <View>
              <Image
                source={require("../image/scanner.jpg")}
                style={{
                width:200, 
                height: 200}}/>
              <Text style={{textAlign: 'center', fontSize: 30}}>Bar Code Scanner</Text>
            </View>
          <Text style={styles.displayText}>{
            hasCameraPerms===true ? this.state.scannedData: "Request Camera Permission"
          }</Text>     

          <TouchableOpacity
            onPress={this.getCameraPerms}
            style= {styles.scanButton} 
            title = "Bar Code Scanner">
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });