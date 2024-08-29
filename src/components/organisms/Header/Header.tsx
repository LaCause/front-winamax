import logoWinamax from '/logo.png'

export const Header = () => {
    return <>
    <header className='z-20 fixed w-full bg-white flex justify-center border-b-[1.5px] border-[#c2c7d6] mb-2'>
        <img src={logoWinamax} width={50}/>
    </header>
    </>
}