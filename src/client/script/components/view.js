import React from 'react';
import {Toolbar,ToolbarGroup,ToolbarTitle,ToolbarSeparator} from 'material-ui/lib/toolbar';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import TaskList from './taskList';
const filterOptions = [
  { payload: '1', text: '所有时间',day:0},
  { payload: '2', text: '当天',day:1},
  { payload: '3', text: '一天',day:2},
  { payload: '4', text: '一周',day:3},
  { payload: '5', text: '一月',day:30},
  { payload: '6', text: '一年',day:365}
];
export default React.createClass({
    render(){
        let tp='显示';
        let iconName='visibility_off';
        if(this.props.oldTaskVisible){
            tp='隐藏';
            iconName='visibility';
        }
        return <section className='view'>
            <Toolbar>
                <ToolbarGroup key={0} float="left">
                    <DropDownMenu
                        onChange={this.props.onChangeDropdown}
                        labelStyle={{
                            'font-size':'20px',
                            'line-height':'56px',
                            color:'rgba(0, 0, 0, .40)',
                            'text-align':'center'}}
                        underlineStyle={{
                            'border-color':'rgba(0,0,0,.1)'
                        }}
                        iconStyle={{
                            fill:'rgba(0,0,0,.1)'
                        }}
                        menuItems={filterOptions}
                    />
                    <ToolbarTitle style={{'margin-left':'-20px'}} text="内的所有任务" />
                </ToolbarGroup>
                <ToolbarGroup key={1} float="right">
                    <IconButton
                        ref='iconBtn'
                        style={{width:'56px',height:'56px',float:'left'}}
                        iconStyle={{color:'rgba(0, 0, 0, .40)'}}
                        onClick={this.props.onClickVisibleBtn}
                        iconClassName="material-icons"
                        tooltipPosition="bottom-center"
                        tooltip={`${tp}已完成的任务`}>
                        {iconName}
                    </IconButton>
                    <ToolbarSeparator/>
                    <RaisedButton onClick={this.props.onClickAddBtn} label="添加新任务" primary={true} />
                </ToolbarGroup>
            </Toolbar>
            <div className='taskWrapper'>
                <TaskList
                    oldTaskVisible={this.props.oldTaskVisible}
                    onChangeDropdown={this.props.onChangeDropdown}
                    onClickCheckbox={this.props.onClickCheckbox}
                    onClickDeleteBtn={this.props.onClickDeleteBtn}
                    onClickEditBtn={this.props.onClickEditBtn}
                    visibleDay={this.props.visibleDay}
                    tasks={this.props.tasks}/>
            </div>
        </section>
    }
});
