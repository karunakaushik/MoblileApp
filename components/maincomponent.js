import React, { Component } from 'react';
import Home from './homecomponent';
import Menu from './menucomponent';
import AboutUs from './aboutcomponent';
import ContactUs from './contactcomponent'
import { View, Platform, Text, ScrollView, Image, StyleSheet, NetInfo, ToastAndroid } from 'react-native';
import DishDetail from './dishDetailscomponent'
import Reservation from './Reservation'
import Favorite from './Favoritecomponent'
import Login from './LoginComponent'
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from '@react-navigation/stack'
import {Icon } from 'react-native-elements'
import { fetchComments,fetchDishes, fetchPromos, fetchLeaders } from '../redux/ActionCreators'
import { connect } from 'react-redux'
import {baseUrl} from '../shared/baseUrl'

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => ({  
    fetchDishes: () => dispatch(fetchDishes()),  
    fetchComments: () => dispatch(fetchComments()),  
    fetchPromos: () => dispatch(fetchPromos()),  
    fetchLeaders: () => dispatch(fetchLeaders()), 
})


const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({navigation}) => ({
            headerLeft : <Icon name= "menu" size = {24}
            color = "white"
            onPress = { () => navigation.toggleDrawer() } />
        })
    },
    DishDetail: { screen: DishDetail,
        headerLeft : <Icon name= "menu" size = {24}
        color = "white"
        onPress = { () => navigation.toggleDrawer() } />
    }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle:{
            background: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"
        }
    }
}
);


const CustomDrawerContentComponent = (props) => (    
<ScrollView>      
    <SafeAreaView style={styles.container} forceInset={{ top: 'always',         
    horizontal: 'never' }}>        
    <View style={styles.drawerHeader}>          
    <View style={{flex:1}}>          
    <Image source={require('./images/logo.png')} 
    style={styles            
        .drawerImage} />          
        </View>          
        <View style={{flex: 2}}>            
        <Text style={styles.drawerHeaderText}>
            Ristorante Con Fusion
        </Text>          
        </View>        
        </View>        
        <DrawerItems {...props} />     
        </SafeAreaView>    
        </ScrollView>  
        
    ); 

const LoginNavigator = createStackNavigator({    
    Login: { screen: Login }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}        
        iconStyle={{ color: 'white' }}         
        onPress={ () => navigation.toggleDrawer() } 
        />        
      
    }) 
}
);

const HomeNavigator = createStackNavigator({    
    Home: { screen: Home }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />      
    }) 
}
);
const AboutUsNavigator = createStackNavigator({    
    AboutUs: { screen: AboutUs }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />      
    }) 
}
);
const ContactUsNavigator = createStackNavigator({    
    ContactUs: { screen: ContactUs }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />      
    }) 
}
);

const ReservationNavigator = createStackNavigator({    
    Reservation: { screen: Reservation }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}        
           iconStyle={{ color: 'white' }}         
           onPress={ () => navigation.navigate('DrawerToggle') } />       
    }) 
}
);
const FavoriteNavigator = createStackNavigator({    
    Favorite: { screen: Favorite }  
}, {    
    navigationOptions: ({ navigation }) => ({      
        headerStyle: {          
            backgroundColor: "#512DA8"      
        },      
        headerTitleStyle: {          
            color: "#fff"                  
        },      
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}        
           iconStyle={{ color: 'white' }}         
           onPress={ () => navigation.navigate('DrawerToggle') } />       
    }) 
}
);

const MainNavigator = createDrawerNavigator({ 

    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                />
            )
        }
    },   
    Home:       
    { screen: HomeNavigator,        
        navigationOptions: {          
            title: 'Home',          
            drawerLabel: 'Home',          
            drawerIcon: ({ tintColor, focused }) => (
            <Icon              
               name='home'              
               type='font-awesome'
               size={24}              
               color={tintColor}            
            />          
            
            ),         
        }      
    },   
    AboutUs:       
    { screen: AboutUsNavigator,        
        navigationOptions: {          
            title: 'AboutUs',          
            drawerLabel: 'AboutUs',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon              
                   name='info-circle'              
                   type='font-awesome'
                   size={24}              
                   color={tintColor}            
                />          
                
                ),        
        }      
    },   
    Menu:       
    { screen: MenuNavigator,        
        navigationOptions: {          
            title: 'Menu',          
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon              
                   name='list'              
                   type='font-awesome'
                   size={24}              
                   color={tintColor}            
                />          
                
                ),        
        },       
    },
    ContactUs:       
    { screen: ContactUsNavigator,        
        navigationOptions: {          
            title: 'ContactUs',          
            drawerLabel: 'ContactUs',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon              
                   name='address-card'              
                   type='font-awesome'
                   size={22}              
                   color={tintColor}            
                />          
                
                ),        
        }      
    },
    Favorite:       
    { screen: FavoriteNavigator,        
        navigationOptions: {          
            title: 'Favorite',          
            drawerLabel: 'Favorite',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon              
                   name='heart'              
                   type='font-awesome'
                   size={24}              
                   color={tintColor}            
                />          
                
                ),        
        }      
    },
    Reservation:       
    { screen: ReservationNavigator,        
        navigationOptions: {          
            title: 'Reserve Table',          
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon              
                   name='cutlery'              
                   type='font-awesome'
                   size={24}              
                   color={tintColor}            
                />          
                
                ),        
        }      
    }
}, 
{   initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent : CustomDrawerContentComponent
}
);


class Main extends Component{

    componentDidMount() {    
        this.props.fetchDishes();    
        this.props.fetchComments();    
        this.props.fetchPromos();    
        this.props.fetchLeaders(); 
        
        NetInfo.getConnectionInfo()
            .then((connectionInfo) => {
                ToastAndroid.show('Initial Network Connectivity Type : '
                + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType,
                ToastAndroid.LONG)
            });

        NetInfo.addEventListener('connectionChange', this.handleConnectivityChange);
    }
    
    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleConnectivityChange); 
    }

    handleConnectivityChange = (connectionInfo) => {
        switch (connectionInfo.type) {      
            case 'none':        
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);        
                break;      
            case 'wifi':        
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);        
                break;      
            case 'cellular':        
                ToastAndroid.show('You are now connected to Cellular!', ToastAndroid.LONG);        
                break;      
            case 'unknown':        
                ToastAndroid.show('You now have unknown connection!', ToastAndroid.LONG);        
                break;      
            default:        
                break;    
            } 
    }
    
    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
            )
    }
}


const styles = StyleSheet.create({  
    container: {    
        flex: 1,  
    },  
    drawerHeader: {    
        backgroundColor: '#512DA8',    
        height: 140,    
        alignItems: 'center',    
        justifyContent: 'center',    
        flex: 1,    
        flexDirection: 'row'  
    },  
    drawerHeaderText: {    
        color: 'white',    
        fontSize: 24,    
        fontWeight: 'bold'  
    },  
    drawerImage: {    
        margin: 10,    
        width: 80,    
        height: 60  
    } 
});
export default connect(mapStateToProps, mapDispatchToProps) (Main);