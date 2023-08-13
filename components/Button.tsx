import React from "react";

type Props = {
    handleClick: () => void;
    label: string;
    className: string;
};

export default function Button({ handleClick, label, className }: Props) {
    return (
        <button onClick={handleClick} className={className}>
            {label}
        </button>
    );
}
