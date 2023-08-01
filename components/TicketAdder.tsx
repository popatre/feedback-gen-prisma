import useModal from "@/hooks/useModal";
import Modal from "react-modal";
import TicketForm from "./TicketForm";

type Props = { text: string; block: string };

export default function TicketAdder({ text, block }: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();

    return (
        <>
            <article
                onClick={openModal}
                className="border-solid border-2 border-white bg-slate-200  rounded-md p-10 h-[100%] max-h-[200px] shadow-md hover:bg-sky-300 hover:cursor-pointer flex justify-left items-center "
            >
                <p className="text-white font-semibold">{text}</p>
            </article>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <TicketForm closeModal={closeModal} block={block} />
            </Modal>
        </>
    );
}
