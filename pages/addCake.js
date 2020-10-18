import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import Router from 'next/router'

import Layout from '../components/Layout'

const AddCake = props => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [yumFactor, setYumFactor] = useState('3')
  const [imageUrl, setImageUrl] = useState('')

  const imagesDir = '/images/'
  const isCake = props.allCakes
    .some(e => e.name.toLowerCase() == name.toLowerCase());

  const submitData = async e => {
    e.preventDefault();
    try {
      const res = await fetch(
        'http://localhost:3000/api/cakes',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, comment, yumFactor, imageUrl })
        }
      )
      await Router.push('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <div className='page'>
        <form onSubmit={submitData}>
          <h1>Add Cake</h1>
          <input
            onChange={e => setName(e.target.value)}
            placeholder='Name'
            type='text'
            value={name}
          />
          <div className="error">
            {isCake ? 'Cake already exists - enter another' : ''}
          </div>
          <textarea
            cols={50}
            maxLength='200'
            onChange={e => setComment(e.target.value)}
            placeholder='Comment (between 5 and 200 characters)'
            rows={4}
            value={comment}
          />
          <label htmlFor="yumFactors">Yum Factor</label>
          <select 
            name="yumFactors"
            onChange={e => setYumFactor(e.target.value)}
            value={yumFactor}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <input
            name="imageUrl"
            onChange={e => setImageUrl(imagesDir + e.target.files[0].name)}
            type="file"
          />
          <input
            disabled={!name || !comment || !yumFactor || !imageUrl || comment.length < 5 || isCake}
            type='submit'
            value='Add'
          />
          <a className='cancel' href='#' onClick={() => Router.push('/')}>
            or Cancel
          </a>
        </form>
      </div>
      <style jsx>{`
        .cancel {
          margin-left: 1rem;
        }
        .error {
          color: red;
          font-size: 12px;
        }
        .page {
          background: white;
          padding: 3rem;
          justify-content: center;
          align-items: center;
          margin-top: 1rem;
        }
        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }
        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 0.75rem 1.5rem;
          border-radius: 3px;
          font-size: 100%
        }
        input[type='file'] {
          display: block;
          padding-bottom: 1rem;
        }
        label {
          margin-right: 1rem
        }
        select {
          margin-bottom: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/allCakes')
  const allCakes = await res.json()
  return { props: { allCakes } }
}

export default AddCake
