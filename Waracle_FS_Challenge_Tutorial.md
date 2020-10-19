# Story 1
> As a cake lover, I can view all the cakes that have been submitted so [that] I can drool [over] their awesome tastiness
>
> Acceptance Criteria
> 1. A simple list showing the image and name of the cake and nothing else

## App setup

1. In the terminal
```bash
npx create-next-app cake-app --use-npm
cd cake-app
npm run dev # starts server on http://localhost:3000
```
>  Create a new repository in GitHub, then in the terminal
>  ```bash
>  git remote add origin git@github.com:stuartmoir1/waracle-cake-app.git
>  git push -u origin master
>  ```

## Schema and database setup

1. In the terminal
```bash
npm install @prisma/cli --save-dev
mkdir prisma
touch prisma/schema.prisma
```
2. Add the following code to `prisma/schema.prisma`
```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model Cake {
  id        Int     @default(autoincrement()) @id
  name      String  @unique
  comment   String
  imageUrl  String
  yumFactor Int
}
```
3. In the terminal
```bash
npx prisma migrate save --experimental # create a new database, name the migration 'init'
npx prisma migrate up --experimental
npx prisma generate
```
> To check the database has been created, in the terminal
>
>```bash
>➜  cake-app git:(master) ✗ sqlite3 prisma/dev.db 
>SQLite version 3.28.0 2019-04-15 14:49:49
>Enter ".help" for usage hints.
>sqlite> .tables
>Cake        _Migration
>sqlite> .schema Cake
>CREATE TABLE IF NOT EXISTS "Cake" (
>   "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
>    "name" TEXT NOT NULL,
>    "comment" TEXT NOT NULL,
>    "imageUrl" TEXT NOT NULL,
>    "yumFactor" INTEGER NOT NULL
>);
>CREATE UNIQUE INDEX "Cake.name_unique" ON "Cake"("name");
>```

## Seed the database

1. In the terminal
```bash
mkdir utils
touch utils/seed-db.js
```
2. Add the following code to `utils/seed-db.js`
```javascript
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
  const newCake1 = await prisma.cake.create({
    data: {
      name: 'Carrot Cake',
      comment: 'Three layers of moist sponge, walnuts, and freshly grated carrots; spiced with cinnamon, ground ginger and nutmeg.',
      imageUrl: 'images/carrot_cake.jpg',
      yumFactor: 2
    },
  })
  const newCake2 = await prisma.cake.create({
    data: {
      name: 'Vanilla Cake',
      comment: 'You can’t get more classic than this – layers of light, moist yellow vanilla sponge, with plenty of vanilla or chocolate buttercream frosting.',
      imageUrl: 'images/vanilla_cake.jpg',
      yumFactor: 3
    },
  })
  const newCake3 = await prisma.cake.create({
    data: {
      name: 'Red Velvet Cake',
      comment: 'An all-time favourite! Deep red vanilla cake with a light taste of chocolate, topped with cream cheese frosting. This decadent layer cake is sure to please.',
      imageUrl: 'images/red_velvet_cake.jpg',
      yumFactor: 4
    },
  })

  const allCakes = await prisma.cake.findMany()
  console.log(allCakes)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```
3. In the terminal
```bash
node utils/script.js
```
4. In the terminal
```bash
mkdir public/images
```

## Add images

1. Add three images to `public/images` with names corresponding to the field `imageUrl` values in `utils/seed-db.js`
>carrot_cake.jpg
>vanilla_cake.jpg
>vegan_red_velvet_cake.jpg

## Update app index page

1. In the terminal
```bash
npm install isomorphic-unfetch
```
1. Replace the contents of `pages/index.js` with the following code
```javascript
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
```

## Create Layout component

1. In the terminal
```bash
mkdir components
touch components/Layout.js
```
2. Add the following code to `components/Layout.js`
```javascript
export const siteTitle = 'Cakes'

export const Layout = props => (
  <div>
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
```

## Create Cake component
1. In the terminal
```bash
touch components/Post.js
```
2. Add the following code to `components/Post.js`
```javascript
const Cake = ({ cake }) => (
  <>
    <h2>{cake.name}</h2>
    <img src={cake.imageUrl} alt='cake' />
    <style jsx>{`
      h2 {
        padding: 10px 0 0 10px;
      }
      img {
        width: 300px;
      }
    `}</style>
  </>
)

export default Cake
```

## Create api allCakes

1. In the terminal
```bash
touch pages/api/allCakes.js
```
2. Add the following code to `api/feed.js`
```javascript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const posts = await prisma.cake.findMany()
  res.json(posts)
}
```
>  **Story 1 complete**

# Story 2

>As a cake lover, I can submit cakes that I like so everyone can drool at my tasty suggestions.
>
>Acceptance Criteria
>1. I should be able add a cake from the list of all cakes view
>2. I should be taken to a view where I am able to specify the name a comment and a yum factor between 1 and 5.
>3. I should be returned back to the list of cakes after submitting.
>4. I should not be able to successfully submit an invalid form. Instead a relevant error message should be displayed below all invalid form fields.

## Create Header component

1. In the terminal
```bash
touch components/Header.js
```
2. Add the following code to `components/Header.js`
```javascript
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = () => {
  const router = useRouter()
  const isActive = router.pathname != '/create'

  const index = '/'
  const create = '/create'

  return (
    <nav>
      <div className='left'>
        <Link href={index}>
          <a className='home' data-active={isActive}>Cakes</a>
        </Link>
      </div>
      <div className='right'>
        <Link href={create}>
          <a data-isactive={isActive}>Create</a>
        </Link>
      </div>
      <style jsx global>{`
        .home {
          font-weight: bold;
          font-size: 150%;
        }
        .right {
          margin-left: auto
        }
        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
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
```

## Add Header component to Layout component
> Apply Header component to Layout component

1. Update `components/Layout.js` as follows.
```javascript
import Header from './Header

// ...

export const Layout = props => (
  <div>
    <Header />
    //...
)
```
## Create addCakes page

1. In the terminal
```bash
touch pages/addCakes.js
```
2. Add the following code to `pages/addCakes.js`
```javascript
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
            value='Create'
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
```

## Create api cakes/index

1. In the terminal
```bash
mkdir pages/api/cakes
touch pages/api/cakes/index.js
```
2. Add the following code to `pages/api/post/index.js`
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const { name, comment, imageUrl, yumFactor } = req.body
  const result = await prisma.cake.create({
    data: { name, comment, imageUrl,
      yumFactor: Number(yumFactor),
    }
  })
  res.json(result)
} 
```

## Add image
1. Add another cage image (`.jpeg)` to `public/images`

> This additional image allows for the new 'add cake' functionality to be demonstrated - select this file when adding the new cake

> **Story 2 complete**

# Story 3
>S3 - As a cake lover I can view details about a single cake so that I can see the
comment made against it.
>
>Acceptance Criteria
>1. I can select/click or tap any cake in the list and be taken to a view where I can see the comment/review made.
>2. I should be able to close or navigate back to the list of cakes once I’ve read the cake details.

## Create api cakes/[id]
1. In the terminal
```bash
touch pages/api/cakes/\[id\].js
```
2. Add the following code to `pages/api/cakes/[id].js
```javascript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const cake = await prisma.cake.findOne({
    where: { id: Number(req.query.id) }
  })
  res.json(cake)
}
```

## Create cakes/[id] page
1. In the terminal
```bash
mkdir pages/cakes
touch pages/cakes/\[id\].js
```
2. Add the following code to `pages/cakes/\[id\].js`
```javascript
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
```

## Update Cake component image to be clickable
1. Update `components/Cake.js` as follows
```javascript
import Router from 'next/router'

const Cake = ({ cake }) => (
  <>
    <h2>{cake.name}</h2>
    <div onClick={() => Router.push('/cakes/[id]', `/cakes/${cake.id}`)}>
      <img src={cake.imageUrl} alt='cake' />
    </div>
    // ...
)

export default Cake
```
> **Story 3 complete**
