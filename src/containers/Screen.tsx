import { connect } from 'react-redux';
import Screen from '../components/Chat/Screen';
import { StoreState } from '../types/state';

const mapStateToProps = (state: StoreState) => ({
    messages: state.messages,
});

export default connect(mapStateToProps)(Screen);
