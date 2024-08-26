import pokerBanner from '/images/tournois.jpg'

export const Home = () => {
    return <>
      <section className='flex justify-center'>
        <div>
        <img src={pokerBanner} className='rounded-3xl' />
        </div>
      </section>
    </>
}