import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './App.module.scss';
import Header from '../Header';
import Home from '../Home';
import Divisions from '../Divisions';
import Footer from '../Footer';
import Finals from '../Finals';
import Playoff from '../Playoff';
import Modal from '../Modal';
import SquadBattles from '../SquadBattles';
import Tasks from '../Tasks';
import Draft from '../Draft';

const App = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/divisions" element={<Divisions />} />
          <Route path="/fut-champions-playoffs" element={<Playoff />} />
          <Route path="/fut-champions-finals" element={<Finals />} />
          <Route path="/squad-battles" element={<SquadBattles />} />
          <Route path="/draft" element={<Draft />} />
          <Route path="/tasks" element={<Tasks />} />
        </Routes>
        <Footer />
      </div>
      <Modal />
    </div>
  );
};

export default App;
