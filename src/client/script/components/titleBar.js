import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
export default React.createClass({
    render(){
        return <AppBar
            style={{'-webkit-app-region': 'drag'}}
            title="任务管理"
            iconElementRight={
                <IconButton
                style={{'-webkit-app-region': 'no-drag'}}
                onClick={this.props.onClickCloseBtn} iconClassName='material-icons'>close</IconButton>
            }
            iconElementLeft={
                <IconButton onClick={this.props.onClickMenuBtn}
                style={{'-webkit-app-region': 'no-drag'}}
                iconClassName='material-icons'>
                    menu
                </IconButton>
            }
        />
    }
});
