import { Pagination } from "antd";

import { AnimatedBox } from "../../components/AnimatedBox/AnimatedBox";
import { Header } from "../../components/header/Header";

import s from "./Starship.module.scss";

import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import StarShipStore from "../../store/starship-store";
import { Link } from "react-router-dom";

export const Starship = observer(() => {
  useEffect(() => {
    StarShipStore.fetchStarship();
  }, []);

  const handlePageChange = (page: number) => {
    StarShipStore.setCurrentPage(page);
  };

  return (
    <div className="container">
      <AnimatedBox>
        <div className={s.starship}>
          <Header />
          <div className={s.starshipContent}>
            <div className={s.starshipItems}>
              {StarShipStore.getDisplayedStarship().map((person, index) => (
                <Link
                  to={`/starship/${index}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={index}
                >
                  <div className={s.starshipCard}>
                    <div className={s.starshipCardText}>
                      <h1>{person.name}</h1>
                      <p>Model: {person.model}</p>
                      <p>Manufacturer: {person.manufacturer}</p>
                      <p>Consumables: {person.consumables}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className={s.mainPagination}>
              <Pagination
                total={StarShipStore.starship.length}
                pageSize={StarShipStore.pageSize}
                current={StarShipStore.currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </AnimatedBox>
    </div>
  );
});