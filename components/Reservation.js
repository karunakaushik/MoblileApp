import React, {Component} from 'react'
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native'; 
import { Card } from 'react-native-elements'
import DatePicker from 'react-native-datepicker'
import * as Animatable from 'react-native-animatable';
import { Permissions, Notifications, Calendar } from 'expo';


class Reservation extends Component {
    constructor(props){
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date:'2020-05-16',
            showModal: false

        }
    }
    static navigationOptions = {
        title : 'Reserve Table'
    }


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
          permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
          if (permission.status !== 'granted') {
            Alert.alert('Permission not granted to show notifications');
          }
        }
        return permission;
    }

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted'){
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert(
                    'Permission not granted to access the calendar'
                );
            }
        }
        return permission;
        
    }

    async presentLocalNotification(date) {
        await Reservation.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
          title: 'Your Reservation',
          body: `Reservation for ${date} requested`,
          ios: {
            sound: true,
          },
          android: {
            sound: true,
            vibrate: true,
            color: '#512DA8',
          },
        });
    }

    async addReservationToCalendar(date) {
        await Reservation.obtainCalendarPermission();
        const startDate = new Date(Date.parse(date));
        const endDate = new Date(Date.parse(date) + (2 * 60 * 60 * 1000));
        Calendar.createEventAsync(
            Calendar.DEFAULT,
            {
              title: 'Con Fusion Table Reservation',
              location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
              startDate,
              endDate,
              timeZone: 'Asia/Hong_Kong',
                
            },
        );
        Alert.alert('Reservation has been added to your calendar') 
    }

    toggleModal(){
        this.setState({showModal: !this.state.showModal});
    }
    confirmReservation(date) {
        this.presentLocalNotification(this.state.date)
        this.resetForm();
      }
    handleReservation() {
    //   const { date, guests, smoking } = this.state;
       
        Alert.alert(
            'Your Registration OK?',
        // `Number of guests: ${guests}\nSmoking? ${smoking ? 'Yes' : 'No'}\nDate and Time:${date}`,
            'Number of guests:'+ this.state.guests,
            'Smoking?' + this.state.smoking ? 'Yes' : 'No',
            'Date and Time '+ this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => this.confirmReservation(date),
                },
            ],
            {cancelable : false},
        );
    }

    resetForm(){
        this.setState({
            guests:1,
            smoking: false,
            date:'2020-05-16',
            showModal: false
        })
    }


    
    render() {
      const todayDate = new Date().toISOString().split('T')[0];
        
        return(
              <ScrollView>
          <Animatable.View animation="zoomIn">
                  <Card title = "Reservation Form">
                  <View style={styles.formRow}>
                      <Text style={styles.formLable}>
                          Number Of Guests
                      </Text>
                      <Picker style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(ItemValue, itemIndex) => this.setState({guests:ItemValue})}>
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />
                            <Picker.Item label='7' value='7' />

                      </Picker>
                  </View>
                  <View style={styles.formRow}>                
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>                
                    <Switch                    
                        style={styles.formItem}                    
                        value={this.state.smoking}                    
                        onTintColor='#512DA8'                    
                        onValueChange={(value) => this.setState({smoking: value})}>                
                    </Switch>                
                </View>                
                <View style={styles.formRow}>                
                    <Text style={styles.formLabel}>Date and Time</Text>                
                    <DatePicker                    
                       style={{flex: 2, marginRight: 20}}                    
                       date={this.state.date}                    
                       format=''                    
                       mode="datetime"                    
                       placeholder="select date and Time"                    
                       minDate={todayDate}                   
                       confirmBtnText="Confirm"                    
                       cancelBtnText="Cancel"                    
                       customStyles={{                    
                           dateIcon: {                        
                               position: 'absolute',                        
                               left: 0,                        
                               top: 4,                        
                               marginLeft: 0                    
                            },                    
                            dateInput: {                        
                                marginLeft: 36                    
                            }                                       
                        }}                    
                        onDateChange={(date) => {this.setState({date: date})}} />               
                </View>                
                <View style={styles.formRow}>                
                <Button                    
                    title="Reserve"                    
                    color="#512DA8"                    
                    accessibilityLabel="Learn more about this purple button"
                    onPress={() => this.handleReservation()}                    

                />                
                </View>
                </Card>
                </Animatable.View>
                {/* <Modal animationType = {"slide"} transparent = {false}                    
                   visible = {this.state.showModal}                    
                   onDismiss = {() => this.toggleModal() }                    
                   onRequestClose = {() => this.toggleModal() }>                    
                   <View style = {styles.modal}>                        
                    <Text style = {styles.modalTitle}>Your Reservation</Text>                        
                    <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>                        
                    <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>                        
                    <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>                                                
                    <Button onPress = {() =>{this.toggleModal(); this.resetForm();}} 
                            color="#512DA8"                            
                            title="Close"                            
                    />                   
                    </View>                
                </Modal>  */}
              </ScrollView>
        );
    }
}

const styles = StyleSheet.create({    
    formRow: {      
        alignItems: 'center',      
        justifyContent: 'center',      
        flex: 1,      
        flexDirection: 'row',      
        margin: 20    
    },    
    formLabel: {        
        fontSize: 18,        
        flex: 2    
    },    
    formItem: {        
        flex: 1    
    },
});

export default Reservation;