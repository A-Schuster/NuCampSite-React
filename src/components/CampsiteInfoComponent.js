import React, { useState } from 'react'
import { Card, CardImg, CardText, CardBody, 
  Modal, ModalHeader, ModalBody, Label,
  Breadcrumb, BreadcrumbItem, Button, } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './loadingComponent'


function RenderCampsite({campsite}){
  return(
    <div className={"col-md-5 m-1"}>
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);


const CommentForm = (props) => {
  const [isModalOpen, toggleModal] = useState(false);
  
  
  const handleModal = () => {
    isModalOpen ? toggleModal(false) : toggleModal(false)
  }

  const handleSubmit = ({ratings,author,text}) => {
    props.addComment(props.campsiteId,ratings,author,text)
  }

  return(
    <>
      <Modal isOpen={isModalOpen} toggle={handleModal}>
        <ModalHeader toggle={handleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={values => handleSubmit(values)}>
            <div className={'form-group'}>
              <Label htmlFor="rating">Rating</Label>
              <Control.select 
              className="form-control" 
              model=".rating"
              validators={{
                required,
              }} 
              name="rating" id="rating">
                <option>Please select one</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Control.select>
              <Errors className="text-danger" model=".rating" show="touched" component='div' messages={{
                required: "Please Select a Option"
              }}/>
            </div>
            <div className={'form-group'}>
              <Label htmlFor="rating">Your Name</Label>
              <Control.text placeholder="Your Name" 
              className="form-control" 
              validators={{
                required,
                maxLength: maxLength(15),
                minLength: minLength(2),
              }}
              model=".author" name="author" id="author"/>
              <Errors className="text-danger" model=".author" show="touched" component='div' messages={{
                required: "Please Enter Your Name",
                minLength: "Must contain at least 2 or more characters",
                maxLength: "Must contain 15 or less characters",
              }}/>
            </div>
            <div className={'form-group'}>
              <Label htmlFor="rating">Comment</Label>
              <Control.textarea rows={6} 
              className="form-control" 
              validators={{
                required,
              }}
              model=".text" 
              name="text" id="text"/>
              <Errors className="text-danger" model=".text" show="touched" component='div' messages={{
                required: "Please enter out your comment/remarks."
              }}/>
            </div>
            <div className={'form-group'}>
              <Button type="submit" color="primary">Submit</Button>
            </div>
          </LocalForm>
        </ModalBody>
      </Modal>
      <Button onClick={toggleModal} outline><i className="fa fa-pencil fa-lg"/>Submit Comment</Button>
    </>
  )
}

function RenderComments({comments, addComment, campsiteId}){
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
      <CommentForm campsiteId={campsiteId} addComment={addComment}/>
      </div>
    )
  }
  else{
    return(
      <div></div>
    )
  }
}

function CampsiteInfo(props){
  if( props.isLoading){
    return (
      <div className="container">
        <div className="row">
          <Loading/>
        </div>
      </div>
    )
  }
  if(props.errMess){
    <div className="container">
      <div className="container">
        <h4>{props.errMess}</h4>
      </div>
    </div>
  }
  if(props.campsite){
     return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} 
                    addComment={props.addComment} campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
  }
  return <div />;
}

export default CampsiteInfo