import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter();
  const home = '/'
  const add = '/addCake'

  return (
    <nav>
      <div className='home'>
        <Link href={home}>
          <a className='home'>Cakes</a>
        </Link>
      </div>
      <div className='add-cake'>
        <Link href={add}>
          <a>Add Cake</a>
        </Link>
      </div>
      <style jsx global>{`
        .add-cake {
          margin-left: auto
        }
        .add-cake a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
        .home {
          font-weight: bold;
          font-size: 150%;
        }
        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }
        nav {
          display: flex;
          align-items: center;
        }
      `}</style>
    </nav>
  )
}

export default Header
