import Head from 'next/head'
import fetch from 'isomorphic-unfetch'

import Layout, { siteTitle } from '../components/Layout'
import Cake from '../components/Cake'

const Cakes = props => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div>
        <main>
          {props.cakes.map(cake => (
            <div key={cake.id} className='cake'>
              <Cake cake={cake} />
            </div>
          ))}
        </main>
        <style jsx>{`
          .cake {
            background: white;
            border-radius: 3px;
            transition: box-shadow 0.1s ease-in;
          }
          .cake:hover {
            box-shadow: 1px 1px 3px #aaa;
          }
          .cake + .cake {
            margin-top: 2rem;
          }
        `}</style>
      </div>
    </Layout>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/allCakes')
  const cakes = await res.json()
  return { props: { cakes } }
}

export default Cakes;
