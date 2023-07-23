import { trpc } from "@/utils/trpc";

export default function useHandleUserLogin() {
    const {
        data: user,
        isLoading,
        isSuccess,
        mutateAsync,
    } = trpc.user.login.useMutation();

    const handleLogin = async (email: string) => {
        await mutateAsync(email);
    };

    return { user, handleLogin, isLoading };
}
