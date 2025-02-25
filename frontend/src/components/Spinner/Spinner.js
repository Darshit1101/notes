import { useSelector } from 'react-redux';
import './Spinner.css'
import { Spinner } from '@shopify/polaris';

function SpinnerLoader(props) {
  const isLoading = useSelector(state => state.loading.isLoading);
  return (
    <div className='loading-wrap' style={{ display: isLoading ? 'flex' : 'none' }}>
      <div className='spinner_loading_main_div'>
        <Spinner size="large" />
      </div>
    </div>
  );
}

export default SpinnerLoader;