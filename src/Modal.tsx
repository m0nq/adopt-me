import { useEffect } from 'react';
import { useRef } from 'react';
import { ReactElement } from 'react';
import { MutableRefObject } from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ children }: { children: ReactElement }) => {
	const elRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
	if (!elRef.current) {
		elRef.current = document.createElement('div');
	}

	useEffect(() => {
		const modalRoot: Element | null = document.querySelector('#modal');
		if (!modalRoot || !elRef.current) {
			return;
		}
		modalRoot.appendChild(elRef.current);

		return () => {
			if (elRef.current) {
				modalRoot.removeChild(elRef.current);
			}
		};
	}, []);

	return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
