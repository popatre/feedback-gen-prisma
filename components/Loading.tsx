import { useState, CSSProperties } from "react";
import RingLoader from "react-spinners/Ringloader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
};

type Props = {};

export default function Loading({}: Props) {
    return (
        <div className="aside min-h-screen flex flex-col items-center justify-center">
            <RingLoader
                loading={true}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
                color="purple"
            />
        </div>
    );
}
