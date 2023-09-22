type Props = { statusCode: number; message: string };

export default function Error({ statusCode, message }: Props) {
    return (
        <div className="border-2 border-solid border-black w-2/4 flex flex-col items-center py-10 bg-white mr-auto ml-auto rounded-lg">
            <h2 className="">Status: {statusCode}</h2>
            <p className="font-bold">{message}</p>
        </div>
    );
}
