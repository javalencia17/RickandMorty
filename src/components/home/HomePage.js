import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterActions, addToFavoritesAction} from '../../redux/charsDuck'


const Home = ({ chars, removeCharacterActions, addToFavoritesAction }) => {

    const  renderCharacter = () => {
        let char = chars[0]
        return (
            <Card leftClick={nextCaracter} {...char}  rightClick={add} />
        )
    }

    const nextCaracter = () => {
        removeCharacterActions()
    } 

    const add = () => {
        addToFavoritesAction()
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        chars: state.Chars.array
    }
}

export default connect(mapStateToProps, { removeCharacterActions, addToFavoritesAction })(Home)