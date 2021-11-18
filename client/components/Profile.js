import React from 'react'
import { connect } from 'react-redux'
import { updateUser, setUser } from '../store/profile'

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: this.props.user.email,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.setUser()
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
    this.props.user.firstName = this.state.firstName;
    this.props.user.lastName = this.state.lastName;
    this.props.user.email = this.state.email;
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.updateUser(this.props.user)
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <h1>Profile</h1>
        <div className="profile-content">
          <form>
            <div>
              <label className="email">Email</label>
              <input name='email' type='text' defaultValue={user.email} onChange={this.handleChange} />
            </div>
            <div>
              <label className="username-label">Username</label>
              <input name='username' type='text' defaultValue={user.username} onChange={this.handleChange} />
            </div>
            <div>
              <label className="firstName">First Name</label>
              <input name='firstName' type='text' defaultValue={user.firstName} onChange={this.handleChange} />
            </div>
            <div>
              <label className="lastName">Last Name</label>
              <input name='lastName' type='text' defaultValue={user.lastName} onChange={this.handleChange} />
            </div>
          </form>
          <button onClick={this.handleSubmit} type="submit">Update</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    setUser: () => dispatch(setUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
