import { connect } from 'react-redux';
import UserList from '../components/Chat/UserList';
import { StoreState } from '../types/state';

const mapStateToProps = (state: StoreState) => ({
    login: state.login,
    users: state.users,
    messages: state.messages,
});

export default connect(mapStateToProps)(UserList);
