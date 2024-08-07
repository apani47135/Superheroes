import './App.css';
import HeroList from './components/heroList.tsx';
import GlobalScrollbarStyles from './styles/GlobalScrollbarStyles.js';
function App() {
  return (
    <div className="App">
      <GlobalScrollbarStyles />
      <HeroList />
    </div>
  );
}

export default App;
