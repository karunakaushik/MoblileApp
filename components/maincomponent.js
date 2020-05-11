import React, { Component } from 'react';
import Home from './homecomponent';
import Menu from './menucomponent';
import AboutUs from './aboutcomponent';
import ContactUs from './contactcomponent'
import { View, Platform} from 'react-native';
import DishDetail from './dishDetailscomponent'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation-stack'

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail }
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
        headerTintColor: "#fff"      
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
        headerTintColor: "#fff"      
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
        headerTintColor: "#fff"      
    }) 
}
);

const MainNavigator = createDrawerNavigator({    
    Home:       
    { screen: HomeNavigator,        
        navigationOptions: {          
            title: 'Home',          
            drawerLabel: 'Home'        
        }      
    },   
    AboutUs:       
    { screen: AboutUsNavigator,        
        navigationOptions: {          
            title: 'AboutUs',          
            drawerLabel: 'AboutUs'        
        }      
    },   
    Menu:       
    { screen: MenuNavigator,        
        navigationOptions: {          
            title: 'Menu',          
            drawerLabel: 'Menu'        
        },       
    },
    ContactUs:       
    { screen: ContactUsNavigator,        
        navigationOptions: {          
            title: 'ContactUs',          
            drawerLabel: 'ContactUs'        
        }      
    }
}, 
{  
    drawerBackgroundColor: '#D1C4E9' 
}
);


export default class Main extends Component{


    // OnDishSelect(dishId){
    //     this.setState({selectedDish: dishId})
    // }
    render() {
        return(
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
            )
    }
}