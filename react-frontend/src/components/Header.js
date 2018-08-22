import React from "react";

export const Header = (props) => {
  var currentLocation = document.location.href;
  var headerText = "Current Case List";
  if(currentLocation.indexOf('/requirements') >=0){
     headerText = "Case Requirements Form"
  }
  
  return (
    <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">{headerText}</a>
          </div>
        </div>
      </nav>
  );
}
