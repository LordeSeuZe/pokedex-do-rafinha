import { useEffect, useState } from 'react'

import './App.scss'
import aberta from "./imgs/pokebola-aberta.png";
import fechada from "./imgs/pokebola-fechada.png";

import TypeBord from './module/typeBord/TypeBord';
import TypeMerge from './imgs/typeMerge';

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

  const getGradient = (types) => {
  const colors = types.map(t =>
    TypeMerge[t.type.name]?.color || "#ccc"
  );

  if (colors.length === 1) {
    return `linear-gradient(135deg, ${colors[0]}AA, rgba(255,255,255,0.2))`;
  }

  return `linear-gradient(135deg, ${colors[0]}AA, ${colors[1]}AA)`;
};

  return (
    <>
      <h1>Buscar Pokemon</h1>
      <input
        type="text"
        placeholder='Digite o nome do Pokemon'
        onChange={(e) => setPokemon(e.target.value)}
      />
      {!dados &&
        <div className='container'>
          <img className='pokebola' src={fechada} alt="pokebola fechada" />
        </div>
      }
      {dados &&
        <div className="container">
          <img className="pokebola" src={aberta} />

          <div className="card">
            <h2>{dados.name}</h2>

            <img
              className="pokemon-img"
              src={dados.sprites.front_default}
            />

            <div className="abilities" style={{
                background: getGradient(dados.types),
                backdropFilter: "blur(2px)"
              }}>
              <span className='hab'>
                Habilidades
              </span>
              {dados.abilities.map((a) => (
                <span className='skill' key={a.ability.name}>
                  {a.ability.name}
                </span>
              ))}
            </div>
          </div>

          <div
            className="type"
            style={{
              background: getGradient(dados.types),
              backdropFilter: "blur(2px)"
            }}
          >
            {dados.types.map((t) => (
              <TypeBord key={t.type.name} tipo={t.type.name} />
            ))}
          </div>
        </div>
      }
    </>
  )
}

export default App
