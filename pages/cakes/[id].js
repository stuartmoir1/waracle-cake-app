import Router from 'next/router'
import fetch from 'isomorphic-unfetch'

import Layout from '../../components/Layout'

const Cake = props => (
  <Layout>
    <div className='page'>
      <h2>{props.name}</h2>
      <div className='flex-container'>
        <div className='flex-child'>
          <img src={props.imageUrl} alt='cake' />
        </div>
        <div className='flex-child'>
          {props.comment}
          <div className='rating'>Yum Factor: {props.yumFactor}</div>
          <a className='back' href='#' onClick={() => Router.push('/')}>
            Back
          </a>              
        </div>
      </div>
    </div>
    <style jsx>{`
      .page {
        background: white;
      }
      .flex-container {
         display: flex;
      }
      .flex-child {
        flex: 1;
        padding-right: 30px
      }
      .rating {
        padding-top: 1rem;
        padding-bottom: 1rem;
      }
      .back {
        border: 1px solid black;
        padding: 0.5rem 1rem;
        border-radius: 3px;
      }
      a {
        text-decoration: none;
        color: #000;
        display: inline-block;
      }
      h2 {
        padding: 10px 0 0 10px;
      }
      img {
        width: 100%;
      }
    `}</style>
  </Layout>
  )

export const getServerSideProps = async context => {
  const res = await fetch(`http://localhost:3000/api/cakes/${context.params.id}`)
  const data = await res.json()
  return { props: { ...data } }
}

export default Cake
