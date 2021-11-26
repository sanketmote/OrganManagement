import React from 'react';
import PropTypes from 'prop-types';
import instance from '../../Etherium/contrctInstance';
import web3 from '../../Etherium/web';
class Modal extends React.Component {
    async verify(event) {
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]);
        await instance.methods.addHospital(event.target.value).send({from:accounts[0]});
        console.log('Verified => ' + event.target.value);
    }
    reject(event) {
        console.log('Rejected => '+ event.target.value);
    }
    render() {
        if (!this.props.show) {
            return null;
        }

        const backdropStyle = {
            position: 'fixed',
            top: 50,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: 50,

        };

        const model = {
            position: 'relative',
            top: 0,
            left: 0,
            display: 'table',
            Width: '100%',
            height: '30%',
            overflow: 'hidden',
            outline: 0,
            backgroundColor: '#fff',
            margin: '0 auto',
            padding: 10,
            maxWidth: 500,
            minHeight: 300,
        };

        return (
            <div className="backdrop" style={backdropStyle}>
                <div className="modal" style={model}>
                    {this.props.children}

                    <div className="footer footerStyle">
                        <button className="btn-warning" onClick={this.props.onClose}>
                            Close
                        </button>
                        <button className="btn-warning" onClick={this.verify} value={this.props.metamaskid}>
                            Verify
                        </button>
                        <button className="btn-warning" onClick={this.reject} value={this.props.metamaskid}>
                            Reject
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    metamaskid: PropTypes.string,
    children: PropTypes.node
};

export default Modal;