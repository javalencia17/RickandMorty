import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'

const FavPage =  ({ characters }) => {


    function renderCharacter(char, i) {
        return (
            <Card key={i} {...char} hide />
        )
    }
    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {characters.map(renderCharacter)}
            {!characters.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

const mapToStateToProps = ( { Chars  } ) => {
    return {
        characters: Chars.favorites
    }
}

export default connect( mapToStateToProps )(FavPage)