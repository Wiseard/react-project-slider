import { useEffect, useState } from 'react'
import { list } from './data'
import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from 'react-icons/bs'

const App = () => {
  const [people, setPeople] = useState(list)
  const [value, setValue] = useState(0)

  const slidePrev = () => {
    setValue((oldValue) => {
      const result = (oldValue - 1 + people.length) % people.length
      return result
    })
  }

  const slideNext = () => {
    setValue((oldValue) => {
      const result = (oldValue + 1) % people.length
      return result
    })
  }

  useEffect(() => {
    let sliderId = setInterval(() => {
      slideNext()
    }, 2000)
    return () => clearInterval(sliderId)
  }, [value])

  return (
    <main>
      <UserList
        people={people}
        value={value}
        slideNext={slideNext}
        slidePrev={slidePrev}
      />
    </main>
  )
}

export default App

const UserList = ({ people, value, slideNext, slidePrev }) => {
  return (
    <section>
      {people.map((user, index) => {
        return (
          <User
            {...user}
            key={user.id}
            style={{
              transform: `translateX(${(index - value) * 100}%)`,
              opacity: index === value ? 1 : 0,
              visibility: index === value ? 'visible' : 'hidden',
            }}
          />
        )
      })}
      <button onClick={slidePrev} type="button" className="prev">
        <BsFillArrowLeftSquareFill />
      </button>
      <button onClick={slideNext} type="button" className="next">
        <BsFillArrowRightSquareFill />
      </button>
    </section>
  )
}

const User = ({ image, name, quote, title, style }) => {
  return (
    <article style={style}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <h4>{title}</h4>
      <p>{quote}</p>
    </article>
  )
}
