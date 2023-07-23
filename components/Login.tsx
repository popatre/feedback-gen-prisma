import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { auth, provider } from "../lib/firebase";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    const router = useRouter();

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
            router.push("/");
        } catch (error) {
            console.log("gone wrong");
        }
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-white shadow-md rounded px-8 py-6 max-w-xs w-full">
                <h2 className="text-2xl font-bold mb-6">Sign in with Google</h2>
                <button
                    onClick={handleSignIn}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
                >
                    Login <FcGoogle size="40" />
                </button>
            </div>
        </section>
    );
}
