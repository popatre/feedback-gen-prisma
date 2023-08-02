import { useState, ChangeEvent } from "react";

const useFormState = <T extends {}>(initialState: T) => {
    const [formState, setFormState] = useState<T>(initialState);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({ ...prevState, [name]: value } as T));
    };

    const resetForm = () => {
        setFormState(initialState);
    };

    return { formState, handleChange, resetForm };
};

export default useFormState;
