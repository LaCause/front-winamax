import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'
import { useTournaments } from '../../hook/useTournaments/useTournaments'
import { Modal } from '../../components/molecules/Modal/Modal'

export const Home = () => {
  const { loading, tournamentList, selectedTournaments, addTournament, removeTournament, filterTournament } = useTournaments()

  return <>
    <section className='flex flex-col px-3'>
      <div className='flex justify-center'>
        <img src={pokerBanner} className='rounded-3xl' />
      </div>
        <Modal header='Filtres' filterTournament={filterTournament} />
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