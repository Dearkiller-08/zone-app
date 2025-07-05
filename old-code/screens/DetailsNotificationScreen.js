import React from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const DetailsNotificationScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FDE49E' }}>
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={{fontSize: 50, fontWeight: 'bold', color: '#003285'}}></Text>  
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="close-circle-outline" size={50} color="black" />
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1, margin: 10 }}>
                <View style={{backgroundColor: 'white', padding: 15, paddingTop: 20, height: '80%'}}>
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                    >
                    <Text style={{fontWeight: 'bold', fontSize: 20}}>Details:</Text>
                        
                    <View style={{gap: 15, marginVertical: 20}}>

                        <View style={{flexDirection: 'row', gap : 10}}>
                            <Text>Task:</Text>
                            <Text>Lorum Impsum</Text>
                        </View>

                        <View style={{flexDirection: 'row', gap : 10}}>
                            <Text>Label:</Text>
                            <Text>School</Text>
                        </View>

                        <View style={{flexDirection: 'row', gap : 10}}>
                            <Text>Date:</Text>
                            <Text>12.12.2022</Text>
                        </View>

                        <Text>Description:</Text>
                        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed 
                            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                             clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                               tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                               At vero eos et accusam et justo duo dolores et ea rebum. 
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed 
                            diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
                            sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
                             clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                               tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. 
                               At vero eos et accusam et justo duo dolores et ea rebum. 
                            Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            </Text>
                    </View>
                    </ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 80, gap: 15 }}>
                        <TouchableOpacity>
                            <Ionicons name="checkmark-circle-outline" size={80} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Ionicons name="close-circle-outline" size={80} color="red" />
                        </TouchableOpacity>
                    </View>
                </View>
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
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
  },

});

export default DetailsNotificationScreen;
