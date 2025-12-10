export default function SuccessPopup({ message }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg text-center w-80 animate-bounce">
        <h2 className="text-lg font-bold text-green-600 mb-2">Success!</h2>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
}
