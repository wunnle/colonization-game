import React, { Component } from 'react';
import styles from './Notification.module.css'


class Notification extends Component {

  state = {
    visible: false
  }

  showAndHideAfterDelay = () => {
    this.setState({
      visible: true
    })
    
    setTimeout(() => {
      this.setState({
        visible: false
      })
    }, 1200);
  }

  componentDidMount() {
    if(this.props.children) {
      this.showAndHideAfterDelay()
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.children !== this.props.children) {
      this.showAndHideAfterDelay()
    }
  }

  render() {

    const { visible } = this.state
    const { children } = this.props

    if (visible) {
      return (
        <div className={styles.notification}>
          <h1>{children}</h1>
        </div>
      )
    } else {
      return null
    }
  }
}

export default Notification;

// export default Notification = ({ children }) => {



//   return (
//     <div className={styles.notification}>
//       <h1>{children}</h1>
//     </div>
//   );
// };
