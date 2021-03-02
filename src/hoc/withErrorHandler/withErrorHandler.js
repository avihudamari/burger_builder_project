import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        constructor() {
            super();
            this.reqInterceptor = axios.interceptors.request.use(request => {
                this.setState({error: null});
                return request;
            });
            // this.reqInterceptor = axios.interceptors.request.use(null, error => {
            //     this.setState({error: error});
            //     return error;
            // });
            this.resInterceptor = axios.interceptors.response.use(null, error => {
                this.setState({error: error});
                return error;
            });
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmed = () => {
            this.setState({error: null});
        }
        render () {           
            return (
               <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
               </Auxiliary> 
            );
        }
    }
}

export default withErrorHandler;