import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'
import { Carousel } from 'react-bootstrap'
import './AddQuestionModal.css'

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "10px",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: 0,
    width: '90%',
    borderRadius: '10px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function UsernameModal({ setUsername }) {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const [path, setPath] = useState('')
  const [username, setName] = useState('')
  const height = window.innerHeight, width = window.innerWidth
  useEffect(() => {
  }, [open])
  const addQuestionCallBack = async () => {
    // Error Handling
    if (username) {
      const res = await fetch('/API/users/login', {
        method: 'POST',
        body: JSON.stringify({ name: username }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const body = await res.json()
      localStorage.setItem('username', username)
      localStorage.setItem('id', body.id)
      setUsername(username)
      setPath('/join-quiz')
    }
  }

  if (!!(localStorage.getItem('username'))) {
    return <Redirect push to='/' />
  }

  if (!!path) {
    return <Redirect push to={path} />
  }

  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="d-block img-fluid mx-auto my-auto"
          style={{maxWidth:`${width}px`,maxHeight:`${height}px`}}
          src="/Quiz/1495315685183.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          className="d-block img-fluid mx-auto my-auto"
          src="/Quiz/banner-23.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block img-fluid mx-auto my-auto"
          src="/Quiz/education-technology-and-school-children.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          className={classes.modal}
          style={{width:'300px',margin:'auto'}}
          open={open}
          disableEnforceFocus={true}
        >
          <div className={classes.paper}>
            <div className='questionCard'>
              <div id='title'>Name:</div>
              <input
                type='text'
                autoFocus
                value={username}
                onChange={(e) => setName(e.target.value)}
                className='input-text question'
                placeholder='Type Name Here'
              />
            </div>
            <div className={classes.buttons}>
              <button
                // disabled={!(optionsArray.length && titleField.length)}
                className='button'
                color='secondary'
                variant='contained'
                style={{width:'100%'}}
                onClick={addQuestionCallBack}
              >
                Enter
              </button>
            </div>
          </div>
        </Modal>
    </Carousel>
  )
}
