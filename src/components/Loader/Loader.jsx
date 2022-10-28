import CircleLoader from 'react-spinners/CircleLoader';
const { Backdrop } = require('./Loader.styled');

export const Loader = () => {
    return (
      <Backdrop>
        <CircleLoader color="#36d7b7" size={100} />
      </Backdrop>
    );
};
