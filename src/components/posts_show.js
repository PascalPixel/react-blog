import React, { Component, PropTypes } from 'react'
import { connect }                     from 'react-redux'
import { fetchPost, deletePost }       from '../actions/index'
import { Link }                        from 'react-router'

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchPost(this.props.params.id)
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id).then(() => {
      this.context.router.push('/')
    })
  }

  render() {
    if (!this.props.post) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="row m-t-1 text-xs-center">
          <div className="col-xs-4">
            <Link to="/" className="btn btn-secondary pull-xs-left"> Back</Link>
          </div>
          <div className="col-xs-4">
            <h3>Show</h3>
          </div>
          <div className="col-xs-4">
            <button onClick={ this.onDeleteClick.bind(this) } className="btn btn-danger pull-xs-right">
              Delete
            </button>
          </div>
        </div>
        <hr/>
        <h3>{ this.props.post.title }</h3>
        <h6>{ this.props.post.categories }</h6>
        <p>{ this.props.post.content }</p>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
