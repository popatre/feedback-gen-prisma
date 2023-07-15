import React, { useState, ReactNode, ChangeEvent } from "react";

type Props = { children: ReactNode };

export default function CompleteWrapper({ children }: Props) {
    const [complete, setComplete] = useState("");

    const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            setComplete("complete");
        } else {
            setComplete("");
        }
    };

    return (
        <div
            className={complete ? "complete grid-container" : "grid-container"}
        >
            <input type="checkbox" name="done" onChange={handleClick} />
            {children}
        </div>
    );
}
