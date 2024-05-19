import React from 'react';
import './alphabet-pagination.scss';

interface AlphabetPaginationProps {
    onSelectLetter: (letter: string) => void;
}

const AlphabetPagination: React.FC<AlphabetPaginationProps> = ({ onSelectLetter }) => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    return (
        <div className="alphabet-pagination">
            {alphabet.map((letter) => (
                <button
                    key={letter}
                    onClick={() => onSelectLetter(letter)}
                    className="alphabet-pagination__button"
                >
                    {letter}
                </button>
            ))}
        </div>
    );
};

export default AlphabetPagination;
