import React from 'react'
import { useQuery, gql } from '@apollo/client'
import PopularGameCard from './PopularGameCard'

const popularGames = gql`
query popularGames{
  popularGames {
    id
    name
    tier
    topCriticScore
    images {
      og
      sm
    }
  }
}
`
const PopularGames = () => {
  const {data, loading} = useQuery(popularGames)
  if(loading) return (<h1>Loading popular games...</h1>)
  return (
    <div>
      <h2 className='text-white text-3xl p-3'>Popular Games</h2>
      <div class="overflow-x-auto">
        <div class="min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg xl:min-w-screen-xl">
          <div class="flex space-x-4 p-2">
              {
                data.popularGames.map((game)=>(
                  <PopularGameCard name={game.name} tier={game.tier} score={Math.round(game.topCriticScore)} imageLink={game.images.og}/>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopularGames