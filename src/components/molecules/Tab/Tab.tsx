import flagFR from '/assets/flags/FR.png'
import iconTick from '/assets/icons/tick.svg'
import iconM from '/assets/icons/m.png'
import iconF from '/assets/icons/f.png'
import React, { useEffect, useState } from 'react'
import iconToken from '/assets/icons/token.svg'
import { TabProps } from './Tab.model'

const addTick = (isActive: TabProps['isActive']) => isActive ? <>
    <span className='flex justify-evenly px-1 rounded-3xl bg-primary-green ml-auto'>
        <img className='mr-1' src={iconTick} width={15}/>
        <b className='mr-2 font-archivoNarrowBold text-xl'>IN</b>
    </span>
</> : null

const addInfoBox = (hasInfoBox: TabProps['hasInfoBox']) => hasInfoBox ? <>
    <section className='relative font-bold bg-primary-yellow w-full rounded-t-3xl top-[20px] -z-10 h-[45px] text-black -mt-[20px]'>
        <p className='px-4 font-archivoNarrowBold'>TOP TOURNOI</p>
    </section>
</> : null

export const Tab: React.FC<TabProps> = ({ isActive, hasInfoBox, onClick }) => {
    const border = isActive ? 'shadow-shadowTab' : null
    const [firstAnimation, setFirstAnimation] = useState<string | null>()
    const [secondAnimation, setSecondAnimation] = useState<string | null>()
    const [thirdAnimation, setThirdAnimation] = useState<string | null>()

    useEffect(() => {
        const firstInterval = setTimeout(() => {
            if (isActive !== undefined) {
                setFirstAnimation(isActive ? 'animate-running animate-moveFirstToken' : 'animate-running animate-moveFirstTokenReverse')
            }
        }, 100)

        const secondInterval = setTimeout(() => {
            if (isActive !== undefined) {
                setSecondAnimation(isActive ? 'animate-running animate-moveSecondToken' : 'animate-running animate-moveSecondTokenReverse')
            }
        }, 200)

        const thirdInterval = setTimeout(() => {
            if (isActive !== undefined) {
                setThirdAnimation(isActive ? 'animate-running animate-moveThirdToken' : 'animate-running animate-moveThirdTokenReverse')
            }
        }, 300)

        return () => {
            clearTimeout(firstInterval)
            clearTimeout(secondInterval)
            clearTimeout(thirdInterval)
        }
    }, [isActive])

    return <>
        <li className='relative' onClick={onClick} >
            {addInfoBox(hasInfoBox)}
            <section className={`relative flex flex-col text-black rounded-3xl bg-white py-2 px-4 gap-y-2 ${border} cursor-pointer`}>
                <div className='flex items-center'>
                    <span className='flex py-2 px-3 rounded-3xl bg-primary-white relative -mr-[10px] right-[25px] shadow-md'>
                        <img className='object-contain' src={flagFR} width={15}/>
                    </span>
                    <b className='font-archivoNarrowBold text-xl'>Monster Stack</b>
                    {addTick(isActive)}
                </div>
                <img src={iconToken} width={25} className={`animated-token opacity-0 ${firstAnimation}`}/>
                <img src={iconToken} width={25} className={`animated-token opacity-0 ${secondAnimation}`}/>
                <img src={iconToken} width={25} className={`animated-token opacity-0 ${thirdAnimation}`}/>
                <div className='flex'>
                    <div className='w-1/2 flex'>
                    <span className='w-1/2'>
                        <time className='font-archivoNarrowSemiBold'>Dem. 10:48</time>
                    </span>
                    <span className='flex w-1/2'>
                        <img className='object-contain rounded-lg' src={iconM} width={20}/>
                        <img className='object-contain rounded-lg' src={iconF} width={20}/>
                    </span>
                    </div>
                    <div className='w-1/2 flex justify-between front)'>
                        <p className='font-archivoNarrow'>
                            NLHE
                        </p>
                        <p className='font-archivoNarrow'>
                            125
                        </p>
                        <p className='font-archivoNarrow'>
                            30 €
                        </p>
                        <span className='font-archivoNarrowBold rounded-3xl bg-primary-grey px-2 text-primary-red'>
                            15 000 €
                        </span>
                    </div>
                </div>
            </section>
        </li>
    </>
}