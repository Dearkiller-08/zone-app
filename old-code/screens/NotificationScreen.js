import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const NotificationScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDE49E' }}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back-outline" size={50} color="black" />
                </TouchableOpacity>
                <Text style={{fontSize: 50, fontWeight: 'bold', color: '#003285'}}></Text>  
            </View>

            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                >
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Details')} 
                    style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, gap: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                        <View style={{ width: 50, height: 50, backgroundColor: 'blue', borderRadius: '100%' }}>
                        </View>
                        <Text style={{fontWeight: 'bold'}}>New task received from : dearkiller</Text>
                        <Ionicons style={{marginLeft: 'auto'}} name="chevron-forward-outline" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, gap: 15, borderBottomColor: 'gray', borderBottomWidth: 0.5 }}>
                        <View style={{ width: 50, height: 50, backgroundColor: 'blue', borderRadius: '100%' }}>
                        </View>
                        <Text>New task received from : Patrick</Text>
                        <Ionicons style={{marginLeft: 'auto'}} name="chevron-forward-outline" size={30} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, gap: 15, borderBottomColor: 'gray', borderBottomWidth: 1 }}>
                        <View style={{ width: 50, height: 50, backgroundColor: 'blue', borderRadius: '100%' }}>
                        </View>
                        <Text>New task received from : Unknown</Text>
                        <Ionicons style={{marginLeft: 'auto'}} name="chevron-forward-outline" size={30} color="black" />
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
      <StatusBar barStyle="dark-content" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDE49E',
  },
  titleContainer: {
    backgroundColor: '#FDE49E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  closeButton: {
    marginLeft: 10,
    
    marginBottom: 10,	
  },

});

export default NotificationScreen;
