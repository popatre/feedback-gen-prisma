import React, { useState } from "react";

type Props = {
    handleClick: () => void;
};

export default function DeleteButton({ handleClick }: Props) {
    return (
        <button
            onClick={handleClick}
            className="bg-red-600 hover:bg-red-700 text-xs text-white font-bold py-1 px-2 rounded max-h-6"
        >
            Del
        </button>
    );
}
