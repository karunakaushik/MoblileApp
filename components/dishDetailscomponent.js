import React, { Component } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';

function RenderComment(props) {
    const comment = props.comment;
    const renderCOmmentItem = ({item, index}) => {
        return(
            <View key= {index} style={{margin:10}}>
                <Text  style={{fontSize: 14}}>{item.comment}</Text>
                <Text  style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text  style={{fontSize: 12}}> {'--' +  item.author + ',' + item.date}</Text>
            </View>
        )
    };
    return(
        <Card title= "Comments">
            <FlatList
                data = {comment}
                renderItem={renderCOmmentItem}
                keyExtractor = {item => item.id.toString()}
            />
        </Card>
    )
    

}


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
                <Text style={{margin: 10}}>                       
                    {dish.description}                    
                </Text> 
                <Icon                    
                    raised                    
                    reverse                    
                    name={ props.favorite ? 'heart' : 'heart-o'}                    
                    type='font-awesome'                    
                    color='#f50'                    
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                />           
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
            comments : COMMENTS,
            favorites : []
            // selectedDish : null
        }
    }

        static navigationOptions = {
            title : 'Dish Details'
        }

        markFavorite(dishId) {
            this.setState({
                favorites : this.state.favorites.concat(dishId)
            })
        }
    
    render() {
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
            <RenderDish dish = {this.state.dishes[+dishId]}
                favorite = {this.state.favorites.some(el => el === dishId)}
                onPress = {() => this.markFavorite(dishId)}
            />
            <RenderComment comment = {this.state.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
        );

    }
}
    


export default Dishdetail;

// const styles = StyleSheet.create({})
