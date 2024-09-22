import { Frame, Toast } from '@shopify/polaris';
import { useDispatch, useSelector } from 'react-redux';
import { toastify as toastUpdate } from '../../ducks/toast';

function Toastify(props) {
  const dispatch = useDispatch();
  const objToast = useSelector(state => state.toast);

  const toggleActive = () => {
    dispatch(toastUpdate({ type: 'hide' }))
  }

  const toastMarkup = (objToast && objToast.data) ? (
    <Frame>
      {
        objToast.data.type === 'success' ?
          <Toast content={objToast.data.msg} onDismiss={toggleActive} duration={5000} />
          :
          objToast.data.type === 'error' ?
            <Toast content={objToast.data.msg} error onDismiss={toggleActive} duration={5000} />
            :
            null
      }
    </Frame>
  ) : null;

  return (
    <div style={{ height: '0px' }} >
      {toastMarkup}
    </ div>
  );
}




export default Toastify;