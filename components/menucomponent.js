import React, { Component } from 'react';
import { View, FlatList } from 'react-native'; 
// import { ListItem } from 'react-native-elements'
import * as Animatable from 'react-native-animatable';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './Loadingcomponent';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
   
  }
}

class Menu extends Component{


    static navigationOptions = {
        title : 'Menu'
    }
    render(){
        const { navigate } = this.props.navigation;

        const renderMenuItem = ({item, index}) => {
            return(
                <Animatable.View animation="fadeInRightBig" duration={2000}>
                <Tile
                    key = {index}
                    title = {item.name}
                    subtitle = {item.description}
                    hideChevron = {true}
                    onPress = {() => navigate('Dishdetail', { dishId: item.id})}
                    // image = {item.image}
                    imageSrc = {{uri: baseUrl + item.image}}
                />
                </Animatable.View>
            );

        };
        if (this.props.dishes.isLoading) {
            return(
                <Loading />
            )
        }
        else if (this.props.dishes.errmess){
            return(
                <View>
                    <Text>
                        {this.props.dishes.errmess}
                    </Text>
                </View>
            )
        }
        else {
            return(
                <FlatList 
                      data={this.props.dishes.dishes}
                      renderItem = {renderMenuItem}
                      keyExtractor = {item => item.id.toString()}
                />
            );
        }
        
        
    }
}
        
    // }
// }
export default connect(mapStateToProps) (Menu);