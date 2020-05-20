import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
// import { connect } from 'react-redux';

export const fetchComments = () => (dispatch) => {
    return fetch(baseUrl + 'comments')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error( 'Error' + response.status + ':' + response.statusText);
            
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = (errmess) => ({
    type: ActionTypes.FAILED_COMMENTS,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})
export const postComment = (dishId, rating, author, comment) => (dispatch) => {

    const newComment = {
        author: author,
        comment: comment,
        dishId: dishId,
        rating: rating,
    };
    newComment.date = new Date().toISOString();

    setTimeout(() => {
        dispatch(addComment(newComment));
    }, 2000); // Simulating an async server call
};

export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading());

    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error( 'Error' + response.status + ':' + response.statusText);
            
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(dishes => dispatch(addDishes(dishes)))
    .catch(error => dispatch(dishesFailed(error.message)));
};

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.FAILED_DISHES,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});



export const fetchPromos = () => (dispatch) => {
    
    dispatch(promosLoading());

    return fetch(baseUrl + 'promos')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error( 'Error' + response.status + ':' + response.statusText);
            
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(promos => dispatch(addPromos(promos)))
    .catch(error => dispatch(promosFailed(error.message)));
};

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errmess) => ({
    type: ActionTypes.FAILED_PROMOS,
    payload: errmess
});

export const addPromos = (promos) => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promos
});


export const fetchLeaders = () => (dispatch) => {

    dispatch(leadersLoading());

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error( 'Error' + response.status + ':' + response.statusText);
            
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error (error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
};

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING
});

export const leadersFailed = (errmess) => ({
    type: ActionTypes.FAILED_LEADERS,
    payload: errmess
});

export const addLeaders = (leaders) => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
});


export const postFavorite = (dishId) => (dispatch) => {
    setTimeout(() => {
        dispatch(addFavorite(dishId));
    }, 2000);
};

export const addFavorite = (dishId) => ({
    type: ActionTypes.ADD_FAVORITE,
    payload: dishId
});

export const deleteFavorite = (dishId) => ({
    type: ActionTypes.DELETE_FAVORITE,
    payload: dishId
});