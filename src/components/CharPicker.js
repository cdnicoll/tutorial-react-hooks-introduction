import React, { useState, useEffect } from 'react';

import './CharPicker.css';

const CharPicker = props => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://swapi.co/api/people')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch.');
        }
        return response.json();
      })
      .then(charData => {
        const selectedCharacters = charData.results.slice(0, 5);

        setCharacters(
          selectedCharacters.map((char, index) => ({
            name: char.name,
            id: index + 1,
          })),
        );
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []); // Note that when using an empty array, this behaves as componentDidMount
          // if I didn't use an empty array, the useEffect method would be rendered
          // twice because the state property changed, causing an infinite loop

  let content = <p>Loading characters...</p>;

  if (!isLoading && characters && characters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {characters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!characters || characters.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;
