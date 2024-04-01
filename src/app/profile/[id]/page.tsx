
export default function page({params}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2 className="py-3 bg-green-500 rounded text-black">
        {params.id}
      </h2>
    </div>
  )
}
