const Loading = () => {
  return (
    <div className="flex items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-2 text-gray-600 font-medium">Loading...</span>
    </div>
  );
};

export default Loading;
