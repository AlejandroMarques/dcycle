import React, { useState, useEffect } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import "./Ejercicio.css";
import SquareFlag from "../components/SquareFlag/SquareFlag";
const Ejercicio1 = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState([]);
  const [gender, setGender] = useState([]);
  const [countries, setCountries] = useState([]);
  const [countryCodes, setCountryCodes] = useState([]);
  const onChange = (event) => {
    setName(event.target.value);
    if (age || gender || countries) {
      setAge([]);
      setGender([]);
      setCountries([]);
    }
  };

  const normalizeName = (name) => {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/Ñ/g, "N");
  };

  const fetchGender = () => {
    fetch(
      `${process.env.REACT_APP_APIURL}/api/genderize/${normalizeName(name)}`
    )
      .then((response) => response.json())
      .then((data) => setGender(data));
  };

  const fetchCountries = () => {
    fetch(
      `${process.env.REACT_APP_APIURL}/api/nationalize/${normalizeName(name)}`
    )
      .then((response) => response.json())
      .then((data) => setCountries(data));
  };

  const fetchAge = () => {
    fetch(`${process.env.REACT_APP_APIURL}/api/agify/${normalizeName(name)}`)
      .then((response) => response.json())
      .then((data) => setAge(data));
  };

  const onClick = (event) => {
    event.preventDefault();
    fetchGender();
    fetchCountries();
    fetchAge();
  };

  useEffect(() => {
    fetch("https://flagcdn.com/es/codes.json")
      .then((response) => response.json())
      .then((data) => setCountryCodes(data));
  }, []);

  return (
    <>
      <h1>Aprende sobre tu nombre</h1>
      <div className="exercise-container">
        <form
          onSubmit={onClick}
          className="form-line">
          <Input
            name="nombre"
            type="text"
            placeholder="Ingrese su nombre"
            onChange={onChange}
            label="Ingrese su nombre"
            value={name}
          />
          <Button
            content="Buscar"
            disabled={name ? false : true}
          />
        </form>
        {countries.country && (
          <div className="result-container">
            <div className="result">
              El nombre {name} es{" "}
              <span
                style={{ color: gender.gender === "male" ? "blue" : "pink" }}>
                {gender.gender === "male" ? "masculino" : "femenino"}{" "}
                {gender.gender === "male" ? "♂" : "♀"}
              </span>{" "}
              al {gender.probability * 100}% y tiene una edad estimada de{" "}
              {age.age} años.
              <br />
              Las nacionalidades más comunes son:
            </div>
            <div className="flag-grid">
              {countries.country.map((country, index) => {
                if (country.country_id === 'SQ') {
                  country.country_id = 'SI';
                }
                country.name = countryCodes[country.country_id .toLowerCase()];
                return (
                  <SquareFlag
                    key={index}
                    country={country}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Ejercicio1;
