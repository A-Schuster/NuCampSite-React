import {Component} from 'react'
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class CampsiteInfo extends Component{

  renderCampsite(campsite){
    return(
      <div className={"col-md-5 m-1"}>
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }
  // comments: [
  //   {
  //       id: 0,
  //       rating: 5, 
  //       text: "What a magnificent view!",
  //       author: "Tinus Lorvaldes",
  //       date: "2018-10-25T16:30Z"
  //   },

  renderComments(comments){
    if(comments){
      return(
        <div className={"col-md-5 m-1"}>
          <h4>Comments</h4>
          {comments.map(comment => {
            return(
              <div key={`${comment.id}-${comment.author}`}>
                <p>{comment.text}</p>
                <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
              </div> 
            )
          })}
        </div>
      )
    }
    else{
      return(
        <div></div>
      )
    }
  }

  render(){
    const {campsite} = this.props
      if(campsite){
        return(
          <div className={'row'}>
            {this.renderCampsite(campsite)}
            {this.renderComments(campsite.comments)}
          </div>
        )
      }
      else{
        return(
          <div></div>
        )
      }
  }
}

export default CampsiteInfo