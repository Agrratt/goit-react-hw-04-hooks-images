import { useEffect } from "react";
import { Overlay, ModalContent } from 'components/Modal/Modal.styled';
import PropTypes from 'prop-types';

export function Modal({ onClose, largeImage }) {
    
    useEffect(() => {
        const handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            onClose();
            };
        };
        
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [onClose]);

    const handleOverlayClick = (evt) => {
        if (evt.currentTarget === evt.target) {
            onClose();
        }
    };

    return (          
            <Overlay onClick={handleOverlayClick}>
                <ModalContent>
                    <img
                        src={largeImage}
                        alt=''
                        loading='lazy'
                        
                    />
                </ModalContent>
            </Overlay>
        );
};
Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImage: PropTypes.string.isRequired,
};


// export class OldModal extends Component {
//     static propTypes = {
//     onClose: PropTypes.func.isRequired,
//     largeImage: PropTypes.string.isRequired,
//   };
    // componentDidMount() {
    //     window.addEventListener('keydown', this.handleKeyDown)
    //     };

    // componentWillUnmount() {
    //     window.removeEventListener('keydown', this.handleKeyDown)

    // };

    // handleKeyDown = evt => {
    //     if (evt.code === 'Escape') {
    //         this.props.onClose();
    //     }
    // };

    // handleOverlayClick = (evt) => {
    //     if (evt.currentTarget === evt.target) {
    //         this.props.onClose();
    //     }
    // }

    // render() {
    //     return (
            
    //         <Overlay onClick={this.handleOverlayClick }>
    //             <ModalContent>
    //                 <img
    //                     src={this.props.largeImage}
    //                     alt=''
    //                     loading='lazy'
                        
    //                 />
    //             </ModalContent>
    //         </Overlay>
    //     );
    // }
// }