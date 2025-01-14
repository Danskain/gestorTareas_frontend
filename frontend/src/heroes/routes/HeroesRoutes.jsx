import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../../ui';
import { Tasks, HistoryTask } from '../pages';

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

        <div className="container">
            <Routes>
                <Route path="marvel" element={<Tasks />} />
                <Route path="history-task/:id/:title" element={<HistoryTask />} />                

                <Route path="/" element={<Navigate to="/marvel" />} />

            </Routes>
        </div>


    </>
  )
}
