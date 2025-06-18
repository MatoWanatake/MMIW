import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateStory } from '../../redux/stories'
import './StoriesPage.css'

export default function EditStoryForm({ story, onClose }) {
  const dispatch = useDispatch()
  const [title, setTitle]             = useState(story.title)
  const [content, setContent]         = useState(story.content)
  const [country, setCountry]         = useState(story.country)
  const [stateOrRegion, setStateOrRegion] = useState(story.state_or_region)
  const [status, setStatus]           = useState(story.status || '')
  const [errors, setErrors]           = useState([])

  const handleSubmit = async e => {
    e.preventDefault()
    const payload = {
      title,
      content,
      country,
      state_or_region: stateOrRegion,
      status
    }
    const res = await dispatch(updateStory(story.id, payload))
    if (res.error) {
      setErrors([res.error])
    } else {
      onClose()
    }
  }

  return (
    <form className="story-form" onSubmit={handleSubmit}>
      <h2>Edit Story</h2>
      {errors.map(e => <p key={e} className="error">{e}</p>)}
      <input
        name="title"
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        name="content"
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
        required
      />
      <input
        name="country"
        type="text"
        placeholder="Country"
        value={country}
        onChange={e => setCountry(e.target.value)}
        required
      />
      <input
        name="stateOrRegion"
        type="text"
        placeholder="State / Region"
        value={stateOrRegion}
        onChange={e => setStateOrRegion(e.target.value)}
        required
      />
      <input
        name="status"
        type="text"
        placeholder="Status (optional)"
        value={status}
        onChange={e => setStatus(e.target.value)}
      />
      <button type="submit">Save</button>
    </form>
  )
}
