import React, { ReactNode } from "react";

type Props = {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    title: string;
    isLoading: boolean;
    closeModal: () => void;
    children: ReactNode;
    confirmButtonLabel: string;
};

export default function ModalFormWrapper({
    handleSubmit,
    title,
    isLoading,
    closeModal,
    children,
    confirmButtonLabel = "Add Ticket",
}: Props) {
    return (
        <form className="my-10 mx-10 w-[400px]" onSubmit={handleSubmit}>
            <h2 className="font-bold mb-10 text-lg">{title}</h2>
            {children}
            <div className="form-btns flex justify-around">
                {!isLoading && (
                    <button
                        type="button"
                        className="bg-rose-600 hover:bg-rose-700 text-xs text-white font-bold py-3 px-4 rounded my-1 mx-5"
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                )}
                <button
                    disabled={isLoading}
                    className="bg-green-600 hover:bg-green-700 text-xs text-white font-bold py-3 px-4 rounded my-1"
                >
                    {isLoading ? `Working on it...` : `${confirmButtonLabel}`}
                </button>
            </div>
        </form>
    );
}
