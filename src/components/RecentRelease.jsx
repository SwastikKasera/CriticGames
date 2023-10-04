import React from 'react'
import Card from './Card'
import { useQuery, gql } from '@apollo/client';

const recentRelease = gql`
query recentRelease{
    recentRelease {
      id
      firstReleaseDate
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
const RecentRelease = () => {
    const {data, loading} = useQuery(recentRelease)
    if(loading) return (<h1>Loading recent</h1>)
    return (
        <div>
            <h2 className='text-white text-3xl p-3'>Recent Releases</h2>
            <div class="overflow-x-auto">
                <div class="min-w-screen-sm md:min-w-screen-md lg:min-w-screen-lg xl:min-w-screen-xl">
                    <div class="flex space-x-4 p-2">
                        {data.recentRelease.map((game)=> (
                            game.images.og ? (<Card releaseDate={game.firstReleaseDate} name={game.name} imageLink={game.images.og} tier={game.tier} score={game.topCriticScore}/>) : null
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RecentRelease