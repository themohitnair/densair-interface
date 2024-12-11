import UploadForm from "./uploadForm"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-black">
            <h1 className="mb-2 text-5xl font-bold text-white">
                Dens<span className="text-primary">AI</span>r
            </h1>
            <p className="mb-8 text-xl text-gray-400 italic">Condense knowledge, elevate learning</p>
            <UploadForm />
        </main>
    )
}