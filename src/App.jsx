import { useEffect, useState } from 'react'

import './App.css'
import aberta from "../src/imgs/pokebola-aberta.png";
import TypeBord from './module/TypeBord';

function App() {
  const [pokemon, setPokemon] = useState("")
  const [dados, setDados] = useState(null)

  useEffect(() => {
    if (pokemon === "") return
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
      .then(res => res.json())
      .then(data => {
        setDados(data)
      })

  }, [pokemon])

  return (
    <>
      <TypeBord/>
      <h1>Buscar Pokemon</h1>
      <input
        type="text"
        placeholder='Digite o nome do Pokemon'
        onChange={(e) => setPokemon(e.target.value)}
      />
      {dados &&
        <div>
          <h2>{dados.name}</h2>

          <div className='div-bola'>
            
            <div>
              <img className='bola' src="./src/imgs/pokebola-aberta.png" />
              <img src={dados.sprites.front_default} />
              <img src={dados.sprites.back_default} />
              <p>Tipo: {dados.types[0].type.name}</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default App
