import React, { useState } from 'react'
import Modal, { ModalContext, ModalFooter } from './Modal'

const ModalWrapper = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    }
    return (
        <div>
            <h1>Modal</h1>
            <button onClick={() => setIsOpen(!isOpen)}>Open Modal!</button>
            <Modal label='Header' isOpen={isOpen} onClose={handleClose}>
                <ModalContext>
                    <h1>Content</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores iusto eaque consequuntur reiciendis. Aut amet ut aperiam repellat, placeat incidunt vitae aspernatur debitis quod officiis quaerat ad, molestias voluptatibus molestiae accusantium sequi quis laborum alias? Corporis nemo modi fuga illum necessitatibus unde, totam dolor debitis voluptatem laborum recusandae ab velit, impedit quaerat distinctio voluptatum deleniti illo repudiandae id ipsa. Expedita, velit! Debitis architecto ea, doloribus esse excepturi consequatur fuga iusto similique vero, suscipit provident corporis aspernatur doloremque saepe eligendi perferendis.</p>
                </ModalContext>

                <ModalFooter>
                    <p>Footer Details</p>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default ModalWrapper