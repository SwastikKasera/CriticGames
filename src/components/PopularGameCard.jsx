import React from 'react'

const PopularGameCard = ({ imageLink, name, score, tier }) => {

  return (
    <div className="bg-zinc-800 p-4 w-72 rounded-lg border-cyan-500 flex-shrink-0">
      <img className="rounded-lg" src={`https://img.opencritic.com/${imageLink}`} alt={`${name} not found`} />
      <div className="flex flex-col justify-between mt-4 h-56">
        <div>
          <p className="text-xl font-bold text-white">{name}</p>
          <p className="text-md text-gray-200 mt-2">
            Critic Score :{' '}
            <span className="bg-cyan-500 text-black font-bold px-1 py-1 rounded-md">
              {score}/100
            </span>
          </p>
          <div className="text-white mt-4 text-sm flex gap-3">
            {tier && (
              <div className="flex items-center py-1 justify-center border-[1px] border-cyan-400 bg-zinc-900 text-[#64F6FF] w-fit px-4 rounded-full">
                <p className="">{tier}</p>
              </div>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button className="bg-zinc-900 w-full h-10 rounded-lg text-white">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopularGameCard