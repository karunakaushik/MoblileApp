import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card } from 'react-native-elements'; 
import * as Animatable from 'react-native-animatable';



export default class ContactUs extends Component {

    static navigationOptions = {        
        title: 'ContactUs'    
    };
    render(){
        return(

            <ScrollView>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
               <Card title="Contact Information">
                   <Text style={{ margin: 10, lineHeight: 40, fontSize: 18 }}>
                   {`121, Clear Water Bay Road
Clear Water Bay, Kowloon
HONG KONG
Tel: +852 1234 5678
Fax: +852 8765 4321
Email:confusion@food.net`}
                   </Text>
               </Card>
               </Animatable.View>
           </ScrollView>
        )
    }
}