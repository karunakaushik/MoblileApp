import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-elements'
// import { render } from 'react-dom';
import { DISHES } from '../shared/dishes';

function RenderDish(props) {
    const dish = props.dish;
        if (dish != null) {
            return(
            <Card 
                featuredTitle={dish.name}                
                image={dish.image}>                    
                <Text style={{margin: 10, fontSize:20}}> 
                    {dish.category} ({dish.name} )
                </Text>
                {/* <Text style={{margin: 10}}>                       
                    {dish.label}   ({dish.price})                 
                </Text>  */}
                <Text style={{margin: 10}}>                       
                    {dish.description}                    
                </Text>             
            </Card>            
            );        
        }
                
        else {            
            return(<View></View>);        
        } 

    }

class Dishdetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            dishes : DISHES,
            // selectedDish : null
        }
    }

        static navigationOptions = {
            title : 'Dish Details'
        }
    
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <RenderDish dish = {this.state.dishes[+dishId]}/>
        );

    }
}
    


export default Dishdetail;

// const styles = StyleSheet.create({})
