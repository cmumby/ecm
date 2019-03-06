import React, { Component } from 'react';

export default class Alerts extends Component {
    
    componentWillMount() {
        this.setState({
          alerts:this.props.alerts,
      });
     
    }

    handleAlerts(event, index){
        this.state.alerts.splice(index, 1);
        
        
        this.setState({
            alerts: this.state.alerts
        });
        
       
    }

    render(){
        let thisRef = this;
        return this.state.alerts.map( function (alert, i){
            let boxColor = "green";
            let boxIcon = 'checkmark';
            switch(alert.type){
                case 'success':
                    boxColor = "green"
                    boxIcon = 'checkmark';
                    break;
                case 'warning':
                    boxColor = 'yellow';
                    boxIcon = 'alert';
                    break;
                case 'failure':
                    boxColor = "red"
                    boxIcon = 'close';
                    break;   
                default:
                boxColor = "checkmark";
            }
      
            return <div key={i} data-test={i} className={`small-box bg-${boxColor}`}>
                    <div className="inner">
                      <h3>{alert.exclamation}</h3>
                          <p>{alert.message}</p>
                        </div>
                        <div className="icon">
                          <i className={`ion ion-${boxIcon}`}></i>
                        </div>
                      <a onClick={(e)=> thisRef.handleAlerts(e, i) } className="small-box-footer">Close Alert <i className="fa fa-close"></i></a>
                    </div>
        });
    }
}