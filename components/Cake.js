import Router from 'next/router';

const Cake = ({ cake }) => (
  <>
    <h2>{cake.name}</h2>
    <div onClick={() => Router.push('/cakes/[id]', `/cakes/${cake.id}`)}>
      <img src={cake.imageUrl} alt='cake' />
    </div>
    <style jsx>{`
      h2 {
        padding: 10px 0 0 10px;
      }
      img {
        width: 400px;
      }
    `}</style>
  </>
)

export default Cake
