export default function Loading() {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center rounded-lg shadow-md p-6 bg-blend-darken">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    </>
  );
}
