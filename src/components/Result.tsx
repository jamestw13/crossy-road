import useStore from '../stores/game';
import './Result.css';

export function Result() {
  const status = useStore(state => state.status);
  const score = useStore(state => state.score);
  const reset = useStore(state => state.reset);

  if (status === 'running') return null;

  return (
    <div id="result-container">
      <div id="result">
        <h1>Game Over</h1>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <strong>12874 KELSY</strong>
          <strong>12870 TBLAD</strong>
          <strong>12314 SEE-J</strong>
          <strong> 7280 E V A</strong>
          <strong> 2873 AAAAA</strong>
        </div>

        <p>Your score: {score}</p>
        <button onClick={reset}>Retry</button>
      </div>
    </div>
  );
}
