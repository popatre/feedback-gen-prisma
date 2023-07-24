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
        <section className="flex flex-col items-center  min-h-[65vh] justify-center">
            <div className="bg-white shadow-md rounded px-8 py-20 max-w-[600px] w-[80%] w-full flex items-center flex-col">
                <h2 className="text-2xl font-bold mb-6">Sign in with Google</h2>
                <button
                    onClick={handleSignIn}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-[80%] flex justify-center items-center"
                >
                    <p className="mr-5">Login </p>
                    <FcGoogle size="40" />
                </button>
            </div>
        </section>
    );
}
