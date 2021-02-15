import { connect } from 'react-redux';
import MessageBox from '../components/Chat/MessageBox';
import { StoreState } from '../types/state';

import { addMessage } from '../store/actions/root';

const mapStateToProps = (state: StoreState) => ({
    login: state.login,
});

const mapDispatchToProps = (dispatch) => ({
    addMessage: (message, login) => dispatch(addMessage(message, login)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);
