import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { DoGoogleLogionAction, logOutAction } from '../../redux/userDuck'

const LoginPage = ({ DoGoogleLogionAction, logOutAction, fetching, loggedIn }) => {

    const doLogin = () => {
        DoGoogleLogionAction()
    }

    const logOut = () => {
        logOutAction()
    }

    console.log('hola', loggedIn)


    if (fetching) return <h2>Cargando .....</h2>

    return (
        <div className={styles.container}>

            {
                loggedIn ?
                    <div>
                        <h1>
                            Cierra tu sesión
                        </h1>
                        <button onClick={logOut}>
                            Cerrar Sesión
                        </button>
                    </div>
                    :
                    <div>
                        <h1>
                            Inicia Sesión con Google
                        </h1>
                        <button onClick={doLogin}>
                            Inciar
                        </button>
                    </div>
            }
        </div>
    )
}

const mapStateToProps = ({ User: { fetching, loggedIn } }) => {
    return {
        fetching,
        loggedIn
    }
}

export default connect(mapStateToProps, { DoGoogleLogionAction, logOutAction })(LoginPage)