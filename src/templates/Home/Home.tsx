import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'
import { useTournaments } from '../../hook/useTournaments/useTournaments'
import { useEffect, useState } from 'react'
import { Modal } from '../../components/molecules/Modal/Modal'
import { TOURNAMENT_PRICES } from '../../hook/useTournaments/useTournaments.model'
import { formatCurrency } from '../../utils'

export const Home = () => {
  const { loading, tournamentList, selectedTournaments, addTournament, removeTournament, filterTournament } = useTournaments()

  const [minPrice, setMinPrice] = useState<number>(TOURNAMENT_PRICES.MIN)
  const [maxPrice, setMaxPrice] = useState<number>(TOURNAMENT_PRICES.MAX)

  const [currentMinPrice, setCurrentMinPrice] = useState<number>(1)
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(10000)

  return <>
    <section className='flex flex-col px-3'>
      <div className='flex justify-center'>
        <img src={pokerBanner} className='rounded-3xl' />
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn mt-2" onClick={()=>document?.getElementById('my_modal_2')?.showModal()}><b>Filtres</b></button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <section className='flex gap-x-7'>
            <label>
              Prix min : {formatCurrency(currentMinPrice)}
              <input type="range" min={minPrice} max={maxPrice} className="range range-primary" onChange={(e) => setCurrentMinPrice(parseInt(e.target.value))}/>
            </label>
            <label>
              Prix max : {formatCurrency(currentMaxPrice)}
              <input type="range" min={currentMinPrice} max={maxPrice} className="range range-primary" onChange={(e) => setCurrentMaxPrice(parseInt(e.target.value))}/>
            </label>
          </section>
          <form method="dialog" className='text-center mt-4'>
            <button className="btn" onClick={() => filterTournament(currentMinPrice, currentMaxPrice)}>Valider</button>
          </form>
        </div>
      </dialog>
      {/* end */}
    
      <div>
        <ul className='flex flex-col gap-3'>
        <HeaderTab className='mt-3' />
        {loading ? (
          <span className="loading loading-spinner text-error loading-lg"></span>
        ) : (
          <>
            {tournamentList?.map((tournament, id) => (
              <Tab 
                key={id} 
                tournament={tournament} 
                selectedTournaments={selectedTournaments} 
                addTournament={addTournament} 
                removeTournament={removeTournament} 
              />
            ))}
          </>
        )}
        </ul>
      </div>
    </section>
  </>
}