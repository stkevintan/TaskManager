import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import TextFiled from 'material-ui/lib/text-field';
import FlatButton from 'material-ui/lib/flat-button';
export default React.createClass({
    getInitialState:()=>({index:-1,task:{},title:'添加任务'}),
    _handleDialogCancel(){
        this.closeModal();
    },
    _handleDialogSubmit(){
        this.state.task.title=this.refs.taskNameText.getValue().trim();
        this.state.task.desc=this.refs.taskDescText.getValue().trim();
        if(this.state.task.title===''){
            //to do
            this.state.errorText='任务名必须填写';
            this.setState(this.state);
            return;
        }
        this.props.onModalSubmit(this.state.task,this.state.index);
        this.closeModal();
    },
    _handleErrorInputChange(e){
        let str=e.target.value.trim();
        if(str===''){
            this.state.errorText='任务名必须填写';
        }else this.state.errorText='';
        this.setState(this.state);
    },
    openModal(index=-1,task={}){
        if(index!=-1){
            this.setState({index,task,title:'修改任务'});
        }else{
            this.setState({index,task,title:'添加任务'});
        }
        this.refs.dialog.show();
    },
    closeModal(){
        this.refs.dialog.dismiss();
    },
    render(){
        let actions = [
          <FlatButton
            label="返回"
            secondary={true}
            onTouchTap={this._handleDialogCancel} />,
          <FlatButton
            label="提交"
            primary={true}
            onTouchTap={this._handleDialogSubmit} />
        ];
        return <Dialog
            ref='dialog'
            title={this.state.title}
            actions={actions}
            modal={false}>
                <TextFiled
                    ref='taskNameText'
                    fullWidth={true}
                    floatingLabelText='任务名'
                    errorText={this.state.errorText}
                    onChange={this._handleErrorInputChange}
                    defaultValue={this.state.task.title}
                />
                <TextFiled
                    ref='taskDescText'
                    fullWidth={true}
                    multiLine={true}
                    floatingLabelText='任务介绍'
                    defaultValue={this.state.task.desc}
                />
        </Dialog>
    }
})
