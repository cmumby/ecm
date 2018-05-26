import React, { Component } from 'react';
import TodoService from './TodoService';
//import axios from 'axios';
import ListCaseRow from './ListCaseRow';

export default class IndexItem extends Component {

  constructor(props) {
      super(props);
      this.state = {items: ''};
      this.todoService = new TodoService();

      //bind
      this.onDelete = this.onDelete.bind(this);
      this.onUpdate = this.onUpdate.bind(this);
      this.handleAdd = this.handleAdd.bind(this);
    }
    componentWillMount(){
      this.fillData();
    }

    fillData() {
      var thisRef = this;
      this.todoService.all((data)=>{
          thisRef.setState({ items: data });
      })
    }

    tabRow(){
      if(this.state.items instanceof Array){

        var thisRef = this;
        return this.state.items.map(function(object, i){
            return <ListCaseRow onDelete={thisRef.onDelete} onUpdate={thisRef.onUpdate} obj={object} key={i} />;
        })
      }
    }

    onDelete(event) {
      let id = event.target.id;
      var thisRef = this;
      this.todoService.delete(id,()=>{
        thisRef.fillData();
      });
    }

    onUpdate(event) {
      let id = event.target.id;
      this.props.history.push('/update/'+id);
    }

    handleAdd() {
      this.props.history.push('/add');
    }

    render() {
      return (
        <div className="container-todo">
          <div className="box box-info">
            <div className="box-header with-border">
              <h3 className="box-title">Assigned Cases</h3>

              {/* <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                </button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
      </div> */}
            </div>

            <div className="box-body">
              <div className="table-responsive">
                <table className="table no-margin table-striped">
                  <thead>
                    <tr>
                      <th>ECM Case ID</th>
                      <th>Customer Info</th>
                      <th>Actions</th>
                      <th>Age (Days)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.tabRow()}
                  </tbody>
                </table>
              </div>

            </div>
            <div className="panel-footer">
              <button onClick={this.handleAdd} className="btn btn-info">New task</button>
            </div>
            {/*<div className="box-footer clearfix">
            
              <a href="javascript:void(0)" className="btn btn-sm btn-info btn-flat pull-left">Place New Order</a>
              <a href="javascript:void(0)" className="btn btn-sm btn-default btn-flat pull-right">View All Orders</a>
            
              
            </div>*/}
          </div>
        </div>
        
      );
    }
  }
