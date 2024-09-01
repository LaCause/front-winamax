import pokerBanner from '/images/tournois.jpg'
import { Tab } from '../../components/molecules/Tab/Tab'
import { HeaderTab } from '../../components/molecules/HeaderTab/HeaderTab'
import { useState } from 'react'

export const Home = () => {
  const [activeTab, setActiveTab] = useState<boolean>()

  const handleClick = () => setActiveTab(!activeTab)

  return <>
    <section className='flex flex-col px-3'>
      <div className='flex justify-center'>
        <img src={pokerBanner} className='rounded-3xl' />
      </div>
      <div>
        <ul className='flex flex-col gap-3'>
          <HeaderTab className='mt-3' />
          <Tab hasInfoBox />
          <Tab isActive={activeTab} onClick={handleClick}/>
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