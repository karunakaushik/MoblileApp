import React, { Component } from 'react';
import { ScrollView, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { Card } from 'react-native-elements';
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { Loading } from './Loadingcomponent';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
  return {
    leaders: state.leaders
  }
}



function History() {
    const history = "Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.\n\nThe restaurant traces its humble beginnings to The Frying Pan, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.";
    return (
      <Card title="Our History">
        <Text style={{ margin: 10, fontSize: 16 }}>
          {history}
        </Text>
      </Card>
    );
  }
class AboutUs extends Component {

    static navigationOptions = {        
        title: 'AboutUs'    
    };


    render() {
   
    const renderleaders = ({item, index}) => {
        return(
            <ListItem
                key = {index}
                title = {item.name}
                titleStyle={{ fontWeight: 'bold' }}
                subtitle = {item.description}
                subtitleStyle={{ color: '#6c757d' }} // #6c757d taken from Bootstrap blockquote-footer CSS
                hideChevron = {true}
                leftAvatar = {{ source :{uri: baseUrl + item.image }}}
            />
        );

    }; 
    
    if (this.props.leaders.isLoading){
      return(
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card title= " Corporate Leadership">
            <Loading />
          </Card>
          </Animatable.View>
        </ScrollView>
      )
    }
    else if (this.props.leaders.errmess) {
      return(
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
          <History />
          <Card title= " Corporate Leadership">
            <Text>{this.props.leaders.errmess}</Text>
          </Card>
          </Animatable.View>
        </ScrollView>

      );
    }
    else{
      return(
        <ScrollView>
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
            <History />            
            <Card title=" Corporate Leadership" >
              <FlatList 
                data={this.props.leaders.leaders}
                renderItem = {renderleaders}
                keyExtractor = {item => item.id.toString()}
              />
            </Card>
           </Animatable.View>
        </ScrollView>
    );

    }
    
    }
}
export default connect(mapStateToProps)(AboutUs);