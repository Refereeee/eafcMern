import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import Register from '../Register';
import { offRegModal, selectReg } from '../../redux/slice/registerSlice';
import styles from './Modal.module.scss';
import { useAppDispatch } from '../../redux/hooks';
import { offLogModal, selectLog } from '../../redux/slice/loginSLice';
import Login from '../Login';

const Modal = () => {
  const dispatch = useAppDispatch();
  const {
    regModal,
  } = useSelector(selectReg);
  const {
    logModal,
  } = useSelector(selectLog);

  const modalRef = useRef<HTMLFormElement | null>(null);
  const modalLog = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      if (
        modalLog.current
        && !modalLog.current.contains(event.target as Node)
      ) {
        dispatch(offLogModal());
      }
      if (
        modalRef.current
        && !modalRef.current.contains(event.target as Node)
      ) {
        console.log(event.target);
        dispatch(offRegModal());
      }
    };
    if (logModal || regModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [regModal, logModal]);
  return (
    <div className={regModal || logModal ? styles.modalWrapper : null}>
      {regModal ? <Register forwardedRef={modalRef} /> : null}
      {logModal ? <Login forwardRef={modalLog} /> : null}
    </div>
  );
};

export default Modal;
