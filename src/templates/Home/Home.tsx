import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'

export const Home = () => {
    return <>
      <section className='flex flex-col px-3'>
        <div className='flex justify-center'>
          <img src={pokerBanner} className='rounded-3xl' />
        </div>
        <div>
          <ul className='flex flex-col gap-3'>
            <HeaderTab className='mt-3' />
            <Tab hasInfoBox />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab />
            <Tab hasInfoBox />
          </ul>
        </div>
      </section>
    </>
}