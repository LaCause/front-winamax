import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'
import { useTournaments } from '../../hook/useTournaments/useTournaments'
import { useEffect } from 'react'

export const Home = () => {
  const { tournamentList, selectedTournaments, addTournament, removeTournament } = useTournaments()

  return <>
    <section className='flex flex-col px-3'>
      <div className='flex justify-center'>
        <img src={pokerBanner} className='rounded-3xl' />
      </div>
      <div>
        <ul className='flex flex-col gap-3'>
          <HeaderTab className='mt-3' />
          { tournamentList?.map((tournament, id) =>
            <Tab key={id} tournament={tournament} selectedTournaments={selectedTournaments} addTournament={addTournament} removeTournament={removeTournament}/>
          )}
        </ul>
      </div>
    </section>
  </>
}