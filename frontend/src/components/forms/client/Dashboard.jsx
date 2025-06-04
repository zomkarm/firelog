


export default function Dashboard(){
    return (
        <div className="p-6 space-y-6 overflow-auto">
          <h2 className="text-2xl font-semibold">Welcome, Client</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md h-40 flex items-center justify-center text-gray-500">Chart 1</div>
            <div className="bg-white p-6 rounded-xl shadow-md h-40 flex items-center justify-center text-gray-500">Chart 2</div>
            <div className="bg-white p-6 rounded-xl shadow-md h-40 flex items-center justify-center text-gray-500">Chart 3</div>
          </div>
        </div>
    );
}