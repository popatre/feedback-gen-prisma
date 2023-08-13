import useDeleteGuidance from "@/hooks/useDeleteGuidance";
import ModalFormWrapper from "@/wrappers/ModalFormWrapper";
import React, { MutableRefObject, useEffect } from "react";

type Props = {
    closeModal: () => void;
    guidanceIdRef: MutableRefObject<string | null>;
    deleteGuidance: (guidanceId: string) => void;
};

export default function DeleteForm({
    closeModal,
    guidanceIdRef,
    deleteGuidance,
}: Props) {
    const { isDeleted, handleDeleteGuidance, isLoading, isError } =
        useDeleteGuidance();

    useEffect(() => {
        if (isDeleted && guidanceIdRef.current) {
            deleteGuidance(guidanceIdRef.current);
            closeModal();
        }
    }, [isDeleted]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (guidanceIdRef.current) {
            handleDeleteGuidance(guidanceIdRef.current);
        }
    };
    if (isError) return <p>Something Went Wrong</p>;
    return (
        <ModalFormWrapper
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            closeModal={closeModal}
            title="Are you sure you want to delete this guidance?"
            confirmButtonLabel="Confirm"
        >
            <p></p>
        </ModalFormWrapper>
    );
}
