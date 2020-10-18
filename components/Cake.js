const Cake = ({ cake }) => (
  <>
    <h2>{cake.name}</h2>
    <img src={cake.imageUrl} alt='cake' />
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
