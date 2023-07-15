import React, { useState } from "react";

type Props = { children };

export default function CompleteWrapper({ children }: Props) {
    const [complete, setComplete] = useState("");

    const handleClick = (event) => {
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
            <input type="checkbox" name="done" onClick={handleClick} />
            {children}
        </div>
    );
}
