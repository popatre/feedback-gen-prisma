import React from "react";
import useModal from "@/hooks/useModal";
import Modal from "react-modal";
import GuidanceForm from "./GuidanceForm";

type Props = { guidanceType: string };

export default function GuidanceAdder({ guidanceType }: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();

    const handleClick = () => {
        console.log("ive been clicked", guidanceType);
        openModal();
    };

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Guidance form"
                ariaHideApp={false}
            >
                <GuidanceForm
                    closeModal={closeModal}
                    guidanceType={guidanceType}
                />
            </Modal>
            <section onClick={handleClick} className="ticket__add">
                Add {guidanceType} Guidance
            </section>
        </>
    );
}
