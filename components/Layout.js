import Header from './Header'

export const siteTitle = 'Cakes'

export const Layout = props => (
  <div>
    <Header />
    <div className='layout'>{props.children}</div>
    <style jsx global>{`
      body {
        margin: 20px;
        padding: 20px;
        font-size: 16px;
        background: rgba(252, 245, 199, 0.8);
      }
    `}</style>
  </div>
)

export default Layout
