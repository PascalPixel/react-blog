import React, { Component, PropTypes } from 'react'
import { reduxForm }                   from 'redux-form'
import { createPost }                  from '../actions/index'
import { Link }                        from 'react-router'

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  onSubmit(props) {
    this.props.createPost(props).then(() => {
      this.context.router.push('/')
    })
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props

    return (
      <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
        <div className="row m-t-1 text-xs-center">
          <div className="col-xs-4">
            <Link to="/" className="btn btn-danger pull-xs-left">Cancel</Link>
          </div>
          <div className="col-xs-4">
            <h3>New</h3>
          </div>
          <div className="col-xs-4">
            <button type="submit" className="btn btn-primary pull-xs-right">Submit</button>
          </div>
        </div>
        <hr/>
        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Catagories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>
      </form>
    )
  }
}

function validate(values) {
  const errors = {}

  if (!values.title) {
    errors.title = 'Enter a title'
  }
  if (!values.categories) {
    errors.categories = 'Enter a category'
  }
  if (!values.content) {
    errors.content = 'Enter content'
  }

  return errors
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostsNew)
