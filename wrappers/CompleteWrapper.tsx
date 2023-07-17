import React, { useState, ReactNode, ChangeEvent, cloneElement } from "react";

type Props = { children: ReactNode | null | undefined };

type ChildProps = {
    disabled: boolean;
};

export default function CompleteWrapper({ children }: Props) {
    const [complete, setComplete] = useState("");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
            <input type="checkbox" name="done" onChange={handleChange} />
            {children &&
                React.Children.map(children, (child, index) => {
                    if (index === 1 && complete) {
                        return cloneElement(
                            child as React.ReactElement<ChildProps>,
                            {
                                disabled: true,
                            }
                        );
                    }
                    return child;
                })}
        </div>
    );
}
