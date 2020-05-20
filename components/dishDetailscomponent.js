import React, { Component } from 'react'
import { Text, View, ScrollView, Button, Modal, FlatList,StyleSheet,Alert, PanResponder, Share } from 'react-native'
import { Card, Input, Rating, Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites
  }
}
const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),

})


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
      <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
        <Card title= "Comments">
            <FlatList
                data = {comment}
                renderItem={renderCOmmentItem}
                keyExtractor = {item => item.id.toString()}
            />
        </Card>
        </Animatable.View>
    )
    

}


function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
      if (dx < -200) {
        return true;
      }
      return false;
      }

    const recognizeComment = ({ dx }) => {
      if( dx > 200 ) {
        return true;
      }
      return false;
    }

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gestureState) => {
        return true;
      },
      onPanResponderGrant: () => {
        this.view.rubberBand(1000)
        .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'));
      },

      onPanResponderEnd: (e, gestureState ) => {
        console.log("pan responder end ", gestureState);
        if (recognizeDrag(gestureState))
            { 
              Alert.alert(
               'Add Favorite',
               'Are you sure you wish to add ' + dish.name + ' to favorite ?',
               [
                 {
                  text: 'Cancel', 
                  onPress: () => console.log('Cancel Pressed'), 
                  style: 'cancel'
                 },
                 {
                  text: 'OK', 
                  onPress: () => {props.favorite ? console.log('Already favorite') : props.onPress()}
                 },
               ],
               {cancelable: false}
             );
            
            }
            else if(recognizeComment(gestureState)) {
              openCommentForm();
            }
             return true;
      }
    });

        const shareDish = (title, message, url) => {
          Share.share({
            title,
            message: `${title}: ${message} ${url}`,
            url,
        }, {
              dialogTitle: `Share ${title}`,
        });
      };

        if (dish != null) {
            return(
          <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef} 
            {...panResponder.panHandlers}>

            <Card 
                featuredTitle={dish.name}                
                image={{uri : baseUrl + dish.image}}>

                <Text style={{margin: 10, fontSize:20}}> 
                    {dish.category} ({dish.name} )
                </Text>

                <Text style={{margin: 10}}>                       
                    {dish.description}                    
                </Text> 

             <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                
                <Icon                    
                    raised                    
                    reverse                    
                    name={ props.favorite ? 'heart' : 'heart-o'}                    
                    type='font-awesome'                    
                    color='#f50'                    
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                /> 

                <Icon                    
                    raised                    
                    reverse                    
                    name= 'pencil'                    
                    type='font-awesome'                    
                    color='#512DA8'                    
                    onPress={() => openCommentForm()}
                />

                <Icon                    
                    raised                    
                    reverse                    
                    name= 'share'                    
                    type='font-awesome'                    
                    color='#512DA8'                    
                    onPress= {() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                /> 
             </View> 

            </Card> 

            </Animatable.View>           
            );        
        }
                
        else {            
            return(<View></View>);        
        } 

    }

class Dishdetail extends Component{

        static navigationOptions = {
            title : 'Dish Details'
        }
        static defaultState() {
            return ({
              rating: 3,
              author: '',
              comment: '',
              showCommentForm: false,
            });
          }
          constructor(props) {
            super(props);
            this.state = Dishdetail.defaultState();
          }
        
          setRating(rating) {
            this.setState({ rating });
          }
        
          setAuthor(author) {
            this.setState({ author });
          }
        
          setComment(comment) {
            this.setState({ comment });
          }
        
        
        
          resetCommentForm() {
            this.setState(Dishdetail.defaultState());
          }
        
          handleComment(dishId) {
            const { postComment } = this.props;
            const { author, comment, rating } = this.state;
            postComment(dishId, rating, author, comment);
            this.resetCommentForm();
          }
        
          openCommentForm() {
            this.setState({ showCommentForm: true });
          }

          markFavorite(dishId) {
            const { postFavorite } = this.props;
            postFavorite(dishId);
          }
    
    render() {
        // const { showCommentForm } = this.state;
        const dishId = this.props.navigation.getParam('dishId', '');
        return (
            <ScrollView>
            <RenderDish dish = {this.props.dishes.dishes[+dishId]}
                favorite = {this.props.favorites.some(el => el === dishId)}
                openCommentForm = {() => this.openCommentForm()}
                markFavorite = {() => this.markFavorite(dishId)}
            />
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.showCommentForm}
              onDismiss={() => this.resetCommentForm()}
              onRequestClose={() => this.resetCommentForm()}
            >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Add Your Comment</Text>
            <Rating
              minValue={1}
              startingValue={3}
              fractions={0}
              showRating
              onFinishRating={rating => this.setRating(rating)}
            />
            <Input
              placeholder="Author"
              leftIcon={(
                <Icon
                  name="user"
                  type="font-awesome"
                />
              )}
              onChangeText={author => this.setAuthor(author)}
            />
            <Input
              placeholder="Comment"
              leftIcon={(
                <Icon
                  name="comment"
                  type="font-awesome"
                />
              )}
              onChangeText={comment => this.setComment(comment)}
            />
            <Button
              onPress={() => this.handleComment(dishId)}
              color="#512DA8"
              title="SUBMIT"
            />
            <Button
              onPress={() => this.resetCommentForm()}
              color="#6c757d"
              title="CANCEL"
            />
          </View>
        </Modal>
            <RenderComment comment = {comments.comments.filter((comment) => comment.dishId === dishId)} />
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
      margin: 20,
    },
    formLabel: {
      fontSize: 18,
      flex: 2,
    },
    formItem: {
      flex: 1,
    },
    modal: {
      justifyContent: 'center',
      margin: 20,
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: '#512DA8',
      textAlign: 'center',
      color: 'white',
      marginBottom: 20,
    },
    modalText: {
      fontSize: 18,
      margin: 10,
    },
  });
export default connect(mapStateToProps, mapDispatchToProps) (Dishdetail);

// const styles = StyleSheet.create({})
