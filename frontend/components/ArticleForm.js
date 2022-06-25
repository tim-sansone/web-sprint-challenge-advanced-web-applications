import React, { useEffect, useState } from 'react'

import PT from 'prop-types'

const initialFormValues = { title: '', text: '', topic: '' }

export default function ArticleForm(props) {
  const [values, setValues] = useState(initialFormValues)
  const {
    articles,
    postArticle,
    currentArticleId,
    updateArticle
  } = props
  

  useEffect(() => {
    if(currentArticleId){
      const current = articles.find(each => {
        return each.article_id === currentArticleId
      })
      setValues({
        title: current.title,
        text: current.text,
        topic: current.topic
      })
    } else {
      setValues(initialFormValues)
    }
  },[currentArticleId])

  const onChange = evt => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  }

  const onSubmit = evt => {
    evt.preventDefault();
    // ✨ implement
    // We must submit a new post or update an existing one,
    // depending on the truthyness of the `currentArticle` prop.
    if(currentArticleId){
      updateArticle(currentArticleId, values)
    } else {
      postArticle(values);
    }
    setValues(initialFormValues);
  }

  const isDisabled = () => {
    
    const { title, text, topic } = values;
    if(title && text && topic){
      return false
    } else {
      return true
    }
  }

  return (
    // ✨ fix the JSX: make the heading display either "Edit" or "Create"
    // and replace Function.prototype with the correct function
    <form id="form" onSubmit={onSubmit}>
      {
        currentArticleId
        ? <h2>Edit Article</h2>
        : <h2>Create Article</h2>
      }
      
      <input
        maxLength={50}
        onChange={onChange}
        value={values.title}
        placeholder="Enter title"
        id="title"
      />
      <textarea
        maxLength={200}
        onChange={onChange}
        value={values.text}
        placeholder="Enter text"
        id="text"
      />
      <select onChange={onChange} id="topic" value={values.topic}>
        <option value="">-- Select topic --</option>
        <option value="JavaScript">JavaScript</option>
        <option value="React">React</option>
        <option value="Node">Node</option>
      </select>
      <div className="button-group">
        <button disabled={isDisabled()} id="submitArticle">Submit</button>
        { currentArticleId && <button onClick={Function.prototype}>Cancel edit</button> }
      </div>
    </form>
  )
}

// 🔥 No touchy: LoginForm expects the following props exactly:
ArticleForm.propTypes = {
  postArticle: PT.func.isRequired,
  updateArticle: PT.func.isRequired,
  setCurrentArticleId: PT.func.isRequired,
  currentArticle: PT.shape({ // can be null or undefined, meaning "create" mode (as opposed to "update")
    article_id: PT.number.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    topic: PT.string.isRequired,
  })
}
