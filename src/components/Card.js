import React from 'react';
import './Card.css';
import List from './List';

export default props => {
    return (
        <div className="Card">
            <div className="Conteudo">
                <h3>Versões</h3>
                <ul>
                    <List model={props.model.value} />
                </ul>
            </div>
            <div className="Title">
                <h2>
                    <small>{props.model.label}</small>
                </h2>
            </div>
        </div>
    )
}
