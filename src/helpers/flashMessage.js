import { showMessage } from 'react-native-flash-message';

export const showFlashMessage = props => showMessage({
	duration: 2000,
	...props,
});
