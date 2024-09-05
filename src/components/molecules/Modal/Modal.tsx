import React, { useEffect, useRef, useState } from "react"
import { ModalProps } from "./Modal.model"
import { formatCurrency } from "../../../utils"
import { TOURNAMENT_PRICES } from "../../../hook/useTournaments/useTournaments.model"

export const Modal: React.FC<ModalProps> = ({ header, filterTournament }) => {

    const modalRef = useRef<HTMLDialogElement | null>(null)

    const openModal = () => {
        modalRef.current?.showModal();
    };

    const [currentMinPrice, setCurrentMinPrice] = useState<number>(1)
    const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(10000)

    useEffect(() => {
      if (currentMinPrice > currentMaxPrice) {
        setCurrentMaxPrice(currentMinPrice)
      }
    }, [currentMinPrice, currentMaxPrice])

    return <>
      <button className="btn mt-2" onClick={openModal}><b>{header}</b></button>
      <dialog ref={modalRef} id="my_modal_2" className="modal">
        <div className="modal-box">
          <section className='flex gap-x-7'>
            <label>
              Prix min : {formatCurrency(currentMinPrice)}
              <input  
                type="range"
                min={TOURNAMENT_PRICES.MIN}
                max={TOURNAMENT_PRICES.MAX}
                className="range range-primary"
                onChange={(e) => setCurrentMinPrice(parseInt(e.target.value))}
                />
            </label>
            <label>
              Prix max : {formatCurrency(currentMaxPrice)}
              <input
                type="range"
                min={currentMinPrice}
                max={TOURNAMENT_PRICES.MAX}
                className="range range-primary"
                onChange={(e) => setCurrentMaxPrice(parseInt(e.target.value))}
                />
            </label>
          </section>
          <form method="dialog" className='text-center mt-4'>
            <button className="btn" onClick={() => filterTournament(currentMinPrice, currentMaxPrice)}>Valider</button>
          </form>
        </div>
      </dialog>
    </>
}