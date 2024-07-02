function App() {
  return (
    <div className="container">
      <h1>Lista zadań</h1>
      <section className="section">
        <header className="section__header">
          <h2>Dodaj nowe zadanie</h2>
        </header>
        <div className="section__body">
          <form className="form">
            <input className="form__input" placeholder="Co jest do zrobienia?" />
            <button className="form__button">Dodaj zadanie</button>
          </form>
        </div>
      </section>
      <section className="section">
        <header className="section__header section__header--withButtons">
          <h2>Lista zadań</h2>
          <div className="buttonsArea"></div>
        </header>
        <div className="section__body section__body--withList">
          <ul></ul>
        </div>
      </section>
    </div>
  );
}

export default App;
