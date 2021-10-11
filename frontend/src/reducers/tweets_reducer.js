
// import RECEIVE_TWEETS from '../actions/tweet_actions.js';

const RECEIVE_TWEETS = "RECEIVE_TWEETS";
const RECEIVE_USER_TWEETS = "RECEIVE_USER_TWEETS";
const RECEIVE_NEW_TWEET = "RECEIVE_NEW_TWEET";

const TweetsReducer = (state = { all: {}, user: {}, new: undefined }, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_TWEETS:
            newState.all = action.tweets.data;
            return newState;
        case RECEIVE_USER_TWEETS:
            newState.user = action.tweets.data;
            return newState;
        case RECEIVE_NEW_TWEET:
            newState.new = action.tweet.data
            return newState;
        default:
            return state;
    }
};

export default TweetsReducer;