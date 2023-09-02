import React from "react";
import useModal from "@/hooks/useModal";
import Modal from "react-modal";
import GuidanceForm from "./GuidanceForm";
import { Guidance, GuidanceType } from "@/types/types";

type Props = {
    guidanceType: GuidanceType;
    handleNewGuidance: (guidance: Guidance) => void;
};

export default function GuidanceAdder({
    guidanceType,
    handleNewGuidance,
}: Props) {
    const { modalIsOpen, openModal, closeModal, customStyles } = useModal();

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
                    handleNewGuidance={handleNewGuidance}
                />
            </Modal>
            <section onClick={openModal} className="ticket__add">
                Add {guidanceType} Guidance
            </section>
        </>
    );
}
