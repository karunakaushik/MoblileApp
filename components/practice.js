import React, { Component } from 'react'
import { Text, View, ScrollView,Button, Modal,StyleSheet } from 'react-native'
import { Card, Icon, Rating, Input, } from 'react-native-elements'
import { connect } from 'react-redux'
import { baseUrl } from '../shared/baseUrl'
import { postFavorite, postComment } from '../redux/ActionCreators'


// const mapStateToProps = state => {
//     return {
//       dishes: state.dishes,
//       comments: state.comments,
//       favorites: state.favorites
//     }
//   }
  const mapDispatchToProps = dispatch => ({
      postFavorite: (dishId) => dispatch(postFavorite(dishId)),
      postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  
  })
  
  
 
  
  
  function RenderDish(props) {
    //   const dish = props.dish;
    //       if (dish != null) {
              return(
              <Card>
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
               </View>  
               </Card>                                  
              );        
          }

class Practice extends Component{

    static navigationOptions = {
        title : 'Dish Details'
    }
    
      constructor(props) {
        super(props);
        this.state ={
            rating: 3,
            author: '',
            comment: '',
            showCommentForm: false,

        };
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
        this.setState({
            rating: 3,
            author: '',
            comment: '',
            showCommentForm: false,
        });
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

    //   markFavorite(dishId) {
    //     const { postFavorite } = this.props;
    //     postFavorite(dishId);
    //   }

render() {
    // const { showCommentForm } = this.state;
    // const dishId = this.props.navigation.getParam('dishId', '');
    return (
        <ScrollView>
        <RenderDish openCommentForm = {() => this.openCommentForm()}
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
        {/* <RenderComment comment = {comments.comments.filter((comment) => comment.dishId === dishId)} /> */}
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
export default Practice;