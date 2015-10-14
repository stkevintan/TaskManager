import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import TitleBar from './assets/js/components/titleBar';
import View from './assets/js/components/view';
import LeftNav from 'material-ui/lib/left-nav';
import MenuItem from 'material-ui/lib/menu/menu-item';
import InputModal from './assets/js/components/InputModal';
import ipc from 'ipc';
//inject Tap Event
injectTapEventPlugin();

const menuItems = [
  { route: 'Home', text: '任务管理' },
  { route: 'Clear', text: '清除所有任务' },
  { type: MenuItem.Types.SUBHEADER, text: '关于' },
  {
     //type: MenuItem.Types.LINK,
     //payload: 'https://github.com/stkevintan/TaskManager',
     text: 'GitHub'
  },
  // {
  //    text: 'Disabled',
  //    disabled: true
  // },
  // {
  //    type: MenuItem.Types.LINK,
  //    payload: 'https://www.google.com',
  //    text: 'Disabled Link',
  //    disabled: true
  // }
];
function binarySearch(x,arr=[],cmp=x=>x){
    let l=0,res=-1,r=arr.length-1;
    while(l<=r){
        let mid=(l+r)>>1;
        if(cmp(arr[mid])<=x){
            res=mid;
            l=mid+1;
        }else r=mid-1;
    }
    if(res==-1){
        console.log('fallback to order search');
        res=orderSearch(...arguments);
    }
    return res;
}
function orderSearch(x,arr=[],cmp=x=>x){
    for(let i in arr){
        if(cmp(arr[i])==x)return i;
    }
    return -1;
}
const Main = React.createClass({
    getInitialState(){
        let tasks=localStorage.getItem('tasks');
        if(tasks){
            try{
                tasks=JSON.parse(tasks)||[];
            }catch(e){
                console.log('data parse error,'+e);
                tasks=[];
            }
        }else tasks=[];
        return {
            tasks,
            oldTaskVisible:true,
            visibleDay:0
        }
    },
    handleClickMenuBtn(){
        this.refs.leftNav.toggle();
    },
    handleClickAddBtn(){
        this.refs.inputModal.openModal();
    },
    handleClickVisibleBtn(){
        this.state.oldTaskVisible=!this.state.oldTaskVisible;
        this.setState(this.state);
    },
    handleClickCheckbox(key){
        let index=binarySearch(key,this.state.tasks,x=>x.id);
        this.state.tasks[index].isDone=!this.state.tasks[index].isDone;
        this.setState(this.state);
    },
    handleClickEditBtn(key){
        let index=binarySearch(key,this.state.tasks,x=>x.id);
        this.refs.inputModal.openModal(index,this.state.tasks[index]);
    },
    handleClickDeleteBtn(key){
        let index=binarySearch(key,this.state.tasks,x=>x.id);
        this.state.tasks.splice(index,1);
        this.setState(this.state);
    },
    handleModalSubmit(task,index=-1){
        if(index!=-1){
            //update
            this.state.tasks[index]=task;
        }else{
            //create
            let now=new Date();
            this.state.tasks.push({
                id:now.getTime(),
                isDone:false,
                title:task.title,
                desc:task.desc,
                date:now.toLocaleDateString()
            });
        }
        this.setState(this.state);
    },
    handleChangeDropdown(e,selectedIndex,menuItem){
            this.state.visibleDay=menuItem.day;
            this.setState(this.state);
    },
    handleLeftNavChange(e,selectedIndex,menuItem){
        let route=menuItem.route;
        if(route==='Home'){
            //nothing to do...
        }else if(route==='Clear'){
            this.state.tasks=[];
            this.setState(this.state);
        }
    },
    handleClickCloseBtn(){
        localStorage.setItem('tasks',JSON.stringify(this.state.tasks));
        ipc.send('exit');
    },
    render(){
        return <div className='wrapper'>
            <TitleBar onClickMenuBtn={this.handleClickMenuBtn}
                onClickCloseBtn={this.handleClickCloseBtn}/>
            <View
                onClickEditBtn={this.handleClickEditBtn}
                onClickDeleteBtn={this.handleClickDeleteBtn}
                onClickVisibleBtn={this.handleClickVisibleBtn}
                onClickAddBtn={this.handleClickAddBtn}
                oldTaskVisible={this.state.oldTaskVisible}
                visibleDay={this.state.visibleDay}
                onClickCheckbox={this.handleClickCheckbox}
                onChangeDropdown={this.handleChangeDropdown}
                tasks={this.state.tasks}/>
            <LeftNav
                onChange={this.handleLeftNavChange}
                ref="leftNav" docked={false} menuItems={menuItems} />
            <InputModal
                onModalSubmit={this.handleModalSubmit}
                ref='inputModal'
                title='添加任务'/>
        </div>
    }
});

React.render(<Main />, document.body);
