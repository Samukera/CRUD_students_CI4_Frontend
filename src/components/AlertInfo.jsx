export default function AlertInfo({ username, showAlert, setShowAlert }) {
  return (
    <>
      {showAlert ? (
        <div className="alert alert-info flex justify-between">
          <span>
            👋 Olá <b>{username}</b>! Seja bem-vindo.
          </span>
          <button onClick={() => setShowAlert(false)}>✕</button>
        </div>
      ) : null}
    </>
  );
}
