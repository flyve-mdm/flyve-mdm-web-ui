import * as React from 'react'
import './Login.css'
import axios from 'axios'
import ChangeSessionToken from '../Utils/ChangeSessionToken'
import VerifyAccountActivation from '../Utils/VerifyAccountActivation'
import Loading from '../GenericComponents/Loading'
import LoginEmail from './LoginEmail'
import LoginPassword from './LoginPassword'
import LogoFlyve from './LogoFlyve'
import ErrorInput from './ErrorInput'
import config from '../config'
import Credentials from './Credentials'
import { bindActionCreators } from 'redux'
import { changeLoading, changeValue } from './DuckController'
import { connect } from 'react-redux'

function mapStateToProps(state, props) {
    return {
        userName: state.Login.userName
    }
}

function mapDispatchToProps(dispatch) {
    const actions = {
        changeValue: bindActionCreators(changeValue, dispatch)
    }
    return { actions }
}

class ValidateUser extends React.Component<any, any> {
    
    static propTypes = {
        history: React.PropTypes.object.isRequired
    }

    constructor (props: void) {
        super(props)
        document.body.className = 'win-type-body color-bg-light-vivid-high'
        this.state = {
           userName: 'example@teclib.com',
           classButton: 'win-button color-accent color-type-primary-alt',
           disabledButton: false,
           loading: true,
           padding: <span />
        }
    }

    componentWillMount () {
        const ACTIVE = 'registered Flyve MDM users. Created by Flyve MDM - do NOT modify this comment.'
        axios({
            method: 'get',
            url: 'https://dev.flyve.org/glpi/apirest.php/getActiveProfile/'
        })
            .then((response) => {
                if (response.data.active_profile.comment !== ACTIVE) {
                    this.props.actions.changeValue('userName', this.state.userName)
                    this.setState({
                        loading: false,
                        classButton: 'win-button',
                        disabledButton: false,
                        // tslint:disable-next-line:jsx-wrap-multiline
                        padding: <div>
                                    <strong>Account already activated</strong><br/>
                                    <a href="/login">Sign in</a>
                                 </div>
                    })
                }
            })
            .catch(() => {
                this.props.actions.changeValue('userName', this.state.userName)
                this.setState({
                        loading: false,
                        classButton: 'win-button',
                        disabledButton: true,
                        // tslint:disable-next-line:jsx-wrap-multiline
                        padding: <div>
                                    <strong>Account already activated</strong><br/>
                                    <a href="/login">Sign in</a>
                                 </div>
                    })
            })
    }

    validate () {
        axios.post ('https://dev.flyve.org/glpi/apirest.php/', {
                // login: config.userAdminName,
                // password: config.userAdminPassword
            }) 
                .then((response) => {
                    console.log(response)
                    // tslint:disable-next-line:jsx-wrap-multiline
                    this.props.actions.changeValue('messageSignIn', <div>
                                                                        <span>Account activated!</span> 
                                                                        <br />		
                                                                        <span>Now you can sign in.</span>
                                                                    </div>
                    )
                    this.props.actions.changeValue('userName', this.state.userName)
                    this.props.history.push('/login')
                }) 
                .catch((error) => {
                    console.log(error.response)
                    // this.props.changeLoading('')
                })
    }

    render () {

        if (this.state.loading) {
            return <Loading />
        } else {
            return (
                <div className="LoginForm">
                    <div id="maincontent">
                        <div className="centerText" id="validateUser">
                            <LogoFlyve />
                            <div>
                                <h1>
                                    Verify your identify
                                </h1>
                                <p>
                                    it's easy, just click the button below
                                </p>
                            <form>
                                    <input 
                                        type="email" 
                                        className="win-textbox color-type-disabled"
                                        value={this.state.userName} 
                                        disabled={true}
                                    />
                                    <button 
                                        className={this.state.classButton}
                                        type="button"
                                        disabled={this.state.disabledButton}
                                        onClick={() => this.validate()} 
                                    >
                                        Validate
                                    </button>
                                    {this.state.padding}
                                </form>
                            </div>
                            <Credentials />
                        </div>
                    </div>
                </div>
            )
        }
    }
}
export default connect <any, any, any>(
  mapStateToProps,
  mapDispatchToProps
)(ValidateUser)