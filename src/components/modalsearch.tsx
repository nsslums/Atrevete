import React from "react";
import Modal from "react-modal";
import Search from './search';

Modal.setAppElement("#___gatsby")
class ModalWindow extends React.Component{
    constructor(){
        super();    //親のコンストラクタを呼び出す(親初期化)
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);     //bindでthisを指定する
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(){
        this.setState({modalIsOpen: true})
    }
    closeModal(){
        this.setState({modalIsOpen: false})
    }

    render(){
        return (
            <div className="modalWrapper">
                <button onClick={this.openModal}>検索する</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Seach Modal"
                    className="modalSearchWindow"
                    overlayClassName="modalSearchOverlay"
                    >
                    <Search />
                    <button onClick={this.closeModal}>閉じる</button>
                </Modal>
            </div>
        );
    }
}

export default ModalWindow;