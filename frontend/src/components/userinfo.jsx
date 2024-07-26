export default function UserInfo() {
  return (
    <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile Information</h1>
      <div className="flex items-center mb-4">
        <img
          className="w-20 h-20 rounded-full mr-4"
          src="https://avatar.iran.liara.run/public"
          alt="Profile"
        />
        <div>
          <h3 className="font-medium text-lg">Name: Nishant</h3>
          <h3 className="text-gray-600">Email: nishnatpatil0121@gmail.com</h3>
          <h3 className="text-gray-600">Phone: (123) 456-7890</h3>
          <h3 className="text-gray-600">Address: 123 Main St, Anytown, USA</h3>
        </div>
      </div>
      <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
        Edit
      </button>
    </div>
  );
}
