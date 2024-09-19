import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'
import { useTournaments } from '../../hook/useTournaments/useTournaments'
import { Modal } from '../../components/molecules/Modal/Modal'

export const Home = () => {
  const { loading, tournamentList, selectedTournaments, addTournament, removeTournament, filterTournament, error } = useTournaments()
  if (loading && error) {
    return <>
      <p className='text-primary-red text-center font-bold mt-2'>
        {error}
      </p>
    </>
  }
    
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
          <div className='text-center'>
            <span className="loading loading-spinner text-error loading-lg"></span>
          </div>
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