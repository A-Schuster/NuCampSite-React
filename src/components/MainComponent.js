import React, { Component } from 'react';
import Directory from './DirectoryComponent';
import CampsiteInfo from "./CampsiteInfoComponent"
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import Contact from './ContactComponent';
import About from './AboutComponent';
import { postComment, fetchCampsites,fetchComments,fetchPromotions } from '../redux/ActionCreators';
import { actions } from 'react-redux-form'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const mapStateToProps = state => {
  return{
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  }
}

const mapDipsatchToProps = {
  postComment: (campsiteId, rating, author, text) => (postComment(campsiteId, rating, author, text)),
  fetchCampsites: () => (fetchCampsites()),
  resetFeedbackForm: () => (actions.reset('feedbackForm')),
  fetchComments: () => (fetchComments()),
  fetchPromotions: () => (fetchPromotions()),
}

class Main extends Component {

  componentDidMount(){
    this.props.fetchCampsites();
    this.props.fetchComments();
    this.props.fetchPromotions();
  }

  render() {
    const CampsiteWithId = ({match}) => {
      return (
          <CampsiteInfo 
              postComment={this.props.postComment}
              campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
              isLoading={this.props.campsites.isLoading}
              errMess={this.props.campsites.errMess}
              commentsErrMess={this.props.comments.errMess}
              comments={this.props.comments.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          />
      );
  };  

    const HomePage = () => {
      console.log(this.props.promotions)
      return (
          <Home
              campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
              campsitesLoading={this.props.campsites.isLoading}
              campsitesErrMess={this.props.campsites.errMess}
              promotionLoading={this.props.promotions.isLoading}
              promotionErrMess={this.props.promotions.errMess}
              promotion={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
              partner={this.props.partners.filter(partner => partner.featured)[0]}
          />
      );
  };

    return (
        <div>
          <Header />
          <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames='page' timeout={300}>
              <Switch>
                <Route path={'/home'} component={HomePage}/>
                <Route exact path="/directory"
                render={() => <Directory campsites={this.props.campsites}/>}/>
                <Route path='/directory/:campsiteId' component={CampsiteWithId} />
                <Route exact path='/contactus' render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
                <Route exact path='/aboutus' render={() => <About partners={this.props.partners} />} />
                <Redirect to="/home"/>
              </Switch>
            </CSSTransition>
          </TransitionGroup>
          <Footer />
        </div>
      );
  }
}

export default withRouter(connect(mapStateToProps,mapDipsatchToProps)(Main));