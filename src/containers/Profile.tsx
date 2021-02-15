import { connect } from 'react-redux';
import ProfilePage from '../components/Profile/ProfilePage';

import { addUser, login } from '../store/actions/root';

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    addUser: (name) => dispatch(addUser(name)),
    login: (name) => dispatch(login(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
